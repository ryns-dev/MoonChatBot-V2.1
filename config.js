const __filename = import.meta.filename;
// Timezone
process.env.TZ = 'Asia/Jakarta';

// Pengaturan Bot disini Semua
global.owner = ["66961417114"]; // wajib di isi tidak boleh kosong
global.mods = ["66961417114"]; // wajib di isi tidak boleh kosong
global.prems = ["66961417114"]; // wajib di isi tidak boleh kosong
global.nameowner = "ryns dev"; // wajib di isi tidak boleh kosong
global.numberowner = "66961417114"; // wajib di isi tidak boleh kosong
global.mail = "ryukoputrategar1507@gmail.com"; // wajib di isi tidak boleh kosong
global.gc = "https://chat.whatsapp.com/H19gbX0a8mvAdNcTLiCJ1h"; // wajib di isi tidak boleh kosong
global.instagram = "https://instagram.com/ryukoputra88"; // wajib di isi tidak boleh kosong
global.wm = "© rynsdev"; // isi nama bot atau nama kalian
global.wait = "_*Tunggu sedang di proses...*_"; // ini pesan simulasi loading
global.eror = "_*Server Error*_"; // ini pesan saat terjadi kesalahan
global.stiker_wait = "*⫹⫺ Stiker sedang dibuat...*"; // ini pesan simulasi saat loading pembuatan sticker
global.thumb = "https://www.image2url.com/r2/default/images/1790461113037-dcae1315-9f70-46a1-b948-037f4aa03f41.jpg";
global.packname = "Made With"; // watermark stikcker packname
global.author = "Bot WhatsApp"; // watermark stikcker author
global.maxwarn = "5"; // Peringatan maksimum Warn




// APIKEY INI WAJIB UNTUK DI ISI! //
global.btc = "wongirengJembuten168";



// AKSESKEY INI DI ISI JIKA DIPERLUKAN JADI TIDAK WAJIB DI ISI! (e.g suno ai (ai music ) & fitur prem lainnya//
global.aksesKey = "wongirengJembuten168";

// Tidak boleh diganti atau di ubah
global.APIs = {
  btc: "https://api.botcahx.eu.org",
};

//Tidak boleh diganti atau di ubah
global.APIKeys = {
  "https://api.botcahx.eu.org": global.btc,
};

import fs from 'fs';
import chalk from 'chalk';
import { pathToFileURL } from 'url';
let file = import.meta.filename;
fs.unwatchFile(file);
fs.watchFile(file, async () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  await import(pathToFileURL(file).href + '?update=' + Date.now());
});