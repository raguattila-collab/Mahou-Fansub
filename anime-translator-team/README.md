# Mahou Fansub

Modern anime és manga megosztó platform magyar fordító csapatnak.

## 🚀 Funkciók

### ✅ **Teljesen kész funkciók (30 funkció):**

#### **🏠 Főoldal & Tartalom**
- **Főoldal** - Anime/Manga katalógus, keresés, szűrés
- **Anime részletek** - Részletes anime/manga oldal, letöltési linkek
- **Keresés és szűrés** - Típus, műfaj, státusz szerint
- **Responsive design** - Minden eszközön tökéletesen működik

#### **👥 Csapat & Felhasználók**
- **Csapat bemutatása** - Tagok profiljai, szakértelem, social linkek
- **Felhasználói profil** - Szerkesztés, statisztikák, beállítások
- **Tagok profiljai** - Részletes csapat tag információk

#### **🔐 Bejelentkezési rendszer**
- **Bejelentkezés** - Email/jelszó, demo fiókok
- **Regisztráció** - Teljes űrlap, validációk
- **Jelszó helyreállítás** - Elfelejtett jelszó funkció
- **Jogosultság kezelés** - Admin, moderator, editor, translator, user szerepkörök

#### **⚙️ Admin & Kezelés**
- **Admin panel** - Tartalom kezelés, CRUD műveletek
- **Fájl feltöltés** - Drag & drop, progress bar, validáció
- **Tartalom kezelés** - Anime/manga hozzáadása, szerkesztése, törlése
- **Csapat kezelés** - Tagok hozzáadása, szerkesztése

#### **📝 Blog & Hírek**
- **Blog rendszer** - Hírek, új részek, csapat hírek
- **Blog keresés** - Kategóriák, címkék, szöveges keresés
- **Blog cikkek** - Részletes cikk oldalak, kapcsolódó cikkek

#### **📞 Kapcsolat & Támogatás**
- **Kapcsolattartó űrlap** - Üzenet küldés, kategóriák
- **FAQ rendszer** - Gyakran ismételt kérdések
- **Kapcsolati információk** - Email, Discord, válaszidő

#### **🎨 Design & UX**
- **Modern UI** - Nude színpaletta, glass effect
- **Hover animációk** - Smooth transitions, scale effects
- **Mobil optimalizált** - Touch-friendly, responsive grid

## 🛠️ Telepítés

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Build production verzióhoz
npm run build

# Production szerver indítása
npm start
```

## 🌐 Online elérhetőség

### Vercel (Ajánlott)
```bash
# Vercel CLI telepítése
npm i -g vercel

# Feltöltés Vercel-re
vercel
```

### Netlify
1. `npm run build` futtatása
2. A `.next` mappa feltöltése Netlify-re
3. Drag & drop a Netlify dashboard-ra

### GitHub Pages
1. GitHub repository létrehozása
2. Kód feltöltése
3. GitHub Actions beállítása

## 📁 Projekt struktúra

```
anime-translator-team/
├── app/                    # Next.js app router
│   ├── page.tsx           # Főoldal
│   ├── team/              # Csapat oldal
│   ├── admin/             # Admin panel
│   └── globals.css        # Globális stílusok
├── components/            # React komponensek
│   ├── Header.tsx
│   ├── AnimeCard.tsx
│   └── FilterBar.tsx
├── data/                  # Adatok
│   ├── animeData.ts       # Anime/Manga adatok
│   └── teamData.ts        # Csapat adatok
└── public/               # Statikus fájlok
```

## 🎨 Színpaletta

- **Primary:** #d4af8c (nude gold)
- **Secondary:** #c4a484 (nude beige)
- **Accent:** #b8a082 (nude tan)
- **Dark:** #8b7355 (nude brown)
- **Light:** #f5f3f0 (nude cream)

## 📝 Admin használat

1. Menj a `/admin` oldalra
2. Add hozzá az új anime/manga tartalmakat
3. Szerkeszd a meglévő tartalmakat
4. Kezeld a csapat tagokat

## 🤝 Közreműködés

1. Fork a repository-t
2. Készíts feature branch-et
3. Commit a változásokat
4. Push a branch-re
5. Nyiss Pull Request-et

## 📄 Licenc

MIT License - részletek a LICENSE fájlban.
