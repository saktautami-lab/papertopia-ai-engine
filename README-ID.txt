PAPERTOPIA V5.1 — Cloudflare Workers AI

Paket ini membawa website PAPERTOPIA dan backend Worker dalam satu proyek.
Backend memanggil Cloudflare Workers AI dengan model @cf/black-forest-labs/flux-1-schnell.
API key pihak ketiga tidak diperlukan; Worker memakai binding AI.

CARA DEPLOY PALING AMAN
1. Paket ini tidak dapat dipasang dengan cara mengunggah ZIP statis ke Cloudflare Drop.
   Backend Worker harus di-deploy sebagai Worker project.
2. Cara paling praktis: unggah isi folder ini ke repository GitHub baru.
3. Cloudflare Dashboard > Workers & Pages > Create application > Connect to Git.
4. Pilih repository PAPERTOPIA ini dan deploy. Pastikan build command kosong dan
   konfigurasi memakai wrangler.jsonc.
5. Di Worker Settings > Bindings, pastikan AI binding bernama AI tersedia. Konfigurasi
   wrangler.jsonc sudah mendeklarasikan binding tersebut.
6. Setelah deploy, buka URL Worker dan uji tombol START GENERATE.

CATATAN KUOTA & BIAYA
Workers AI memiliki alokasi harian gratis untuk akun Free yang dapat berubah. Cek dashboard
AI > Usage/Billing sebelum dipakai. Penggunaan di atas kuota gratis dapat memerlukan paket
berbayar; jangan aktifkan pembayaran jika ingin tetap Rp0.

BATASAN SAAT INI
- FLUX Schnell membuat gambar dari prompt teks.
- FLUX Schnell di endpoint ini belum menerima gambar referensi Custom sebagai input.
- Fitur upload template Custom masih tersimpan sebagai brief/acuan proyek, tetapi belum
  mengarahkan model berdasarkan isi gambar. Integrasi image-to-image perlu model tambahan.
- Gambar hasil disimpan di localStorage browser. Untuk proyek besar/multi-device diperlukan
  object storage dan database.
- Jangan membagikan akses Worker secara publik tanpa autentikasi, rate limit, dan pembatasan
  penggunaan.
