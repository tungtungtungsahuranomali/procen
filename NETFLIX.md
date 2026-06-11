# Netflix Hospitality on LG ProCentric

## Hotel Registration

| Field | Value |
|-------|-------|
| Hotel ID | `OHAGB` |
| Hotel Name | Oakwood Hotel & Apartements Grand Batam |
| Launcher Version | `0.2` |
| Platform | LG ProCentric (HCAP) |

## SI Token (Smart Interstitial)

Token dari SPHE / LG Hospitality untuk Netflix.

```
getSItoken("netflix", "OXhaeKx5OOmdom5pUXJ7K0xe5yC8zmw6CepRCMwKJAar6/wz+UJUoRi7pCE655oeaMkmMkDeItDsMrEa8/dfeVgJnybIzDHdrznE1ThpGEvTDXSjmw62jzVYHSy6U2gOmIKdywE2TqKYT+RNdKp6K3dQQzlGD2K4Q22WnHFoSR+jIf0KSsrrGzqOLe2vWIP++rDSsPPBGKVkZpbV8r3DjWdcOP/3WEUZdGWyE4GLoD3nYnsRu96Yy+XtVNOrhEBtSSU8uAoSlidUkFocp83f7qcut6TnIXd9jIRI0GekLpmZlcFuQOHDaQQm5FvOvfDh46UNMSlza9GOxqTWJiOrAg==");
```

**Simpan baik-baik.** Token ini spesifik untuk OHAGB. Hotel lain tidak bisa memakainya.

## App ID

```
244115188075859013
```

Ini adalah LG webOS Netflix application ID. Berlaku untuk semua LG ProCentric TV model 2015–2021.

## Kode di Menu.js

### 1. Token Registration (Aktif)
```javascript
getSItoken("netflix", "TOKEN_DI_ATAS");
fetchPreloadedApplications();
```

### 2. Netflix Handler (Aktif)
```javascript
$("#netflix").on("click", function(){
    var $this = $(this);
    $this.blur();
    $this.parents('.js-nav-system__subnav__item')
         .attr({"data-visually-hidden" : "true"});
    $this.closest("li")
         .attr({'data-visually-hidden': 'true'})
         .closest("ul")
         .attr({'data-visually-hidden': 'true'});           
    $nav_system.find(".js-nav-system__item:first-child")
               .children(".js-nav-system__link").focus();
    app_id = "244115188075859013"; // netflix
    hcap.preloadedApplication.launchPreloadedApplication({
        "id": app_id,
        "parameters": JSON.stringify({
            "params": {
                "hotel_id": "OHAGB",
                "launcher_version": "0.2"
            }
        }),
        "onSuccess": function() {
            console.log("Launch Success!");
        },
        "onFailure": function(f) {
            console.log("Launch Failed! Reason: " + f.errorMessage);
        }
    });
    return false;
});
```

## Compatibilitas TV

| Model Year | Platform | Netflix |
|-----------|----------|---------|
| 2015–2021 | ProCentric (HCAP) | ✅ Bekerja |
| 2022+ | Pro:Centric Direct | ⚠️ Mungkin tidak bekerja |

**TV baru (2022+)**: Format SI token, app ID, dan API `launchPreloadedApplication` mungkin berbeda. Jika TV baru tidak bisa streaming Netflix:

1. Verifikasi model TV
2. Hubungi LG Hospitality / SPHE untuk mendapatkan token baru
3. Cek apakah Netflix perlu diinstall manual dari LG Content Store
4. Update app ID jika diperlukan

## Enable/Disable

Untuk menonaktifkan Netflix dari menu TV:
- Comment baris `$("#netflix").on("click", function(){ ... });` di `js/ui/menu.js`
- Bump version di `xait.xml`
- Rebuild OHAGB zip

Tidak ada limit jumlah TV untuk satu token. Semua TV di hotel bisa menggunakan token yang sama.
