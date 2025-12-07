const fs = require('fs');
const path = require('path');

// Blog posts configuration with aggressive SEO keywords
const blogPosts = [
  {
    slug: "oxygen-concentrator-vs-tong-oksigen",
    title: "Oxygen Concentrator vs Tong Oksigen: Mana Lebih Baik? | Perbandingan Lengkap 2024",
    metaDesc: "Perbandingan oxygen concentrator vs tong oksigen / tangki oksigen. Kelebihan kekurangan, kos bulanan, keselamatan. Mana lebih jimat untuk terapi oksigen rumah?",
    keywords: "oxygen concentrator vs tong oksigen, tangki oksigen vs concentrator, tong oksigen murah, oxygen tank malaysia, perbandingan oksigen, kos oxygen concentrator, kos tong oksigen",
    h1: "Oxygen Concentrator vs Tong Oksigen: Perbandingan Lengkap 2024",
    intro: "Bingung memilih antara oxygen concentrator atau tong oksigen untuk terapi oksigen di rumah? Artikel ini membandingkan kedua-duanya dari segi kos, keselamatan, dan kemudahan penggunaan.",
    sections: [
      { h2: "Apa Itu Oxygen Concentrator?", content: "Oxygen concentrator adalah mesin elektrik yang menapis oksigen daripada udara biasa menghasilkan ketulenan 93-96%. Tidak perlu isi semula, boleh beroperasi 24/7." },
      { h2: "Apa Itu Tong Oksigen?", content: "Tong oksigen (tangki oksigen) adalah silinder bertekanan tinggi yang menyimpan oksigen tulen. Perlu isi semula apabila habis, kos refill RM50-150 setiap kali." },
      { h2: "Perbandingan Kos Bulanan", content: "Oxygen Concentrator: RM50-100/bulan (elektrik sahaja). Tong Oksigen: RM200-500/bulan (kos refill berulang). Jelas, oxygen concentrator lebih jimat dalam jangka panjang." },
      { h2: "Perbandingan Keselamatan", content: "Oxygen concentrator lebih selamat kerana beroperasi pada tekanan rendah. Tong oksigen bertekanan tinggi berisiko meletup jika tidak dikendalikan dengan betul." },
      { h2: "Kesimpulan: Mana Lebih Baik?", content: "Untuk penggunaan jangka panjang di rumah, oxygen concentrator adalah pilihan terbaik. Lebih jimat, selamat, dan mudah digunakan. Tong oksigen sesuai untuk backup kecemasan sahaja." }
    ]
  },
  {
    slug: "oxygen-concentrator-untuk-copd",
    title: "Oxygen Concentrator untuk COPD: Panduan Terapi Oksigen Rumah | Malaysia 2024",
    metaDesc: "Panduan lengkap oxygen concentrator untuk pesakit COPD di Malaysia. Berapa liter sehari, bila guna, tips penjagaan. Sewa oksigen untuk COPD dari RM150/bulan.",
    keywords: "oxygen concentrator COPD, terapi oksigen COPD, oksigen untuk COPD, COPD oxygen therapy, mesin oksigen COPD, berapa liter oksigen COPD, oxygen concentrator untuk paru-paru",
    h1: "Oxygen Concentrator untuk COPD: Panduan Lengkap Terapi Oksigen Rumah",
    intro: "COPD (Chronic Obstructive Pulmonary Disease) adalah penyakit paru-paru kronik yang memerlukan terapi oksigen. Artikel ini menerangkan bagaimana oxygen concentrator membantu pesakit COPD.",
    sections: [
      { h2: "Mengapa Pesakit COPD Perlu Oxygen Concentrator?", content: "Pesakit COPD mengalami kesukaran bernafas kerana paru-paru rosak. Oxygen concentrator membantu meningkatkan paras oksigen dalam darah, mengurangkan sesak nafas, dan meningkatkan kualiti hidup." },
      { h2: "Berapa Liter Oksigen Diperlukan untuk COPD?", content: "Kebanyakan pesakit COPD memerlukan 1-3 liter/minit. Kes yang lebih teruk mungkin memerlukan 4-6 liter/minit. Sentiasa ikut preskripsi doktor anda." },
      { h2: "Bila Perlu Guna Oxygen Concentrator?", content: "Bergantung kepada tahap COPD: semasa tidur sahaja, semasa aktiviti, atau 24 jam. Doktor akan tentukan berdasarkan ujian SpO2 dan analisis gas darah." },
      { h2: "Unit 5L vs 10L untuk COPD", content: "Unit 5L mencukupi untuk kebanyakan pesakit COPD (1-5 L/min). Unit 10L diperlukan untuk high-flow therapy atau penggunaan 2 pesakit serentak." },
      { h2: "Tips Penjagaan untuk Pesakit COPD", content: "Gunakan pulse oximeter untuk pantau SpO2. Jangan tingkatkan liter tanpa arahan doktor. Pastikan pengudaraan bilik baik. Elakkan merokok di sekeliling oxygen concentrator." }
    ]
  },
  {
    slug: "portable-oxygen-concentrator-travel-umrah-haji",
    title: "Portable Oxygen Concentrator untuk Travel, Umrah & Haji | FAA Approved Malaysia",
    metaDesc: "Panduan portable oxygen concentrator untuk travel, umrah, haji. FAA approved, boleh naik kapal terbang. Sewa portable oxygen RM300/bulan. Ringan 2.5kg.",
    keywords: "portable oxygen concentrator, oxygen concentrator travel, oxygen concentrator umrah, oxygen concentrator haji, FAA approved oxygen, oxygen kapal terbang, sewa portable oxygen, travel dengan oksigen",
    h1: "Portable Oxygen Concentrator untuk Travel, Umrah & Haji",
    intro: "Ingin travel, pergi umrah atau haji tetapi memerlukan terapi oksigen? Portable oxygen concentrator adalah penyelesaian ideal. Artikel ini menerangkan semua yang perlu anda tahu.",
    sections: [
      { h2: "Apa Itu Portable Oxygen Concentrator?", content: "Portable oxygen concentrator adalah versi ringan dan mudah alih yang menggunakan bateri. Berat hanya 2.5kg dan boleh dibawa ke mana-mana termasuk kapal terbang." },
      { h2: "FAA Approved - Boleh Naik Kapal Terbang", content: "Portable oxygen concentrator kami adalah FAA approved, bermaksud dibenarkan untuk digunakan di atas kapal terbang. Maklumkan kepada syarikat penerbangan 48 jam sebelum penerbangan." },
      { h2: "Tips untuk Umrah & Haji dengan Oxygen Concentrator", content: "Bawa extra bateri (4-8 jam setiap satu). Inform travel agent dan syarikat penerbangan. Dapatkan surat doktor sebagai bukti keperluan perubatan. Kami boleh arrange penghantaran ke Saudi Arabia." },
      { h2: "Bateri dan Pengecasan", content: "Bateri tahan 4-8 jam bergantung kepada liter setting. Car charger disediakan. Boleh cas semasa dalam kereta atau hotel." },
      { h2: "Harga Sewa Portable Oxygen Concentrator", content: "Sewa portable oxygen concentrator: RM300/bulan atau RM100/minggu untuk short-term travel. Termasuk beg galas, bateri extra, dan car charger." }
    ]
  },
  {
    slug: "cara-guna-oxygen-concentrator",
    title: "Cara Guna Oxygen Concentrator: Tutorial Lengkap Step-by-Step | Malaysia",
    metaDesc: "Tutorial lengkap cara guna oxygen concentrator di rumah. Setup, pasang nasal cannula, setting liter, penyelenggaraan. Panduan pemula mesin oksigen.",
    keywords: "cara guna oxygen concentrator, tutorial oxygen concentrator, setup oxygen concentrator, pasang mesin oksigen, nasal cannula, setting liter oxygen, penyelenggaraan oxygen concentrator",
    h1: "Cara Guna Oxygen Concentrator: Tutorial Lengkap untuk Pemula",
    intro: "Baru dapat oxygen concentrator dan tidak tahu cara menggunakannya? Jangan risau! Panduan ini akan ajar anda step-by-step dari setup hingga penyelenggaraan.",
    sections: [
      { h2: "Step 1: Unboxing dan Setup", content: "Keluarkan oxygen concentrator dari kotak. Letakkan di tempat rata dengan pengudaraan baik (jauh dari dinding minimum 30cm). Sambungkan kabel kuasa ke soket." },
      { h2: "Step 2: Pasang Humidifier (Jika Ada)", content: "Isi humidifier bottle dengan distilled water (air suling) sehingga garisan MAX. Pasang ke oxygen concentrator. Humidifier membantu lembapkan oksigen." },
      { h2: "Step 3: Sambung Nasal Cannula atau Mask", content: "Sambungkan tube ke outlet oksigen. Pakai nasal cannula (tiub hidung) atau mask oksigen. Pastikan kedudukan selesa dan tiada kebocoran." },
      { h2: "Step 4: Hidupkan dan Set Liter", content: "Tekan butang ON. Tunggu 5-10 minit untuk mesin warm up. Set liter flow mengikut preskripsi doktor (contoh: 2 L/min). Lampu hijau menandakan oksigen sedang dihasilkan." },
      { h2: "Penyelenggaraan Harian", content: "Bersihkan filter setiap minggu dengan air sabun. Ganti air humidifier setiap hari. Lap permukaan mesin dengan kain lembap. Ganti nasal cannula setiap 2 minggu." }
    ]
  },
  {
    slug: "oxygen-concentrator-vs-nebulizer",
    title: "Oxygen Concentrator vs Nebulizer: Apa Bezanya? | Panduan Lengkap Malaysia",
    metaDesc: "Beza oxygen concentrator dan nebulizer. Fungsi berbeza - oksigen vs ubat. Boleh guna bersama? Panduan memilih untuk asthma, COPD, dan masalah pernafasan.",
    keywords: "oxygen concentrator vs nebulizer, beza nebulizer oxygen, nebulizer untuk asthma, oxygen concentrator untuk asthma, nebulizer machine malaysia, mesin nebulizer, inhaler vs nebulizer",
    h1: "Oxygen Concentrator vs Nebulizer: Apa Bezanya?",
    intro: "Ramai yang keliru antara oxygen concentrator dan nebulizer. Walaupun kedua-duanya untuk masalah pernafasan, fungsinya sangat berbeza. Artikel ini menerangkan perbezaan utama.",
    sections: [
      { h2: "Fungsi Oxygen Concentrator", content: "Oxygen concentrator menghasilkan oksigen tulen untuk meningkatkan paras oksigen dalam darah. Digunakan untuk pesakit yang memerlukan terapi oksigen seperti COPD, COVID recovery, dan kegagalan jantung." },
      { h2: "Fungsi Nebulizer", content: "Nebulizer menukar ubat cecair menjadi wap halus untuk dihidu terus ke paru-paru. Digunakan untuk menghantar ubat bronchodilator atau steroid kepada pesakit asthma dan COPD." },
      { h2: "Boleh Guna Bersama?", content: "Ya! Ramai pesakit COPD dan asthma teruk perlu kedua-duanya. Sesetengah oxygen concentrator mempunyai nebulizer function built-in, memudahkan penggunaan serentak." },
      { h2: "Bila Perlu Oxygen Concentrator?", content: "Apabila paras SpO2 rendah (<92%), sesak nafas berterusan, atau doktor preskripsi terapi oksigen. Oxygen concentrator tidak boleh menggantikan nebulizer untuk menghantar ubat." },
      { h2: "Bila Perlu Nebulizer?", content: "Apabila perlu menghantar ubat seperti Ventolin, Pulmicort, atau ubat pernafasan lain terus ke paru-paru. Nebulizer tidak boleh menggantikan oxygen concentrator untuk terapi oksigen." }
    ]
  },
  {
    slug: "oxygen-concentrator-vs-cpap",
    title: "Oxygen Concentrator vs CPAP: Mana Yang Anda Perlukan? | Sleep Apnea vs Low O2",
    metaDesc: "Beza oxygen concentrator dan CPAP machine. Sleep apnea vs low oxygen. Boleh guna bersama? Panduan memilih untuk masalah tidur dan pernafasan.",
    keywords: "oxygen concentrator vs CPAP, CPAP machine malaysia, sleep apnea machine, beza CPAP oxygen, CPAP untuk tidur, mesin tidur, oxygen concentrator tidur",
    h1: "Oxygen Concentrator vs CPAP Machine: Panduan Memilih",
    intro: "Sleep apnea dan low oxygen adalah dua masalah berbeza yang memerlukan rawatan berbeza. Artikel ini menerangkan perbezaan antara CPAP machine dan oxygen concentrator.",
    sections: [
      { h2: "Apa Itu CPAP Machine?", content: "CPAP (Continuous Positive Airway Pressure) adalah mesin yang menghantar tekanan udara untuk membuka saluran pernafasan semasa tidur. Digunakan untuk merawat obstructive sleep apnea (OSA)." },
      { h2: "Apa Itu Oxygen Concentrator?", content: "Oxygen concentrator menghasilkan oksigen tulen untuk pesakit dengan paras oksigen rendah dalam darah. Digunakan untuk COPD, COVID recovery, dan masalah pernafasan lain." },
      { h2: "Sleep Apnea vs Low Oxygen", content: "Sleep apnea: saluran pernafasan tersumbat semasa tidur, menyebabkan berdengkur dan henti nafas. Low oxygen: paru-paru tidak dapat menyerap cukup oksigen. Kedua-duanya berbeza." },
      { h2: "Boleh Guna Bersama?", content: "Ya, sesetengah pesakit memerlukan kedua-duanya. CPAP untuk membuka saluran pernafasan + oxygen concentrator untuk meningkatkan paras oksigen. Doktor akan tentukan keperluan anda." },
      { h2: "Mana Yang Anda Perlukan?", content: "Berdengkur kuat + henti nafas semasa tidur = CPAP. SpO2 rendah + sesak nafas = Oxygen concentrator. Kedua-dua masalah = kedua-dua mesin. Rujuk doktor untuk diagnosis tepat." }
    ]
  },
  {
    slug: "harga-oxygen-concentrator-malaysia-2024",
    title: "Harga Oxygen Concentrator Malaysia 2024: Sewa vs Beli | Perbandingan Jenama",
    metaDesc: "Harga oxygen concentrator Malaysia terkini 2024. Perbandingan harga sewa dan beli. Jenama Philips, Yuwell, Inogen. Harga dari RM150/bulan atau RM2,500 beli.",
    keywords: "harga oxygen concentrator malaysia, harga mesin oksigen, oxygen concentrator price malaysia, harga sewa oksigen, beli oxygen concentrator murah, philips oxygen concentrator harga, yuwell oxygen concentrator price",
    h1: "Harga Oxygen Concentrator Malaysia 2024: Panduan Lengkap",
    intro: "Mencari harga oxygen concentrator terkini di Malaysia? Artikel ini membandingkan harga sewa dan beli dari pelbagai jenama popular.",
    sections: [
      { h2: "Harga Sewa Oxygen Concentrator 2024", content: "Unit 5L: RM150-200/bulan. Unit 10L: RM250-350/bulan. Portable: RM300-400/bulan. Harga termasuk penghantaran, setup, dan sokongan 24/7." },
      { h2: "Harga Beli Oxygen Concentrator 2024", content: "Unit 5L: RM2,500-4,000. Unit 10L: RM4,500-7,000. Portable: RM5,000-12,000. Harga berbeza mengikut jenama dan features." },
      { h2: "Perbandingan Jenama Popular", content: "Philips Respironics: Premium, harga tinggi. Yuwell: Kualiti baik, harga sederhana. Inogen: Portable terbaik, harga tinggi. JAY: Budget friendly." },
      { h2: "Sewa atau Beli: Mana Lebih Jimat?", content: "Penggunaan <18 bulan: Sewa lebih jimat. Penggunaan >18 bulan: Beli lebih jimat. Faktor lain: penyelenggaraan (sewa = percuma), warranty, dan fleksibiliti." },
      { h2: "Tips Dapat Harga Terbaik", content: "Bandingkan harga dari beberapa pembekal. Tanya tentang pakej sewa jangka panjang (diskaun). Pastikan harga termasuk aksesori dan sokongan. Elakkan pembekal tanpa kelulusan KKM." }
    ]
  },
  {
    slug: "oxygen-concentrator-untuk-covid-19-recovery",
    title: "Oxygen Concentrator untuk COVID-19 Recovery: Panduan Lengkap Malaysia 2024",
    metaDesc: "Panduan oxygen concentrator untuk pemulihan COVID-19. Bila perlukan terapi oksigen, paras SpO2 selamat, berapa liter. Sewa oxygen COVID recovery RM150/bulan.",
    keywords: "oxygen concentrator COVID, oksigen untuk COVID, terapi oksigen COVID, COVID recovery oxygen, SpO2 COVID, mesin oksigen COVID, sewa oksigen COVID",
    h1: "Oxygen Concentrator untuk COVID-19 Recovery",
    intro: "Ramai pesakit COVID-19 memerlukan terapi oksigen semasa pemulihan. Artikel ini menerangkan bila dan bagaimana oxygen concentrator membantu recovery COVID.",
    sections: [
      { h2: "Mengapa Pesakit COVID Perlu Oxygen Concentrator?", content: "COVID-19 boleh merosakkan paru-paru dan mengurangkan keupayaan menyerap oksigen. Terapi oksigen membantu mengekalkan paras oksigen semasa pemulihan." },
      { h2: "Paras SpO2 Selamat dan Berbahaya", content: "Normal: 95-100%. Pemantauan: 90-94%. Berbahaya: <90% (perlu terapi oksigen segera). Gunakan pulse oximeter untuk pantau SpO2 di rumah." },
      { h2: "Bila Perlu Oxygen Concentrator untuk COVID?", content: "SpO2 <93% semasa rehat. Sesak nafas semasa aktiviti ringan. Doktor preskripsi terapi oksigen. Discharge dari hospital dengan arahan home oxygen." },
      { h2: "Berapa Liter untuk COVID Recovery?", content: "Kebanyakan bermula dengan 1-2 L/min. Tingkatkan jika SpO2 tidak meningkat. Ikut arahan doktor. Pantau dengan pulse oximeter." },
      { h2: "Berapa Lama Perlu Terapi Oksigen?", content: "Berbeza mengikut keterukan. Kes ringan: 1-2 minggu. Kes sederhana: 2-4 minggu. Kes teruk: 1-3 bulan atau lebih. Doktor akan pantau dan tentukan bila boleh berhenti." }
    ]
  },
  {
    slug: "oxygen-concentrator-warga-emas",
    title: "Oxygen Concentrator untuk Warga Emas: Panduan Penjagaan & Keselamatan | Malaysia",
    metaDesc: "Panduan oxygen concentrator untuk warga emas di Malaysia. Keselamatan, penjagaan, tips penggunaan. Sewa oksigen untuk orang tua dari RM150/bulan.",
    keywords: "oxygen concentrator warga emas, oksigen untuk orang tua, terapi oksigen warga emas, mesin oksigen senior, penjagaan orang tua oksigen, elderly oxygen therapy",
    h1: "Oxygen Concentrator untuk Warga Emas: Panduan Lengkap",
    intro: "Warga emas sering memerlukan terapi oksigen kerana pelbagai masalah kesihatan. Artikel ini menerangkan cara memilih dan menggunakan oxygen concentrator dengan selamat untuk orang tua.",
    sections: [
      { h2: "Mengapa Warga Emas Perlu Oxygen Concentrator?", content: "Dengan usia, keupayaan paru-paru menurun. Masalah seperti COPD, kegagalan jantung, dan penyakit kronik lain lebih biasa. Terapi oksigen membantu meningkatkan kualiti hidup." },
      { h2: "Tips Keselamatan untuk Warga Emas", content: "Letakkan di tempat yang mudah diakses. Pastikan tiada halangan wayar yang boleh menyebabkan terjatuh. Gunakan extension tubing yang cukup panjang. Ajar ahli keluarga cara menggunakan." },
      { h2: "Unit Yang Sesuai untuk Warga Emas", content: "Unit 5L mencukupi untuk kebanyakan kes. Pilih model yang senyap (<45dB) untuk tidak mengganggu tidur. Pertimbangkan portable jika warga emas aktif keluar rumah." },
      { h2: "Pemantauan dan Penjagaan", content: "Gunakan pulse oximeter untuk pantau SpO2 secara berkala. Pastikan humidifier sentiasa ada air. Tukar nasal cannula setiap 2 minggu. Rekod penggunaan harian." },
      { h2: "Bila Perlu Dapatkan Bantuan Segera", content: "SpO2 <90% walaupun dengan oksigen. Bibir atau jari menjadi kebiruan. Kekeliruan atau mengantuk berlebihan. Sesak nafas teruk yang tidak reda." }
    ]
  },
  {
    slug: "kos-elektrik-oxygen-concentrator",
    title: "Kos Elektrik Oxygen Concentrator: Berapa Ringgit Sebulan? | Kira Penggunaan Kuasa",
    metaDesc: "Kira kos elektrik oxygen concentrator sebulan. Berapa watt guna, kos TNB, tips jimat. Unit 5L vs 10L. Kos elektrik oksigen RM50-100/bulan untuk 24/7 usage.",
    keywords: "kos elektrik oxygen concentrator, berapa watt oxygen concentrator, penggunaan kuasa mesin oksigen, kos TNB oxygen, jimat elektrik oksigen, electricity cost oxygen",
    h1: "Kos Elektrik Oxygen Concentrator: Berapa Ringgit Sebulan?",
    intro: "Ramai yang bimbang tentang kos elektrik menjalankan oxygen concentrator 24/7. Artikel ini mengira kos sebenar dan memberi tips jimat.",
    sections: [
      { h2: "Berapa Watt Oxygen Concentrator Guna?", content: "Unit 5L: 300-400 watt. Unit 10L: 500-600 watt. Portable (dengan charger): 100-150 watt. Ini adalah penggunaan semasa beroperasi penuh." },
      { h2: "Kira Kos Elektrik Bulanan", content: "Unit 5L 24/7: 350W x 24 jam x 30 hari = 252 kWh. Pada kadar RM0.22/kWh = RM55/bulan. Unit 10L 24/7: 550W = RM87/bulan. Lebih jimat dari tong oksigen!" },
      { h2: "Perbandingan dengan Kos Tong Oksigen", content: "Elektrik oxygen concentrator: RM50-100/bulan. Refill tong oksigen: RM200-500/bulan. Jelas oxygen concentrator jauh lebih jimat dalam jangka panjang." },
      { h2: "Tips Jimat Elektrik", content: "Matikan bila tidak digunakan (jika tidak perlu 24/7). Gunakan timer jika hanya perlu semasa tidur. Pastikan pengudaraan baik supaya mesin tidak overheat. Servis berkala untuk kecekapan optimum." },
      { h2: "Adakah Perlu Generator Backup?", content: "Disarankan untuk backup jika penggunaan kritikal. Generator inverter 1000W mencukupi untuk unit 5L. Alternatif: tong oksigen kecil sebagai backup kecemasan." }
    ]
  }
];

// HTML template for blog posts
function generateBlogHTML(post) {
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDesc,
    "author": { "@type": "Organization", "name": "OxygenConcentrator.my" },
    "publisher": { "@type": "Organization", "name": "OxygenConcentrator.my" },
    "datePublished": "2024-12-07",
    "dateModified": "2024-12-07"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.sections.slice(0, 3).map(s => ({
      "@type": "Question",
      "name": s.h2,
      "acceptedAnswer": { "@type": "Answer", "text": s.content }
    }))
  };

  return `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title}</title>
  <meta name="description" content="${post.metaDesc}">
  <meta name="keywords" content="${post.keywords}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="https://oxygen-concentrator.my/blog/${post.slug}.html">

  <link rel="alternate" hreflang="ms" href="https://oxygen-concentrator.my/blog/${post.slug}.html">
  <link rel="alternate" hreflang="en" href="https://oxygen-concentrator.my/blog/${post.slug}.html">
  <link rel="alternate" hreflang="x-default" href="https://oxygen-concentrator.my/blog/${post.slug}.html">

  <meta name="geo.region" content="MY">
  <meta name="geo.placename" content="Malaysia">

  <link rel="stylesheet" href="../css/styles.css">

  <script type="application/ld+json">${JSON.stringify(schemaArticle)}</script>
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
</head>
<body>
  <header>
    <div class="header-top">
      <div class="container">
        <span>Sewa Oksigen Terdekat | Penghantaran Same-Day | 24/7</span>
        <a href="tel:+601128686592">Hubungi: +6011-2868 6592</a>
      </div>
    </div>
    <nav>
      <div class="container">
        <a href="../index.html" class="logo">Oxygen<span>Concentrator</span>.my</a>
        <ul class="nav-links">
          <li><a href="../index.html">Utama</a></li>
          <li><a href="../sewa-oxygen-concentrator.html">Sewa</a></li>
          <li><a href="../beli-oxygen-concentrator.html">Beli</a></li>
          <li><a href="../lokasi.html">Lokasi</a></li>
          <li><a href="index.html">Blog</a></li>
        </ul>
        <a href="https://wa.me/601128686592" class="cta-button">WhatsApp Kami</a>
      </div>
    </nav>
  </header>

  <main>
    <nav class="breadcrumb" style="background: #f8f9fa; padding: 15px 0;">
      <div class="container">
        <a href="../index.html">Utama</a> &raquo;
        <a href="index.html">Blog</a> &raquo;
        <span>${post.h1.split(':')[0]}</span>
      </div>
    </nav>

    <article style="max-width: 900px; margin: 0 auto; padding: 40px 20px;">
      <header style="margin-bottom: 40px;">
        <h1 style="font-size: 2em; line-height: 1.3; color: #1a1a1a; margin-bottom: 20px;">${post.h1}</h1>
        <p style="color: #666; font-size: 0.9em;">
          <time datetime="2024-12-07">7 Disember 2024</time> &bull; 8 minit bacaan
        </p>

        <div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 5px solid #1976d2;">
          <p style="margin: 0; font-size: 1.1em; line-height: 1.8;">${post.intro}</p>
        </div>
      </header>

      <nav style="background: #fff; border: 1px solid #e0e0e0; padding: 25px; border-radius: 10px; margin-bottom: 40px;">
        <h2 style="font-size: 1.2em; margin-bottom: 15px;">Isi Kandungan</h2>
        <ol style="margin: 0; padding-left: 20px; line-height: 2;">
          ${post.sections.map((s, i) => `<li><a href="#section-${i+1}">${s.h2}</a></li>`).join('\n          ')}
        </ol>
      </nav>

      ${post.sections.map((s, i) => `
      <section id="section-${i+1}" style="margin-top: 40px;">
        <h2>${i+1}. ${s.h2}</h2>
        <p>${s.content}</p>
      </section>`).join('\n')}

      <div style="background: linear-gradient(135deg, #0066cc, #0052a3); color: #fff; padding: 40px; border-radius: 15px; text-align: center; margin-top: 50px;">
        <h2 style="color: #fff; margin-bottom: 15px;">Perlukan Oxygen Concentrator?</h2>
        <p style="margin-bottom: 25px; opacity: 0.9;">Hubungi kami untuk konsultasi percuma dan penghantaran same-day.</p>
        <a href="https://wa.me/601128686592" style="display: inline-block; background: #25d366; color: #fff; padding: 15px 40px; border-radius: 30px; text-decoration: none; font-weight: bold;">WhatsApp Sekarang</a>
      </div>

      <section style="margin-top: 50px;">
        <h2>Artikel Berkaitan</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
          <a href="sewa-oxygen-concentrator-malaysia-panduan-lengkap.html" style="display: block; padding: 20px; background: #f8f9fa; border-radius: 10px; text-decoration: none; color: #333;">
            <strong>Panduan Sewa Oxygen Concentrator</strong>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 0.9em;">Panduan lengkap sewa oksigen di Malaysia</p>
          </a>
          <a href="harga-oxygen-concentrator-malaysia-2024.html" style="display: block; padding: 20px; background: #f8f9fa; border-radius: 10px; text-decoration: none; color: #333;">
            <strong>Harga Oxygen Concentrator 2024</strong>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 0.9em;">Perbandingan harga terkini di Malaysia</p>
          </a>
        </div>
      </section>
    </article>
  </main>

  <footer style="background: #1a1a1a; color: #fff; padding: 40px 0; margin-top: 50px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
      <p>&copy; 2024 OxygenConcentrator.my - Oxygen Concentrator Malaysia</p>
    </div>
  </footer>
</body>
</html>`;
}

// Generate blog index page
function generateBlogIndex() {
  return `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Oxygen Concentrator Malaysia | Panduan, Tips & Artikel Oksigen</title>
  <meta name="description" content="Blog oxygen concentrator Malaysia. Panduan lengkap sewa oksigen, tips penggunaan, perbandingan produk, dan artikel kesihatan pernafasan. Baca sekarang!">
  <meta name="keywords" content="blog oxygen concentrator, artikel oksigen, panduan mesin oksigen, tips terapi oksigen, oxygen concentrator malaysia blog">
  <link rel="canonical" href="https://oxygen-concentrator.my/blog/">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <header>
    <div class="header-top">
      <div class="container">
        <span>Sewa Oksigen Terdekat | Penghantaran Same-Day | 24/7</span>
        <a href="tel:+601128686592">Hubungi: +6011-2868 6592</a>
      </div>
    </div>
    <nav>
      <div class="container">
        <a href="../index.html" class="logo">Oxygen<span>Concentrator</span>.my</a>
        <ul class="nav-links">
          <li><a href="../index.html">Utama</a></li>
          <li><a href="../sewa-oxygen-concentrator.html">Sewa</a></li>
          <li><a href="../beli-oxygen-concentrator.html">Beli</a></li>
          <li><a href="../lokasi.html">Lokasi</a></li>
          <li><a href="index.html" class="active">Blog</a></li>
        </ul>
        <a href="https://wa.me/601128686592" class="cta-button">WhatsApp Kami</a>
      </div>
    </nav>
  </header>

  <main style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
    <h1 style="text-align: center; margin-bottom: 40px;">Blog Oxygen Concentrator Malaysia</h1>
    <p style="text-align: center; max-width: 700px; margin: 0 auto 50px; color: #666;">Panduan lengkap, tips penggunaan, dan artikel kesihatan pernafasan. Semua yang anda perlu tahu tentang oxygen concentrator.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
      ${blogPosts.map(post => `
      <article style="background: #fff; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
        <div style="padding: 25px;">
          <h2 style="font-size: 1.2em; margin-bottom: 15px; line-height: 1.4;">
            <a href="${post.slug}.html" style="color: #1a1a1a; text-decoration: none;">${post.h1}</a>
          </h2>
          <p style="color: #666; font-size: 0.9em; line-height: 1.6; margin-bottom: 20px;">${post.metaDesc.substring(0, 150)}...</p>
          <a href="${post.slug}.html" style="color: #0066cc; font-weight: bold; text-decoration: none;">Baca Selanjutnya &raquo;</a>
        </div>
      </article>`).join('\n')}
    </div>
  </main>

  <footer style="background: #1a1a1a; color: #fff; padding: 40px 0; margin-top: 50px;">
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
      <p>&copy; 2024 OxygenConcentrator.my - Oxygen Concentrator Malaysia</p>
    </div>
  </footer>
</body>
</html>`;
}

// Main execution
console.log('Generating blog posts...\n');

// Generate each blog post
blogPosts.forEach(post => {
  const html = generateBlogHTML(post);
  const filePath = path.join(__dirname, 'blog', `${post.slug}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`Created: blog/${post.slug}.html`);
});

// Generate blog index
const indexHtml = generateBlogIndex();
fs.writeFileSync(path.join(__dirname, 'blog', 'index.html'), indexHtml);
console.log('Created: blog/index.html');

console.log(`\nGenerated ${blogPosts.length + 1} blog files!`);
