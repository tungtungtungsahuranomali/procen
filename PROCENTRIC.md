# ProCentric LG TV Setup

## Architecture

Semua dari satu server, satu port, satu Cloudflare tunnel:

```
Server (port 8080, /root/procen/controlpanel/)
  ├── /index.php → CMS admin
  ├── /channeljson.php → JSON API (channel list, dll)
  ├── /images/... → Gambar fasilitas, about, channel logo
  ├── /procentric/system/LGService.xml → LG TV config awal
  ├── /procentric/application/xait.xml → App manifest (XAIT)
  └── /procentric/application/OHAGB_0.24.zip → App bundle (HTML+JS)
```

LG TV webOS cuma perlu **satu URL** — ambil config, download app, jalan.

---

## Server yang Berjalan

| Service | Port | Path |
|---------|------|------|
| PHP built-in server | 8080 | `/root/procen/controlpanel/` |
| Cloudflare tunnel | - | tunnel ke localhost:8080 |

Cek status:
```bash
ps aux | grep -E "php.*-S|cloudflared"
```

---

## Link Saat Ini

| Akses | URL |
|-------|-----|
| **Public (Cloudflare)** | https://limit-sing-march-dried.trycloudflare.com |
| **Local** | http://localhost:8080 |

> **Catatan:** URL Cloudflare berubah setiap tunnel direstart. Untuk permanent, setup Cloudflare Tunnel dengan domain sendiri.

---

## Setting LG TV ProCentric

### 1. Masuk Menu Setting ProCentric

Tidak perlu remote service khusus. Beberapa cara:

**Cara 1 — Remote kamar (remote biasa):**
- Tekan `SETTINGS` (gear icon) di remote
- `All Settings` → `Programmes` / `Channels` → `Installation` / `Tuning`
- Masuk PIN: `0000` (default LG)
- Cari menu: **Pro:Centric Server URL**, **LG Server**, atau **SI Server Setup**

**Cara 2 — Aplikasi HP (gak perlu remote fisik):**
- Install **LG ThinQ** atau **LG TV Remote** di Play Store / App Store
- Hubungkan HP ke WiFi yang sama dengan TV
- Di keypad numerik aplikasi, tekan: `MUTE` → `1` → `1` → `9` → `ENTER`
- atau `SETTINGS` tahan 5 detik
- Nanti masuk hidden menu → cari **Pro:Centric** atau **Installation**

**Cara 3 — USB keyboard:**
- Colok keyboard USB ke port TV
- Tekan: `MUTE` lalu `1` `1` `9` `ENTER`
- Akan muncul menu instalasi

**Cara 4 — Hotel mode langsung (model webOS baru):**
- `SETTINGS` → `General` → scroll paling bawah
- Langsung ada **Hotel Mode** atau **Pro:Centric Settings** tanpa PIN

### 2. Set ProCentric Server URL
Masukkan URL ke LGService.xml:
```
https://limit-sing-march-dried.trycloudflare.com/procentric/system/LGService.xml
```

### 3. TV Akan Otomatis
1. Download **LGService.xml** → splash screen
2. Baca **xait.xml** → dapat alamat app bundle
3. Download **OHAGB_0.24.zip** → extract
4. Jalankan app (entry: `menu.html` via HCAP API)

---

## File ProCentric

### LGService.xml (`/procentric/system/LGService.xml`)
Konfigurasi awal TV: splash image.

```xml
<service>
    <setup>
        <versionNumber>1</versionNumber>
        <modelName>50UR761H0TA</modelName>
        <priority>NORMAL</priority>
        <content>
            <type>SPLASH_IMAGE</type>
            <data>splashOHAGB.bmp</data>
        </content>
    </setup>
</service>
```

### xait.xml (`/procentric/application/xait.xml`)
Application Information Table — mendefinisikan app yang diunduh TV.

```xml
<XAIT>
    <versionNumber>215</versionNumber>
    <AbstractService>
        <svcName>Pro:Centric Application</svcName>
        <svcId>0x1208</svcId>
        <isAutoSelect>true</isAutoSelect>
        <ApplicationList>
            <Application>
                <appName>OAKWOOD HOTEL AND APARTEMENT GRAND BATAM</appName>
                <applicationIdentifier>
                    <orgId>8</orgId>
                    <appId>1</appId>
                </applicationIdentifier>
                <applicationDescriptor>
                    <type>Hcap-h</type>
                    <controlCode>AUTOSTART</controlCode>
                    <visibility>NOT_VISIBLE_USERS</visibility>
                    <priority>1</priority>
                    <version>215</version>
                </applicationDescriptor>
                <HcapDescriptor>
                    <frequency>1</frequency>
                    <programNum>8</programNum>
                    <cTag>8</cTag>
                    <url>https://limit-sing-march-dried.trycloudflare.com/procentric/application/OHAGB_0.24.zip</url>
                    <applicationStructure>
                        <baseDirectory>/</baseDirectory>
                        <classpathExtension>/</classpathExtension>
                        <initialClass>menu.html</initialClass>
                    </applicationStructure>
                </HcapDescriptor>
            </Application>
        </ApplicationList>
    </AbstractService>
</XAIT>
```

**Key fields:**
| Field | Value | Keterangan |
|-------|-------|------------|
| `svcId` | `0x1208` | Service ID ProCentric |
| `type` | `Hcap-h` | HTML5 HCAP app |
| `controlCode` | `AUTOSTART` | App jalan otomatis saat TV nyala |
| `url` | ... | Lokasi download app zip |
| `initialClass` | `menu.html` | File HTML pertama yang dijalankan |

### OHAGB App Bundle (`/procentric/application/OHAGB_*.zip`)
Zip berisi seluruh HTML, JS, CSS, gambar untuk TV app. TV download, extract, lalu render.

Isi zip (sama dengan folder `preview/`):
```
menu.html        → Main menu
init.html        → Welcome screen
tv.html          → TV channel browser
about1.html      → Hotel info pages
facilities.html  → Gym, pool, meeting
js/              → Controllers (ui/*.js), HCAP lib, jQuery
assets/css/      → Stylesheets (Bootstrap, custom)
```

---

## Data Flow: TV Sampai Running

```
LG TV webOS
  │
  ├─ GET /procentric/system/LGService.xml
  │   → Dapet splash screen config
  │
  ├─ Baca xait.xml dari LGService (DVB / HTTP)
  │   → Dapet app download URL
  │
  ├─ GET /procentric/application/OHAGB_0.24.zip
  │   → Download + extract app bundle
  │
  ├─ Jalankan menu.html via HCAP API
  │   → hcap.js (WebSocket ws://127.0.0.1:8053)
  │
  ├─ App GET /channeljson.php
  │   → Dapet daftar channel (IP multicast UDP)
  │
  ├─ App POST /RoomInfo.php
  │   → Dapet nama tamu, room
  │
  └─ App GET /images/...
      → Gambar channel logo, fasilitas, dll
```

---

## HCAP API (LG Smart TV Bridge)

App berkomunikasi dengan TV via `hcap.js` yang connect WebSocket ke `ws://127.0.0.1:8053/hcap_command`.

API utama yang dipakai:

| API | Fungsi |
|-----|--------|
| `hcap.channel.setStartChannel` | Set channel awal |
| `hcap.channel.requestChangeCurrentChannel` | Ganti channel |
| `hcap.network.getNetworkInformation` | Dapat IP TV |
| `hcap.network.getNetworkDevice` | Dapat MAC address |
| `hcap.video.setVideoSize` | Atur ukuran video |
| `hcap.externalinput.ExternalInputType.TV` | Switch ke input TV |
| `hcap.mode.setHcapMode` | Set HCAP mode (HCAP_MODE_1) |

Callback pattern:
```javascript
hcap.apiName({
    "onSuccess": function(result) { /* success */ },
    "onFailure": function(error) { /* error */ }
});
```

---

## Update CSV - channelnew Table

Channel TV pake UDP multicast:

| Column | Contoh | Keterangan |
|--------|--------|------------|
| `ip4` | `239.1.0.2` | IP multicast polos |
| `ip` | `@239.1.0.2` | Prefix @ |
| `ip2` | `udp://239.1.0.2:5000` | Full URL |
| `port` | `5000` | Port (default 5000/1234) |
| `prioritas` | `1` | Urutan channel |
| `is_online` | `online` / `offline` | Status |

---

## Update Gambar

Semua gambar disimpan di `controlpanel/images/`:
```
images/picfasilitas/    → Fasilitas hotel
images/picabout/         → About pages
images/picreflexology/   → Spa/reflexology
images/channellogo/      → Logo channel TV
images/video/            → Welcome screen video
images/picservices/      → Service/Ascott (perlu dibuat folder)
```

Database nyimpen relative path: `/images/...` (udah diupdate dari IP lama).

---

## Catatan Penting

1. **URL tunnel berubah** setiap cloudflared di-restart. Ganti URL di `xait.xml` dan setting TV setiap kali restart.
2. **OHAGB zip** harus diupdate kalau ada perubahan file di `preview/` — re-zip dan upload.
3. **Version number** di `xait.xml` harus dinaikkin setiap update biar TV download ulang.
4. **Preview (browser)** bisa akses langsung via tunnel untuk testing UI sebelum deploy ke TV.
5. **Java vs HTML5** — app ini pake HCAP (HTML5), bukan Java. Type `Hcap-h`, bukan `J`.
