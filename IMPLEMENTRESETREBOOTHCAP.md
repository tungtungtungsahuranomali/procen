# Implementasi Power Management TV via HCAP API

## Latar Belakang

Aplikasi ProCentric di `preview/` berjalan di atas LG webOS memanfaatkan **HCAP API** (Hotel TV Compatibility API). 
HCAP berkomunikasi dengan firmware TV via WebSocket internal (`ws://127.0.0.1:8053/hcap_command`).

Dari hasil eksplorasi, HCAP API menyediakan modul **`hcap.power`** dan **`hcap.time`** untuk kontrol daya,
namun **tidak diimplementasikan** di aplikasi kustom hotel ini — aplikasi saat ini hanya menggunakan:
channel, externalinput, preloadedApplication, dan system info.

---

## HCAP API Power Management

### Method Tersedia (HCAP v1.19.0.4533 & v1.24.8.5916)

| Method | Fungsi | Keterangan |
|--------|--------|------------|
| `hcap.power.powerOff()` | Matikan TV | Langsung mati, tidak ada konfirmasi |
| `hcap.power.reboot()` | Restart TV | Reboot webOS |
| `hcap.power.getPowerMode(success, failure)` | Cek state daya saat ini | Callback return `PowerMode` object |
| `hcap.power.setPowerMode({mode: ...})` | Set mode daya (standby, dll) | Parameter dari `hcap.power.PowerMode` |
| `hcap.power.isWarmUpdate()` | Cek apakah warm update aktif | Return boolean |
| `hcap.time.setPowerOnTime({...})` | Jadwalkan TV hidup | Bisa untuk auto-on di jam tertentu |
| `hcap.time.setPowerOffTimer({...})` | Jadwalkan TV mati via timer | Bisa untuk auto-off |
| `hcap.time.getPowerOnTime(success, failure)` | Baca jadwal power on | |
| `hcap.time.getPowerOffTimer(success, failure)` | Baca timer power off | |

### Contoh Call

```javascript
// Matikan TV
hcap.power.powerOff({
    onSuccess: function() {
        console.log("TV dimatikan");
    },
    onFailure: function(f) {
        console.log("Gagal matikan TV: " + f.errorMessage);
    }
});

// Restart TV
hcap.power.reboot({
    onSuccess: function() {
        console.log("TV di-reboot");
    },
    onFailure: function(f) {
        console.log("Gagal reboot: " + f.errorMessage);
    }
});

// Jadwalkan hidup jam 07:00
hcap.time.setPowerOnTime({
    "hour": 7,
    "minute": 0,
    "onSuccess": function() {
        console.log("Power on dijadwalkan");
    },
    "onFailure": function(f) {
        console.log("Gagal set jadwal: " + f.errorMessage);
    }
});

// Timer mati setelah 60 menit
hcap.time.setPowerOffTimer({
    "minute": 60,
    "onSuccess": function() {
        console.log("Timer off diset");
    },
    "onFailure": function(f) {
        console.log("Gagal set timer: " + f.errorMessage);
    }
});
```

---

## Arsitektur yang Ada vs. Yang Dibutuhkan

### Saat Ini (One-Way)

```
[Server PHP] ───API JSON───→ [TV Client]  (fetch channel, konten, dll)
[TV Client] ───Tidak ada───→ [Server]     (TV tidak pernah ngirim status)
```

Semua `setInterval` di `preview/js/` cuma buat update jam (`show_time`) dan auto-slideshow.
Tidak ada mekanisme server mengirim perintah ke TV.

### Yang Dibutuhkan (Two-Way)

Ada 2 pendekatan:

#### Opsi A: Polling (Sederhana)

```
[Server PHP]              [TV Client]
    │                          │
    │   POST /command.php      │
    │◄─────────────────────────│  (tiap 30 detik, kirim MAC)
    │                          │
    │   Response: {"command":  │
    │    "power_off",          │
    │    "reboot",             │
    │    "none"}               │
    │─────────────────────────►│
    │                          ├── execute hcap.power.powerOff()
    │                          ├── execute hcap.power.reboot()
    │                          └── atau skip
```

**Yang perlu dibuat:**
1. `controlpanel/command.php` — endpoint yang nerima `device_id`/MAC, balikin command dari queue
2. `database table` — `tv_commands` (id, device_id, command, status, created_at)
3. `controlpanel/` UI — halaman untuk kirim command ke room tertentu (tombol Power Off, Reboot)
4. Modifikasi `preview/js/main.js` — tambah `setInterval` polling ke `command.php`

#### Opsi B: WebSocket (Real-time)

```
[Server Node.js/PHP WS]     [TV Client]
    │                          │
    │   WebSocket connect      │
    │◄─────────────────────────│
    │                          │
    │   {"cmd":"power_off"}    │
    │─────────────────────────►│
    │                          ├── execute hcap.power.powerOff()
```

**Yang perlu dibuat:**
1. WebSocket server (Node.js atau Ratchet PHP)
2. WebSocket client di `preview/js/`
3. Bridge dari CMS PHP ke WebSocket server (redis pub/sub atau HTTP internal)
4. UI untuk kirim command

---

## Rekomendasi Implementasi (Polling)

Pendekatan paling praktis untuk codebase existing (PHP + jQuery) adalah **Polling**.

### 1. Database

```sql
CREATE TABLE tv_commands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL,
    command VARCHAR(50) NOT NULL,  -- 'power_off', 'reboot', 'set_power_on_time', 'set_power_off_timer'
    params TEXT,                   -- JSON params jika ada
    status ENUM('pending','delivered','executed','failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP NULL,
    INDEX idx_device (device_id, status)
);
```

### 2. Endpoint command.php

```php
<?php
include 'koneksi.php';
$devid = $_POST['devid'];

$sql = "SELECT id, command, params FROM tv_commands 
        WHERE device_id = '$devid' AND status = 'pending' 
        ORDER BY id ASC LIMIT 1";
$result = mysqli_query($koneksi, $sql);

if ($row = mysqli_fetch_assoc($result)) {
    // Update status ke 'delivered'
    mysqli_query($koneksi, "UPDATE tv_commands SET status='delivered' WHERE id=" . $row['id']);
    echo json_encode([
        'command' => $row['command'],
        'params'  => $row['params'] ? json_decode($row['params'], true) : null
    ]);
} else {
    echo json_encode(['command' => 'none']);
}
?>
```

### 3. Di TV Client (main.js)

```javascript
function poll_commands() {
    var mac = localStorage.getItem("cic.mac");
    if (!mac) return;
    
    $.post("http://192.168.60.4/controlpanel/command.php", 
        { devid: mac },
        function(resp) {
            switch(resp.command) {
                case "power_off":
                    hcap.power.powerOff({
                        onSuccess: function(){},
                        onFailure: function(f){}
                    });
                    break;
                case "reboot":
                    hcap.power.reboot({
                        onSuccess: function(){},
                        onFailure: function(f){}
                    });
                    break;
                case "set_power_on_time":
                    hcap.time.setPowerOnTime(resp.params);
                    break;
                case "set_power_off_timer":
                    hcap.time.setPowerOffTimer(resp.params);
                    break;
            }
        }
    );
}

$(document).ready(function() {
    // ... existing code ...
    setInterval(poll_commands, 30000);  // polling tiap 30 detik
});
```

### 4. CMS UI (Room-list.php)

Tambah tombol di halaman room:
- **Power Off** → INSERT ke `tv_commands` (device_id, 'power_off')
- **Reboot** → INSERT ke `tv_commands` (device_id, 'reboot')
- **Schedule On** → form set jam, INSERT ke `tv_commands` (device_id, 'set_power_on_time', params)
- **Schedule Off** → form set timer, INSERT ke `tv_commands` (device_id, 'set_power_off_timer', params)

---

## Catatan Penting

1. **`powerOff()` tidak bisa di-cancel** — begitu dipanggil TV langsung mati. 
   Pastikan ada konfirmasi di CMS sebelum kirim command.

2. **Setelah powerOff, TV tidak bisa di-polling lagi** — command hanya dikirim sekali.
   Untuk menyalakan kembali, perlu **Wake-on-LAN** (WOL) dari server ke MAC address TV,
   atau timer `hcap.time.setPowerOnTime` yang already scheduled.

3. **Reboot** — setelah reboot, TV butuh beberapa detik sampai HCAP siap kembali.
   Polling berikutnya akan bekerja lagi setelah HBS app restart.

4. **HCAP versi** — `temp_zipcheck` (v1.24.8.5916) memiliki lebih banyak API 
   (`hcap.application`, `hcap.speech`, `hcap.camera`, `hcap.iot`, `hcap.webrtc`, dll)
   dibanding `preview/` (v1.19.0.4533). Upgrade HCAP jika perlu fitur tambahan.

5. **Keamanan** — endpoint `command.php` harus membatasi akses (IP TV internal saja
   atau pakai token) agar tidak bisa dieksploitasi dari luar.

---

## Referensi HCAP API Module Lengkap

### v1.19.0.4533 (yang dipakai di `preview/`)
`hcap.channel`, `hcap.externalinput`, `hcap.key`, `hcap.mode`, `hcap.mouse`,
`hcap.network`, `hcap.power`, `hcap.preloadedApplication`, `hcap.property`,
`hcap.system`, `hcap.time`, `hcap.video`, `hcap.volume`, `hcap.bluetooth`,
`hcap.carousel`, `hcap.checkout`, `hcap.drm`, `hcap.file`, `hcap.mpi`,
`hcap.rms`, `hcap.rs2`, `hcap.socket`, `hcap.Media`

### v1.24.8.5916 (yang ada di `temp_zipcheck/`)
Semua di atas + `hcap.application`, `hcap.beacon`, `hcap.bluetooth.audio`,
`hcap.bluetooth.central`, `hcap.camera`, `hcap.iot`, `hcap.security`,
`hcap.speech`, `hcap.webrtc`
