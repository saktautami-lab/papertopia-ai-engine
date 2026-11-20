# PAPERTOPIA Web Ready — Static MVP

This is a no-build static web version designed for direct static hosting. It does not require npm, React, Vite, or a backend.

## Included working features
- Responsive dashboard and navigation for mobile/desktop
- Create printable project with category, topic, age, language, page count, difficulty, visual style, paper size, orientation
- Offline template-based page generation
- Edit page title, objective/instructions/body/visual brief
- Add, delete, reorder pages
- Upload a local image per page (max 2 MB)
- Preview and browser Print / Save as PDF
- Brand profile
- Local project persistence using localStorage
- Workspace backup and restore JSON

## Important limitations
- This is a lightweight static MVP, not the full React V4.0 feature set.
- Content is template-based; no AI API or automatic fact verification.
- No user accounts, server authentication, private invitation gate, cloud database, or multi-device sync.
- Browser storage can be cleared. Download backups regularly.
- PDF uses the browser print dialog. Check page breaks and print settings.
- No automatic image generation or batch PNG export.

## Deploy without a build
Upload the contents of this folder (including `index.html`, `app.js`, and `assets/`) to a static hosting provider's direct-upload feature. The entry file must remain `index.html` at the site root.

For Cloudflare Pages Direct Upload, create a Pages project and upload this folder's contents. The resulting URL is public unless an access-control product is separately configured. Do not treat a private source repository as private website access.


## V4.1 — AI Image Studio (external generators)
Each selected page now gets a page-specific illustration prompt. The user can:
1. Copy the prompt.
2. Open ChatGPT Images or Gemini in a new tab.
3. Paste the prompt and generate the image in that service.
4. Download the generated image to the device.
5. Return to PAPERTOPIA and upload it using the page's Upload Ilustrasi control.

Important: this is a copy/open/upload workflow. It does not call either provider's API, auto-submit prompts, or automatically import generated images. Provider sign-in and image-generation availability depend on the user's account and service.


## PAPERTOPIA V4.2 — Free Illustration Library

Versi ini menambahkan 17 ilustrasi SVG offline yang dapat dipilih langsung dari editor halaman:
hewan, buah, alam, tumbuhan, transportasi, rumah, dan bentuk geometri. Pilihan gambar
langsung dimasukkan ke halaman dan ikut tampil pada preview/cetak PDF.

- Tidak menggunakan API gambar dan tidak membutuhkan biaya API.
- Ilustrasi bawaan adalah aset vektor sederhana, bukan gambar AI unik.
- Untuk gambar khusus, AI Image Studio tetap menyediakan prompt ChatGPT/Gemini;
  pengguna perlu menyalin prompt, membuat gambar di layanan tersebut, mengunduhnya,
  lalu mengunggah hasilnya ke PAPERTOPIA.
- Setelah mengganti file di hosting, muat ulang situs. Backup proyek terlebih dahulu.


## PAPERTOPIA V4.3 — Custom Product Studio

Selecting `Custom Product` reveals a custom brief panel:
- custom product name/type
- optional PNG/JPG/WebP reference image (up to 1.5 MB)
- reference intent: visual style, layout, both, or character/object
- design notes

The reference image and notes are saved in the local project. This version does not yet perform AI analysis or image generation; those require a secured server-side model integration and API credentials. Existing standard product categories remain available.


## V5.2 — Custom Reference Studio (multi-reference foundation)
- Custom Product accepts 1 to 6 reference images in one selection or across multiple uploads.
- Images are resized/compressed in-browser before being saved with the local project.
- Users can remove references and author a Visual Style DNA brief (line weight, palette, character traits, composition, whitespace, etc.).
- The written Style DNA is included in page-specific prompts.
- Important limitation: this build does NOT automatically inspect/analyze uploaded reference pixels. The current FLUX Schnell Worker binding is text-to-image and does not accept image-to-image references. When references are attached, START GENERATE explains this limitation rather than pretending to imitate the image. True visual analysis/style transfer requires a compatible vision/image-to-image model and backend integration.
