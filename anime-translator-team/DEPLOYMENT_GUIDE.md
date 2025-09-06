# 🚀 Mahou Fansub - Deployment Útmutató

## 📋 **Előkészületek**

### 1. **GitHub Repository létrehozása**
1. Menj a [github.com](https://github.com) oldalra
2. Kattints a **"New"** gombra (zöld gomb)
3. Repository neve: `mahou-fansub`
4. Válaszd ki **"Public"** opciót
5. Kattints **"Create repository"**

### 2. **Kód feltöltése**
1. A repository oldalon kattints **"uploading an existing file"**
2. Húzd fel a teljes `anime-translator-team` mappa tartalmát
3. Commit message: `Initial commit - Mahou Fansub weboldal`
4. Kattints **"Commit changes"**

## 🌐 **GitHub Pages Deployment**

### 1. **GitHub Pages beállítása**
1. Menj a repository **Settings** oldalra
2. Scroll le a bal oldali menüben a **"Pages"** részhez
3. **Source:** Válaszd ki **"Deploy from a branch"**
4. **Branch:** Válaszd ki **"main"**
5. **Folder:** Válaszd ki **"/ (root)"**
6. Kattints **"Save"**

### 2. **GitHub Actions beállítása**
1. A repository oldalon menj a **"Actions"** fülre
2. Kattints **"set up a workflow yourself"**
3. Nevezd el `deploy.yml`-nek
4. Másold be a következő kódot:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

5. Kattints **"Start commit"**
6. Commit message: `Add GitHub Actions workflow`
7. Kattints **"Commit new file"**

### 3. **Permissions beállítása**
1. Menj a repository **Settings** oldalra
2. Scroll le a bal oldali menüben a **"Actions"** → **"General"** részhez
3. **Workflow permissions:** Válaszd ki **"Read and write permissions"**
4. Kattints **"Save"**

## 🎉 **Kész!**

### **Weboldal elérhető:**
```
https://felhasznalonev.github.io/mahou-fansub
```

### **Példa:**
- Ha a GitHub felhasználóneved `johndoe`: `https://johndoe.github.io/mahou-fansub`
- Ha a GitHub felhasználóneved `animefan123`: `https://animefan123.github.io/mahou-fansub`

## 🔧 **Frissítések**

### **Új tartalom hozzáadása:**
1. Szerkeszd a fájlokat helyben
2. Commit és push a változásokat
3. GitHub Actions automatikusan újra buildeli és deploy-olja

### **Admin panel használata:**
1. Menj a weboldalra
2. Jelentkezz be: `admin@mahoufansub.hu` / `admin123`
3. Menj az Admin Panel-re
4. Add hozzá az új anime/manga tartalmakat

## 🎨 **Custom Domain (Opcionális)**

### **Ha saját domain-t szeretnél:**
1. Vásárolj egy domain-t (pl. `mahoufansub.hu`)
2. GitHub Pages Settings-ben add hozzá a custom domain-t
3. Állítsd be a DNS rekordokat:
   - **Type:** CNAME
   - **Name:** www
   - **Value:** felhasznalonev.github.io
4. **Kész!** A weboldal elérhető lesz: `https://mahoufansub.hu`

## 📱 **Tesztelés**

### **Minden funkció tesztelése:**
- ✅ Főoldal betöltése
- ✅ Anime/Manga keresés és szűrés
- ✅ Bejelentkezés/regisztráció
- ✅ Admin panel működése
- ✅ Blog cikkek olvasása
- ✅ Kapcsolattartó űrlap
- ✅ Csapat oldal
- ✅ Mobil nézet

## 🆘 **Hibaelhárítás**

### **Ha nem működik:**
1. Ellenőrizd, hogy a GitHub Actions fut-e
2. Nézd meg a repository Settings → Pages részét
3. Várj 5-10 percet a deployment után
4. Töröld a böngésző cache-t

### **Ha hibát látsz:**
1. Menj a repository Actions fülre
2. Nézd meg a build log-ot
3. Ha szükséges, javítsd a hibákat
4. Push-öld újra a kódot

## 🎯 **Összefoglaló**

A Mahou Fansub weboldal most teljesen kész és online elérhető! 

**Főbb jellemzők:**
- 🎨 Modern, nude színpalettás design
- 📱 Teljesen responsive
- 🔐 Teljes bejelentkezési rendszer
- ⚙️ Admin panel tartalom kezeléshez
- 📝 Blog rendszer hírekhez
- 🎬 Anime/Manga katalógus
- 👥 Csapat bemutatása
- 📞 Kapcsolattartó űrlap

**Sikeres deployment!** 🎉
