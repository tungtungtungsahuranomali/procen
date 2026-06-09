# ProcEN - Hotel IPTV System

A web-based IPTV management system for hotels, serving LG Smart TVs in guest rooms. The system has two main components: a **Control Panel** (admin CMS) and a **TV Client** (in-room guest interface).

---

## Directory Structure

| Path | Purpose |
|------|---------|
| `controlpanel/` | Admin CMS for hotel staff to manage channels, rooms, content |
| `preview/` | TV client UI rendered on LG Smart TVs in guest rooms |
| `procentric/` | LG TV application bundles (`.zip` archives of OHAGB releases), system config (`LGService.xml`) |
| `database.sql` | Full MySQL dump of the `web_tv` database |

---

## Architecture Overview

### Control Panel (`controlpanel/`)
PHP-based admin interface running on Apache. No framework — procedural PHP with `mysqli_*` functions. Bootstrap 5 frontend. Session-based authentication with two user levels: `super` (full access) and `marketing` (restricted).

**Navigation sidebar** (on most pages):
- Room - Room list and guest status
- Channel - IPTV channel CRUD
- Ascott Star Rewards - Service image management
- Fasilitas - Facility images (gym, pool, meeting, bistro)
- Information - CSR, destination, emergency content
- Welcome Screen - Video background upload
- Promotion - Promotional image slides
- Reflexology/Ascott Cares - Spa/reflexology images
- About - Hotel description pages (The Ascott Limited, Oakwood)
- User - Admin account management

### TV Client (`preview/`)
HTML/JS interface rendered on LG Smart TVs using LG's **HCAP API** (`hcap.js`). The HCAP library communicates with a WebSocket at `ws://127.0.0.1:8053/hcap_command` for TV control (channel tuning, video playback, input switching, network info).

**Client JS architecture** (`preview/js/`):
- `main.js` - Entry point, initializes event handler, loads channel list, shows clock
- `events/event_handler.js` - Key event dispatcher. Uses a **screen_map** pattern: each screen (menu, watchtv, information, etc.) registers a handler; keydown events are routed to `current_screen.process_key_events()`
- `ui/*.js` - Screen-specific controllers (welcome.js, menu.js, tv.js, about1.js, about2.js, facilities, information, etc.)
- `lib/hcap.js` - LG HCAP API (v1.19.0.4533, minified)

**Client HTML screens** (`preview/`):
- `init.html` - Welcome/splash screen (guest name, room, weather, logo, running text)
- `menu.html` - Main navigation menu (hotel info, facilities, TV, F&B, spa, services, promotions, information)
- `tv.html` - TV channel browser
- `hotel.html`, `about1.html`, `about2.html` - Hotel info pages
- `gym.html`, `swimming.html`, `meeting.html` - Facility pages
- `service.html`, `reflexology.html` - Service/spa pages
- `s_list.html`, `d_list.html` - Service list pages
- `information.html`, `csr.html`, `destination.html`, `emergency.html` - Information pages

---

## Database (`web_tv`)

### Channel Tables
| Table | Purpose |
|-------|---------|
| `channelnew` | **Primary** channel table — IP, port, priority, online/offline, image |
| `channel` | Older channel schema (has `nama_channel`, `ip_channel`, `kategori_channel`, `status_channel`) |
| `tb_channel` | Even older schema (`latin1` charset) |

### Content Tables
| Table | Content |
|-------|---------|
| `about` | Hotel descriptions (id_about, judul_about, deskripsi_about, gambar_about, nama_hotel) |
| `fasilitas` | Facility images (gym, swimmingpool, bistro, meeting categories) |
| `information` | Info pages (csr, destination, emergency categories) |
| `promotion` | Promotional image slides |
| `reflexology` | Spa/reflexology images |
| `service` | Service images (Ascott Star Rewards) |

### Room Tables
| Table | Content |
|-------|---------|
| `tb_room` | Room-to-device mapping (room_name, device_id/MAC, guest_name, gcm_regid) |
| `room_bak` / `room_bak2` | Backup/older schemas |

### System Tables
| Table | Content |
|-------|---------|
| `user` | Admin accounts (username, sha1 password, level: super/marketing) |
| `welcome_background` | Welcome screen video path |
| `running_text` | Scrolling marquee text |
| `tb_hotel` / `tb_hotelinfo` | Hotel configuration |
| `tb_pms_event` | PMS integration events |
| `tb_greeting` | Greeting messages |

---

## Data Flow: Guest Opens TV

```
1. TV boots → init.html
2. JS gets MAC address via hcap.network APIs
3. MAC stored in localStorage (key: "cic.mac")
4. POST to RoomInfo.php with MAC → returns {guest_name, room_name, nama_hotel}
5. Welcome screen shows guest info + weather (OpenWeatherMap API)
6. Press ENTER → event_handler routes to main menu
7. User selects "TV" → tv.html
8. Channel list fetched as JSON from channeljson.php (filtered: is_online='online', ordered by prioritas)
9. Channel tuning via hcap.channel.setStartChannel / .requestChangeCurrentChannel
10. UDP multicast URLs: udp://{ip}:{port}
```

---

## JSON API Endpoints (in `controlpanel/`)

All return JSON arrays via `echo json_encode($data)`. Most set `Access-Control-Allow-Origin: *`.

| Endpoint | Returns |
|----------|---------|
| `channeljson.php` | Active channels from `channelnew` (id, ip4, ip, ip2, port, name, prioritas, img) |
| `encodechannel.php` | All channels from old `channel` table |
| `channel.json` | Flat JSON file (legacy, used by some older clients) |
| `bodyjson.php` | Reflexology/spa images |
| `servicejson.php` | Service images |
| `promotionjson.php` | Promotion images |
| `fasilitasjson.php` | All facilities |
| `fasilitasgymjson.php` | Gym facilities |
| `fasilitaspooljson.php` | Pool facilities |
| `fasilitasmeetingjson.php` | Meeting facilities |
| `fasilitasbistrojson.php` | Bistro facilities |
| `informationcsrjson.php` | CSR info |
| `informationdestinationjson.php` | Travel destination info |
| `informationemergencyjson.php` | Emergency info |
| `signatejson.php` | Signage info |
| `about1json.php`, `about2json.php` | Hotel about pages |
| `run_text.php` | Running text |
| `RoomInfo.php` | POST endpoint (takes `devid`, returns {guest_name0, room_name0, nama_hotel0}) |
| `update_guest.php` | POST endpoint to upsert guest info to `tb_room` |

---

## Key Patterns & Gotchas

### Database Connection
- **Main config**: `controlpanel/koneksi.php` — `$koneksi = mysqli_connect("localhost", "oakwood", "#Oakwood123", "web_tv")`
- **PDO config**: `controlpanel/my_con.php` — same creds, plus `GOOGLE_API_KEY` define
- **DB wrapper**: `controlpanel/db_functions.php` — `DB_Functions` class using PDO
- Several PHP files hardcode credentials inline instead of including the config file

### Authentication Pattern
```php
include 'koneksi.php';
session_start();
$usersession = $_SESSION['username'];
$sessionlevel = $_SESSION['level'];
if($usersession){
  // protected content
}else{
  header("location:login.php");
}
```

### Security Weaknesses
- Passwords stored as **SHA1** (not even SHA256, no salt)
- SQL queries use string interpolation with `$_POST`/`$_GET` values (SQL injection possible)
- No CSRF tokens
- Hardcoded credentials in multiple files
- Debug mode enabled in `.htaccess.bak` (`php_value display_errors 1`)

### Two-Level Admin Access
- `super` level → full control panel access
- `marketing` level → redirected to `./marketing/service.php` (separate marketing subfolder with duplicated files)

### Channel CSV
The `channelnew` table has multiple IP columns:
- `ip4` — plain IP (e.g., `239.1.0.2`)
- `ip` — with @ prefix (e.g., `@239.1.0.2`)
- `ip2` — full URL (e.g., `udp://239.1.0.2:5000`)
- `port` — default `5000` or `1234`

### Hardcoded Server URLs
- Image base: `http://192.168.30.4/controlpanel/images/` (stored in database)
- API: `http://iptv.cic.net.id/hk/` (in JS files)
- Server: `192.168.60.4` (in tv.js)

### Image Uploads
- Images uploaded to `controlpanel/images/` subdirectories
- Full HTTP URL stored in database, not relative paths
- File uploads validated only by `!empty($_FILES['gambar']['name'])` — no type/size validation

### LG HCAP API
- WebSocket at `ws://127.0.0.1:8053/hcap_command`
- Key APIs used: `hcap.video.setVideoSize`, `hcap.channel.setStartChannel`, `hcap.channel.requestChangeCurrentChannel`, `hcap.network.getNetworkInformation`, `hcap.network.getNetworkDevice`, `hcap.externalinput`
- Callback pattern: `{onSuccess: function(){}, onFailure: function(f){}}`
- Channel types: `hcap.channel.ChannelType.IP`, `hcap.channel.IpBroadcastType.UDP`

### Weather Display
- OpenWeatherMap API key in `menu.js`: `103cedcf5b1c0a4452a75f45ed823e65`
- Hardcoded lat/lon: `0.98277778, 104.03388889` (Batam, Indonesia)

### LG TV App Bundles (`procentric/application/`)
- OHAGB application versions `0.1` through `0.24`
- `basic-html-app-codesample.zip` — sample app template
- Each zip contains the compiled TV application package

---

## Unused/Dead Code

- `controlpanel/unused/` — Old ImageSlider, Television, SingleList, adddevice, changedevice files
- Many `*.bak`, `*.save` files scattered throughout
- `tb_channel` and `channel` tables are legacy — `channelnew` is the active one
- Commented-out code and unused variables throughout JS files

---

## No Build System

This project has **no build tools**, no `package.json`, no `composer.json`, no Makefile. It runs directly on Apache + PHP. SCSS files exist but require manual compilation (e.g., `sass scss/style.scss css/style.css`). No CI/CD configuration found.

To serve locally: `php -S 0.0.0.0:8080 -t /root/procen/controlpanel/` (requires MySQL with the `web_tv` database imported).
