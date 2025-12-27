# 👾 Ryo MD — Modular Telegram Bot

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Maintained-Yes-green?style=for-the-badge" alt="Maintained">
  <img src="https://img.shields.io/badge/Framework-Telegraf.js-orange?style=for-the-badge" alt="Framework">
  <img src="https://img.shields.io/badge/Node.js-v16+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
</p>

---

## 📖 Description
**Ryo MD** adalah bot Telegram modern berbasis **Node.js** yang ditenagai oleh framework **Telegraf.js**. Project ini dirancang dengan arsitektur **Automated Plugin Loader**, memungkinkan pengembang menambahkan fitur baru hanya dengan meletakkan file di folder `plugin/` tanpa perlu melakukan konfigurasi ulang pada core system.

### ✨ Key Features
* **Plug-and-Play:** Tambahkan fitur baru secara instan di folder plugins.
* **Modular Design:** Struktur kode yang bersih dan mudah dipelajari.
* **Performance:** Ringan dan responsif dengan konsumsi RAM yang rendah.
* **Elegant UI:** Tampilan menu dan pesan yang estetik menggunakan HTML parse mode.
* **Rich Features:** Mulai dari AI (GPT-4, DeepSeek), Downloader (TikTok, Spotify), hingga Tools Image/Sticker.

---

## 🛠️ Installation & Run

### 1. Prasyarat
* [Node.js](https://nodejs.org/) (Versi 18 atau lebih tinggi direkomendasikan).
* API Token Bot (Dapatkan di [@BotFather](https://t.me/BotFather)).

### 2. Clone Project
```bash
git clone [https://github.com/vinxzoffcc/ryo-md.git](https://github.com/vinxzoffcc/ryo-md.git)
cd ryo-md

3. Instal Dependensi
npm install

4. Konfigurasi
Buka file config.js dan masukkan Token Bot serta konfigurasi API lainnya.
5. Jalankan Bot
npm start

📁 Folder Structure
Ryo-MD/
├── index.js          # Main entry point & plugin loader
├── config.js         # API Key & Bot Settings
├── package.json      # Dependencies list
├── README.md         # Documentation
└── plugin/           # All bot features (Automatic Load)
    ├── info.js       # Ping, speed, uptime & fitur stats
    ├── ai.js         # GPT-4o, Groq, DeepSeek & Fixcode
    ├── downloader.js # TikTok, Spotify, Mediafire, Pinterest
    ├── search.js     # TikTok search & web search
    ├── anime.js      # Waifu, Neko, Shinobu (SFW)
    ├── islamic.js    # Tanya Ustad & Islamic tools
    ├── tools.js      # Tourl & utility lainnya
    └── sticker.js    # Image to Sticker, QC, & Brat

👨‍💻 Contact Developer
Punya pertanyaan atau ingin berkontribusi? Silakan hubungi pengembang:
 * Developer: Viǹz Fòrev̂er
 * Telegram: @VinnOffcial
 * Thank To: @JianCode
📜 License
Project ini dilisensikan di bawah MIT License. Anda bebas menggunakan dan memodifikasi kode ini asalkan tetap memberikan kredit kepada developer asli.
<p align="center">Made with ❤️ by <b>VinnOffcial</b></p>