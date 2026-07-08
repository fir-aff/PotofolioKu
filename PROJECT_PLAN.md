# 🏗️ Master Plan Portfolio (Headless CMS)

## 1. Arsitektur & Tech Stack
- **Frontend (User View):** Next.js (App Router), Tailwind CSS
- **Backend (API) & Admin Panel:** Laravel, Filament PHP
- **Database:** MySQL

---

## 2. Struktur Database (Entity Relationship)

Sistem akan memiliki beberapa tabel utama yang bisa dikelola (CRUD) melalui Filament Admin Panel:

### A. Tabel `projects` (Karya & Proyek)
Menyimpan data proyek seperti INAPROC+, Sistem Agregator Travel, hingga desain UI/UX.
- `id` (Primary Key)
- `title` (String) - *Contoh: Aplikasi Web INAPROC+*
- `slug` (String) - *URL friendly, contoh: aplikasi-web-inaproc-plus*
- `category` (String) - *Web Dev, UI/UX, Security, dll.*
- `short_description` (Text)
- `content` (LongText) - *Penjelasan detail (metode STAR)*
- `image_url` (String/Lokal path) - *Thumbnail proyek*
- `github_url` (String, Nullable)
- `live_url` (String, Nullable)
- `is_featured` (Boolean) - *Tampil di halaman depan*

### B. Tabel `experiences` (Pengalaman Kerja & Organisasi)
Menyimpan riwayat asisten praktikum, organisasi, dan magang.
- `id` (Primary Key)
- `title_role` (String) - *Contoh: Asisten Laboratorium Keamanan Sistem Informasi*
- `company_organization` (String)
- `start_date` (Date)
- `end_date` (Date, Nullable) - *Kosong jika 'Sekarang'*
- `description` (Text) - *Poin-poin tanggung jawab*
- `type` (Enum: Pekerjaan, Organisasi, Asisten Lab)

### C. Tabel `skills` (Keahlian)
- `id` (Primary Key)
- `name` (String) - *Contoh: Laravel, MikroTik, Figma*
- `category` (Enum: Hard Skill, Soft Skill, Tools)
- `icon_svg` (Text, Nullable) - *Untuk render ikon di Next.js*

### D. Tabel `achievements` (Penghargaan & Sertifikasi)
- `id` (Primary Key)
- `title` (String)
- `issuer` (String) - *Penyelenggara, misal: Telkom University*
- `date_received` (Date)

### E. Tabel `messages` (Pesan Masuk)
Menyimpan pesan dari form kontak portofolio.
- `id` (Primary Key)
- `name` (String)
- `email` (String)
- `message` (Text)
- `is_read` (Boolean) - *Default: false*

---

## 3. Desain API (Laravel Endpoints)

Next.js akan melakukan *fetch* data ke alamat ini. Pastikan *output* berupa format JSON.

- `GET /api/projects` -> Menampilkan semua proyek (bisa difilter berdasarkan kategori).
- `GET /api/projects/{slug}` -> Menampilkan detail satu proyek secara spesifik.
- `GET /api/experiences` -> Menampilkan riwayat pengalaman, diurutkan dari yang terbaru.
- `GET /api/skills` -> Menampilkan daftar keahlian.
- `GET /api/achievements` -> Menampilkan daftar penghargaan.
- `POST /api/messages` -> Endpoint untuk menerima pengiriman *form* kontak dari Next.js.

---

## 4. Struktur Halaman Frontend (Next.js Routing)

- `/` -> **Hero Section & Highlight:** Menampilkan sapaan, perkenalan singkat, beberapa `projects` yang memiliki status `is_featured`, dan *call-to-action* (Unduh CV).
- `/about` -> **Tentang Saya:** Mengambil data dari endpoint `/api/experiences` dan `/api/skills` serta `/api/achievements`.
- `/projects` -> **Katalog Karya:** Menampilkan *grid* dari semua data di `/api/projects`.
- `/projects/[slug]` -> **Detail Proyek:** Halaman dinamis untuk membahas satu proyek secara mendalam.
- `/contact` -> **Hubungi Saya:** Berisi *form* yang menembak ke `POST /api/messages` dan tautan LinkedIn/GitHub.