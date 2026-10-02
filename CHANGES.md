# CHANGES.md — Recode Button (Batch 1)

## Root cause yang ditemukan
Bot ini sebelumnya punya 2 masalah yang bikin fitur button nggak pernah jalan,
sekalipun sudah dicoba diubah pakai ChatGPT/DeepSeek:

1. **Helper button lama** (`conn.sendButton`, `sendBut`, `send2But`, dst di
   `lib/simple.js`) masih pakai format `buttonsMessage` versi lama. Format ini
   sekarang sering nggak dirender WhatsApp di akun non-Business API.
2. **Bug utama:** serializer pesan di `lib/simple.js` (bagian `m.text = ...`)
   sebelumnya SAMA SEKALI belum bisa baca balasan saat tombol/list di-tap.
   Jadi walau tombolnya muncul, pas di-tap bot nggak paham itu maksudnya apa.
   Ini kemungkinan besar penyebab utama semua percobaan sebelumnya gagal.

## Apa yang sudah diubah

### `lib/simple.js`
- **Fix serializer**: sekarang bisa baca balasan dari `buttonsResponseMessage`,
  `templateButtonReplyMessage`, `listResponseMessage`, dan
  `interactiveResponseMessage` (format modern/nativeFlow).
- **Helper baru**: `conn.sendButtonsM(jid, opts)` dan `conn.sendListM(jid, opts)`
  — pakai format modern (`interactiveMessage`). Ini yang dipakai buat fitur
  button ke depannya, BUKAN `sendButton`/`sendBut` yang lama.

  Cara pakai:
  ```js
  // Button biasa (maks ~3 disarankan)
  await conn.sendButtonsM(m.chat, {
    text: 'Pilih salah satu:',
    footer: 'Footer disini',
    buttons: [
      { text: 'Video', id: `${usedPrefix}tiktok ${url} video` },
      { text: 'Audio', id: `${usedPrefix}tiktok ${url} audio` },
    ],
    quoted: m
  })

  // List (buat pilihan banyak, kayak menu kategori)
  await conn.sendListM(m.chat, {
    text: 'Pilih kategori:',
    title: 'DAFTAR MENU',
    sectionTitle: 'Kategori',
    buttonText: 'Buka',
    rows: [
      { title: 'Menu Downloader', id: `${usedPrefix}menu downloader`, description: 'Lihat semua downloader' },
    ],
    quoted: m
  })
  ```
  **PENTING:** `id` pada tiap button/row HARUS berupa command lengkap dengan
  prefix (misal `.menu downloader`), karena itu yang bakal "dianggap" sebagai
  ketikan user pas tombolnya di-tap.

### `plugins/menu.js`
- Menu utama sekarang full pakai **list interaktif** (tap kategori langsung
  buka submenu-nya, nggak perlu ngetik manual).
- Submenu kategori dikasih tombol "⬅️ Menu Utama" buat balik.

## Yang BELUM diubah (masih 700+ plugin lain)
Recode "semua fitur" sekaligus nggak realistis dikerjain dalam satu batch.
Fix di `lib/simple.js` di atas itu **fondasinya** — begitu itu kepasang dan
kebukti jalan, plugin lain tinggal ditambahin button pakai
`conn.sendButtonsM` / `conn.sendListM` yang sama, satu-satu atau per
kategori (misal semua plugin `downloader-*.js` sekaligus).

## Yang perlu kamu lakuin
1. Deploy/jalanin bot ini di panel kamu (project ini masih project yang sama,
   cuma 3 file yang berubah: `lib/simple.js`, `plugins/menu.js`, dan
   `CHANGES.md` ini).
2. Ketik `.menu` — cek apakah muncul sebagai list interaktif dan tombolnya
   beneran bisa di-tap & direspon bot.
3. Kabarin hasilnya (berhasil / error / tombol nggak muncul). Karena saya
   nggak punya akses buat run WhatsApp session beneran, ini perlu dites
   langsung di sisi kamu — kalau ada error, kirim pesan errornya biar saya
   bisa pas-in.
4. Kalau `.menu` udah oke, kasih tau plugin/kategori mana lagi yang mau
   di-convert duluan (misal `downloader-tiktok.js` + `downloader-ig.js`).
