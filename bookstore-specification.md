# 📚 BookStore Webalkalmazás – Általános Specifikáció

## 1. Projekt Áttekintés

A **BookStore** egy modern, reszponzív webalkalmazás, amely lehetővé teszi a felhasználók számára, hogy böngésszenek, vásároljanak és értékeljenek könyveket.  
Az alkalmazás frontendje **React**-re épül, míg a backendhez egy **RESTful API** szolgál.  
Az adatok tárolásához **PostgreSQL**.

---

## 2. Fő Funkciók

### 2.1. Publikus Funkciók
- Könyvek listázása (borító, cím, szerző, ár, értékelés)
- Keresés cím, szerző vagy kategória alapján
- Könyv részletes nézete (leírás, vélemények, elérhetőség)
- Kosárba helyezés
- Regisztráció és bejelentkezés (e-mail/jelszó)
- Vásárlás (mock vagy valódi fizetési integráció – pl. Stripe)

### 2.2. Bejelentkezett Felhasználói Funkciók
- Saját profil megtekintése és szerkesztése
- Vásárlási előzmények megtekintése
- Saját értékelések kezelése
- Könyvek értékelése (1–5 csillag + szöveges vélemény)

### 2.3. Admin Funkciók
- Könyvek hozzáadása, szerkesztése, törlése
- Felhasználók kezelése
- Rendelések nyomon követése
- Statisztikák megtekintése (forgalom, eladások, top könyvek)

---

## 3. Technológiai Stack

### Frontend
- **React 18+**
- **React Router** – navigáció
- **TanStack Query** – API hívásokhoz
- **Tailwind CSS** – dizájn és UI komponensek
- **Redux Toolkit** – állapotkezelés
- **Vite** – fejlesztői környezet

### Backend (ajánlott)
- **Node.js + Express.js**
- **Sequelize** ORM
- **PostgreSQL** adatbázis
- **JWT** alapú hitelesítés
- **bcrypt** jelszóhasheléshez

---

## 4. Adatbázis Sématerv (példa PostgreSQL esetén)

### Tábla: `users`
| id | name | email | password_hash | role | created_at |
|----|------|--------|---------------|------|-------------|

### Tábla: `books`
| id | title | author | price | category | description | image_url | stock | created_at |

### Tábla: `reviews`
| id | user_id | book_id | rating | comment | created_at |

### Tábla: `orders`
| id | user_id | total_price | status | created_at |

### Tábla: `order_items`
| id | order_id | book_id | quantity | price |

---

## 5. Oldalstruktúra

| Oldal | URL | Funkció |
|--------|------|---------|
| Főoldal | `/` | Könyvek listázása |
| Könyv részletei | `/books/:id` | Könyv adatlap, értékelések |
| Bejelentkezés | `/login` | Felhasználói autentikáció |
| Regisztráció | `/register` | Új fiók létrehozása |
| Kosár | `/cart` | Kosár tartalma, vásárlás |
| Profil | `/profile` | Felhasználói adatok |
| Admin panel | `/admin` | Könyvek és felhasználók kezelése |

---

## 6. Biztonság és Hitelesítés

- **JWT token alapú autentikáció**
- Token tárolása **HttpOnly cookie-ban**
- Role-based access control (user / admin)
- Jelszavak hashelése `bcrypt`-tel

---

## 7. Fejlesztési Javaslatok

- `.env` fájl a konfigurációkhoz
- Prettier a kódminőséghez
- Docker támogatás fejlesztői és éles környezethez
- CI/CD pipeline (GitHub Actions, Vercel/Render/Netlify)

---

## 8. Jövőbeli Bővítési Lehetőségek

- Wishlist funkció
- Ajánlórendszer (könyvajánló korábbi vásárlások alapján)
- Többnyelvű támogatás (i18n)
- Mobil alkalmazás React Native segítségével
- PDF vagy e-book vásárlási lehetőség

---

## 9. Ajánlott Eszközök és Könyvtárak

| Cél | Könyvtár / Szolgáltatás |
|-----|--------------------------|
| UI komponensek | Tailwind CSS |
| Hitelesítés | JSON Web Token |
| Adatbázis | PostgreSQL |
| ORM | Sequelize |
| Fizetés | Stripe API |
| Állapotkezelés | Redux Toolkit |
| Telepítés | Vercel / Render / Railway |

---

© 2025 BookStore Project – Készült React alapon.
