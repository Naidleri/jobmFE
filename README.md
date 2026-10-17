# JobmFE

Frontend aplikasi lowongan kerja menggunakan React, TypeScript, dan Vite.

## Menjalankan project

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal, biasanya:

```text
http://localhost:5173
```

## Konfigurasi API

Buat file `.env.local` di root project:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Pastikan backend berjalan di port `3000`.

## Perintah lain

```bash
npm run lint
npm run build
```

- `npm run lint` untuk mengecek kode.
- `npm run build` untuk membuat build production.
