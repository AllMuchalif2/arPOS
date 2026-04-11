# Vue POS (Point of Sale)

A modern Point of Sale system built with Vue 3 and Supabase.

## 🚀 Live Demo

Aplikasi ini sudah di-deploy dan dapat diakses publik melalui tautan berikut:

**👉 [https://vee-pos.vercel.app/](https://vee-pos.vercel.app/)**

_(Untuk keperluan demo, silakan buat akun atau registrasi Tenant langsung melalui halaman tersebut)._

---

## 🛠 Tech Stack

Proyek ini dibangun menggunakan teknologi web modern:

- **Frontend Framework:** [Vue.js 3](https://vuejs.org/) Composition API 
- **Build Tool:** [Vite](https://vitejs.dev/) (Cepat dan Ringan)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Backend-as-a-Service (BaaS):** [Supabase](https://supabase.com/) (PostgREST API & GoTrue Authentication)
- **Database:** PostgreSQL (Bawaan Supabase)
- **Security / Captcha:** Cloudflare Turnstile (Melindungi API & Edge Functions)
- **Hosting / Deployment:** Vercel

---

## 💻 Cara Menjalankan Secara Lokal (How to Run)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer Anda:

### 1. Clone & Buka Folder Proyek

Jika belum di-clone:

```bash
git clone https://github.com/AllMuchalif2/veePOS.git
```
```bash
cd vue-pos
```

### 2. Install Dependencies

Pastikan Anda sudah menginstall Node.js. Jalankan perintah:

```bash
npm install
```

### 3. Setup Variabel Lingkungan (Environment)

Aplikasi ini membutuhkan akses ke Supabase dan Turnstile.
Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Lalu, isi variabel yang dibutuhkan di dalam file `.env` tersebut.

### 4. Jalankan Development Server

Setelah semua diconfigure, Anda bisa menjalankan server lokal Vite:

```bash
npm run dev
```

Buka browser Anda dan akses `http://localhost:5173` (atau port lain yang tertera di terminal).

---

## 🗄️ Panduan Lengkap Supabase & Database

Untuk langkah detail mengenai pemasangan URL Endpoint API, Konfigurasi Cloudflare Turnstile, Edge Functions, serta sinkronisasi Database Schema / RLS, silakan baca dokumentasi terpisah kami:

👉 **[Baca Panduan SETUP_SUPABASE.md di sini](./SETUP_SUPABASE.md)**.
