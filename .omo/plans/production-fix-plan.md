# Plan: production-fix-plan

> Created: 2026-06-10 07:10:36
> **Status**: Draft

## Objective

Fix production IPTV system:
1. Fix CMS upload bugs (facilities.php + 6 files)
2. Fix OHAGB zip (remove remaining 192.168.60.4) with rollback
3. Bump XAIT version for TV auto-update
4. Sync preview/ source files

## Scope

**In Scope:**
- Production CMS PHP files (6 upload handlers)
- Production OHAGB_0.24.zip (gym.js + optionally main.js)
- xait.xml version bump
- preview/ source files in repository
- DB: ALTER fasilitas.judul_gambar NOT NULL → set default

**Out of Scope:**
- Image URLs already in DB (they already point to 192.168.30.4 — correct)
- Other server config (Apache, network, etc.)
- iptv.cic.net.id migration (if that server is still alive, don't touch)

## Context

**Server topology:**
- Production server: 202.8.28.233:8295 (public SSH)
- eth0: 192.168.60.7/24 → gateway intranet
- eth1: 192.168.30.4/23 → IPTV network (TVs use this)
- /var/www/html/ → web root, git repo

**Current state:**
| Item | Status |
|------|--------|
| DB image URLs | ✅ Already pointing to 192.168.30.4 |
| CMS upload PHP | ❌ Missing `judul_gambar` + `if($insert)` bug |
| Production OHAGB zip | ✅ Mostly 30.4, but `gym.js:285` still 60.4 |
| main.js (in zip) | 🔶 Uses iptv.cic.net.id (external 113.212.160.10) |
| preview/ source files | ❌ Outdated — still 192.168.60.4 everywhere |
| TV auto-update | ✅ Version bump in xait.xml → TV re-downloads zip |

**What TV does when version bumps:**
1. TV periodically polls xait.xml (every few hours or on boot)
2. Compares `applicationDescriptor.version` with current app
3. If higher → downloads OHAGB zip from `<url>` → extracts → reloads

## Approach

### Phase A — Backup (sebelum apa-apa)
1. Copy production OHAGB_0.24.zip → OHAGB_0.24.zip.bak (rollback point)
2. Git stashing/backup current production PHP files

### Phase B — Fix CMS Upload (gak ngaruh ke TV)
Apply fixes ke production PHP files:
| File | Fix |
|------|-----|
| facilities.php | Insert `judul_gambar`, fix `if($insert)` → `if($connectinsert)` |
| service.php | INSERT URL → `/images/...` |
| addreflexology.php | INSERT URL → `/images/...` |
| addpromotion.php | INSERT URL → `/images/...` |
| editabout1.php | UPDATE URL → `/images/...` |
| editabout2.php | UPDATE URL → `/images/...` |
| WelcomeScreen-setup.php | UPDATE + preview URL → `/images/...` |
| DB: fasilitas table | ALTER `judul_gambar` SET DEFAULT '' |

### Phase C — Fix OHAGB Zip
1. Download production zip, extract, fix gym.js, re-zip
2. Simpan versi baru sebagai OHAGB_0.25.zip (biar jelas bedanya)
3. Jangan hapus zip lama (OHAGB_0.24.zip tetap ada = rollback)
4. Optional: Fix main.js iptv.cic.net.id → 192.168.30.4

### Phase D — Bump XAIT + Update URL
1. Ubah `<url>` di xait.xml → OHAGB_0.25.zip
2. Naikin versionNumber + version (215 → 216)
3. TV auto-download versi baru

### Phase E — Sync preview/ Source
1. Apply semua IP fix ke preview/js/ files
2. Commit ke repo (biar source sinkron sama zip)

## Tasks

| # | Task | Detail | Status |
|---|------|--------|--------|
| 1 | Backup production files | Copy OHAGB_0.24.zip → .bak, git snapshot | pending |
| 2 | DB: ALTER fasilitas.judul_gambar | Set DEFAULT '' | pending |
| 3 | Fix production CMS PHP files | 7 files (upload handlers) | pending |
| 4 | Test upload di production | Upload gambar, cek file + DB record | pending |
| 5 | Fixed OHAGB_0.25.zip | Fix gym.js, re-zip | pending |
| 6 | Update xait.xml + deploy zip | URL → 0.25.zip, version → 216, upload zip | pending |
| 7 | Sync preview/ source files | Apply fixes ke /root/procen/preview/js/ | pending |
| 8 | Final verification | Cek upload, zip, xait, source sinkron | pending |

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| PHP fix typo/syntax error | Admin CMS error | Backup file dulu, test upload setelah fix |
| Old zip terhapus | TV gak bisa rollback | OHAGB_0.24.zip jangan dihapus, backup dulu, simpan OHAGB_0.25.zip baru |
| TV gak auto-update | Zip baru gak terdownload | Version must be HIGHER, TV biasanya cek tiap boot |
| main.js iptv.cic.net.id change | Channel list/RoomInfo rusak | Optionally skip — cuma ganti kalau external udah mati/sudah dikonfirmasi |
| xait.xml version number bentrok | TV bingung | Naikin 1 angka dari existing (215 → 216) |
| Preview source gak sinkron | Next rebuild pake IP salah | Fix preview/ files lalu commit |

## Verification

- [ ] Upload gambar via CMS → file di disk + record di DB
- [ ] Gambar bisa diakses via `http://192.168.30.4/images/...`
- [ ] OHAGB_0.25.zip tidak ada 60.4
- [ ] OHAGB_0.24.zip masih ada (rollback)
- [ ] xait.xml version 216, URL → OHAGB_0.25.zip
- [ ] preview/ source sinkron dengan zip
- [ ] Commit + push ke repo
