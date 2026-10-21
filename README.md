# Zhico Pradita Portfolio

Portfolio Next.js dengan panel admin untuk mengelola project, certification, experience, skill, dan tools.

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Catatan deployment

- Database production wajib memakai PostgreSQL yang sama untuk runtime dan migration. Jangan menjalankan `prisma db push --accept-data-loss` pada setiap build karena perubahan schema dapat menghapus data.
- Set `DATABASE_POSTGRES_PRISMA_URL`, `DATABASE_POSTGRES_URL_NON_POOLING`, dan `BLOB_READ_WRITE_TOKEN` di environment production.
- Upload gambar dari form admin sekarang memakai nama file acak (`addRandomSuffix`) dan tidak menimpa file lama. Data lama tidak akan terhapus ketika item baru ditambahkan.
- Logo skill/tool menggunakan dropdown ikon lokal, sehingga tidak bergantung pada URL eksternal.
- CV tersedia di `/CV_Zhico_Pradita_ATS.pdf` dan tombol **DOWNLOAD CV** ada di hero.

## Build production

```bash
npx prisma generate
npm run build
npm run start
```
