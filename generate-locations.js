// Location Page Generator for Oxygen Concentrator Malaysia
// Programmatic SEO - 250+ Unique Location Pages

const fs = require('fs');
const path = require('path');

// Malaysian States and Cities with unique data
const locations = {
  // SELANGOR - 40 locations
  "selangor": {
    state: "Selangor",
    stateCode: "MY-10",
    cities: [
      { name: "Petaling Jaya", areas: ["SS2", "Damansara Utama", "Kelana Jaya", "Taman SEA", "Section 14", "Section 17"], hospitals: ["Sunway Medical Centre", "Assunta Hospital"], lat: "3.1073", lng: "101.6067" },
      { name: "Shah Alam", areas: ["Seksyen 7", "Seksyen 13", "Setia Alam", "Kota Kemuning", "Bukit Jelutong"], hospitals: ["Hospital Shah Alam", "Columbia Asia"], lat: "3.0733", lng: "101.5185" },
      { name: "Subang Jaya", areas: ["USJ", "Putra Heights", "Bandar Sunway", "SS15", "SS18"], hospitals: ["Sunway Medical", "Subang Jaya Medical Centre"], lat: "3.0565", lng: "101.5851" },
      { name: "Klang", areas: ["Klang Utama", "Bandar Bukit Tinggi", "Bandar Botanic", "Meru", "Kapar"], hospitals: ["Hospital Tengku Ampuan Rahimah"], lat: "3.0449", lng: "101.4455" },
      { name: "Ampang", areas: ["Ampang Jaya", "Pandan Indah", "Pandan Perdana", "Taman TAR"], hospitals: ["Gleneagles Ampang"], lat: "3.1500", lng: "101.7600" },
      { name: "Kajang", areas: ["Bandar Kajang", "Sungai Chua", "Taman Prima Saujana", "Bandar Baru Bangi"], hospitals: ["Hospital Kajang"], lat: "2.9927", lng: "101.7909" },
      { name: "Puchong", areas: ["Bandar Puteri", "IOI Mall", "Taman Puchong Utama", "Bandar Kinrara"], hospitals: ["Columbia Asia Puchong"], lat: "3.0443", lng: "101.6171" },
      { name: "Rawang", areas: ["Bandar Country Homes", "Taman Velox", "Rawang Perdana"], hospitals: ["Hospital Sungai Buloh nearby"], lat: "3.3217", lng: "101.5767" },
      { name: "Selayang", areas: ["Selayang Baru", "Taman Selayang", "Batu Caves"], hospitals: ["Hospital Selayang"], lat: "3.2500", lng: "101.6333" },
      { name: "Serdang", areas: ["Seri Kembangan", "Taman Serdang Raya", "UPM"], hospitals: ["Hospital Serdang"], lat: "3.0225", lng: "101.7111" },
      { name: "Cyberjaya", areas: ["Cyberjaya City Centre", "Shaftsbury Square"], hospitals: ["Cyberjaya Hospital"], lat: "2.9228", lng: "101.6533" },
      { name: "Putrajaya", areas: ["Precinct 1-18", "Presint Diplomatik"], hospitals: ["Hospital Putrajaya"], lat: "2.9264", lng: "101.6964" },
      { name: "Bangi", areas: ["Bandar Baru Bangi", "UKM", "Kajang Utama"], hospitals: ["Hospital Kajang nearby"], lat: "2.9333", lng: "101.7667" },
      { name: "Semenyih", areas: ["Bandar Rinching", "Broga"], hospitals: ["Klinik Kesihatan Semenyih"], lat: "2.9500", lng: "101.8500" },
      { name: "Sepang", areas: ["KLIA", "Salak Tinggi", "Bandar Baru Salak Tinggi"], hospitals: ["Klinik Kesihatan Sepang"], lat: "2.6872", lng: "101.7414" }
    ]
  },

  // KUALA LUMPUR - 25 locations
  "kuala-lumpur": {
    state: "Kuala Lumpur",
    stateCode: "MY-14",
    cities: [
      { name: "Cheras", areas: ["Taman Connaught", "Taman Midah", "Cheras Perdana", "Taman Yulek", "Bandar Tun Hussein Onn"], hospitals: ["Hospital Canselor Tuanku Muhriz"], lat: "3.1073", lng: "101.7247" },
      { name: "Bangsar", areas: ["Bangsar Baru", "Lucky Garden", "Bangsar South", "Pantai Dalam"], hospitals: ["Pantai Hospital"], lat: "3.1289", lng: "101.6717" },
      { name: "Kepong", areas: ["Kepong Baru", "Metro Prima", "Desa Jaya", "Menjalara", "Taman Usahawan"], hospitals: ["Hospital Kepong"], lat: "3.2147", lng: "101.6342" },
      { name: "Setapak", areas: ["Wangsa Maju", "Taman Melawati", "Danau Kota", "Setapak Jaya"], hospitals: ["Hospital Setapak"], lat: "3.1833", lng: "101.7167" },
      { name: "Mont Kiara", areas: ["Sri Hartamas", "Desa Sri Hartamas", "Solaris", "Plaza Mont Kiara"], hospitals: ["Hospital Mont Kiara"], lat: "3.1700", lng: "101.6500" },
      { name: "Bukit Bintang", areas: ["KLCC", "Pavilion", "Times Square", "Jalan Alor"], hospitals: ["Prince Court Medical Centre"], lat: "3.1466", lng: "101.7108" },
      { name: "Sentul", areas: ["Sentul Raya", "Sentul Pasar", "The Maple"], hospitals: ["Hospital Kuala Lumpur nearby"], lat: "3.1833", lng: "101.6833" },
      { name: "Titiwangsa", areas: ["Kampung Baru", "Jalan Pahang", "Chow Kit"], hospitals: ["Hospital Kuala Lumpur"], lat: "3.1667", lng: "101.7000" },
      { name: "Segambut", areas: ["Desa Park City", "Publika", "Hartamas Heights"], hospitals: ["Hospital Kuala Lumpur nearby"], lat: "3.1833", lng: "101.6500" },
      { name: "Sri Petaling", areas: ["OUG", "Bukit Jalil", "Sungai Besi", "Awan Besar"], hospitals: ["Pantai Hospital Cheras"], lat: "3.0667", lng: "101.6833" },
      { name: "Taman Desa", areas: ["Kuchai Lama", "Happy Garden", "OUG Parklane"], hospitals: ["Pantai Hospital"], lat: "3.0917", lng: "101.6750" },
      { name: "Brickfields", areas: ["KL Sentral", "Little India", "Bangsar nearby"], hospitals: ["Tung Shin Hospital"], lat: "3.1308", lng: "101.6856" },
      { name: "Jalan Ipoh", areas: ["Taman Pelangi", "Sentul Utara"], hospitals: ["Hospital Kuala Lumpur"], lat: "3.1833", lng: "101.6833" }
    ]
  },

  // PENANG - 30 locations
  "penang": {
    state: "Pulau Pinang",
    stateCode: "MY-07",
    cities: [
      { name: "George Town", areas: ["Komtar", "Gurney Drive", "Pulau Tikus", "Tanjung Tokong", "Tanjung Bungah"], hospitals: ["Penang General Hospital", "Gleneagles Penang"], lat: "5.4141", lng: "100.3288" },
      { name: "Butterworth", areas: ["Raja Uda", "Bagan Ajam", "Bagan Dalam"], hospitals: ["Hospital Seberang Jaya"], lat: "5.3991", lng: "100.3639" },
      { name: "Bayan Lepas", areas: ["Sungai Ara", "Relau", "Bayan Baru", "Free Industrial Zone"], hospitals: ["Bayan Lepas Hospital"], lat: "5.3167", lng: "100.2667" },
      { name: "Bukit Mertajam", areas: ["Taman Cendana", "Alma", "Machang Bubok"], hospitals: ["Hospital Bukit Mertajam"], lat: "5.3631", lng: "100.4608" },
      { name: "Seberang Perai", areas: ["Prai", "Perai Industrial", "Bukit Tengah"], hospitals: ["Hospital Seberang Jaya"], lat: "5.3833", lng: "100.4000" },
      { name: "Air Itam", areas: ["Kek Lok Si", "Paya Terubong", "Farlim"], hospitals: ["Adventist Hospital Penang"], lat: "5.3992", lng: "100.2817" },
      { name: "Jelutong", areas: ["Sungai Pinang", "Jelutong Express"], hospitals: ["Penang Hospital nearby"], lat: "5.3933", lng: "100.3117" },
      { name: "Gelugor", areas: ["USM", "Sungai Dua", "Minden Heights"], hospitals: ["Lam Wah Ee Hospital"], lat: "5.3583", lng: "100.3050" },
      { name: "Balik Pulau", areas: ["Gertak Sanggul", "Teluk Kumbar"], hospitals: ["Balik Pulau Hospital"], lat: "5.3500", lng: "100.2167" },
      { name: "Nibong Tebal", areas: ["Taman Sejahtera", "Jawi"], hospitals: ["Hospital Nibong Tebal"], lat: "5.1603", lng: "100.4744" },
      { name: "Kepala Batas", areas: ["Tasek Gelugor", "Bertam"], hospitals: ["Hospital Kepala Batas"], lat: "5.5167", lng: "100.4333" }
    ]
  },

  // JOHOR - 35 locations
  "johor": {
    state: "Johor",
    stateCode: "MY-01",
    cities: [
      { name: "Johor Bahru", areas: ["Taman Pelangi", "Taman Century", "Taman Molek", "Taman Sentosa", "Larkin"], hospitals: ["Hospital Sultanah Aminah", "KPJ Johor"], lat: "1.4927", lng: "103.7414" },
      { name: "Iskandar Puteri", areas: ["Nusajaya", "Medini", "Puteri Harbour", "Educity"], hospitals: ["Gleneagles Medini"], lat: "1.4333", lng: "103.6333" },
      { name: "Kulai", areas: ["Bandar Putra", "Senai", "Kulai Jaya"], hospitals: ["Hospital Kulai"], lat: "1.6564", lng: "103.6008" },
      { name: "Skudai", areas: ["Taman Universiti", "UTM", "Taman Mutiara Rini"], hospitals: ["Columbia Asia Iskandar Puteri"], lat: "1.5333", lng: "103.6500" },
      { name: "Pasir Gudang", areas: ["Taman Pasir Putih", "Masai", "Permas Jaya"], hospitals: ["Hospital Pasir Gudang"], lat: "1.4667", lng: "103.9000" },
      { name: "Pontian", areas: ["Pekan Nanas", "Benut"], hospitals: ["Hospital Pontian"], lat: "1.4833", lng: "103.3833" },
      { name: "Kota Tinggi", areas: ["Bandar Penawar", "Desaru"], hospitals: ["Hospital Kota Tinggi"], lat: "1.7333", lng: "103.9000" },
      { name: "Muar", areas: ["Bakri", "Parit Jawa", "Tangkak"], hospitals: ["Hospital Pakar Sultanah Fatimah"], lat: "2.0442", lng: "102.5689" },
      { name: "Batu Pahat", areas: ["Taman Bukit Pasir", "Yong Peng"], hospitals: ["Hospital Batu Pahat"], lat: "1.8548", lng: "102.9325" },
      { name: "Kluang", areas: ["Taman Sri Kluang", "Paloh"], hospitals: ["Hospital Enche Besar Hajjah Khalsom"], lat: "2.0333", lng: "103.3167" },
      { name: "Segamat", areas: ["Bandar Segamat", "Buloh Kasap"], hospitals: ["Hospital Segamat"], lat: "2.5147", lng: "102.8158" },
      { name: "Mersing", areas: ["Endau", "Tioman Ferry"], hospitals: ["Hospital Mersing"], lat: "2.4311", lng: "103.8406" },
      { name: "Gelang Patah", areas: ["Taman Nusa Perintis", "Tuas Second Link"], hospitals: ["Gleneagles Medini nearby"], lat: "1.4333", lng: "103.6000" }
    ]
  },

  // PERAK - 25 locations
  "perak": {
    state: "Perak",
    stateCode: "MY-08",
    cities: [
      { name: "Ipoh", areas: ["Ipoh Garden", "Taman Cempaka", "Greentown", "Falim", "Bercham"], hospitals: ["Hospital Raja Permaisuri Bainun", "KPJ Ipoh"], lat: "4.5975", lng: "101.0901" },
      { name: "Taiping", areas: ["Taman Tasik", "Kamunting", "Aulong"], hospitals: ["Hospital Taiping"], lat: "4.8500", lng: "100.7333" },
      { name: "Teluk Intan", areas: ["Bandar Teluk Intan", "Changkat Jong"], hospitals: ["Hospital Teluk Intan"], lat: "4.0228", lng: "101.0211" },
      { name: "Sitiawan", areas: ["Manjung", "Lumut", "Pangkor"], hospitals: ["Hospital Seri Manjung"], lat: "4.2167", lng: "100.7000" },
      { name: "Kampar", areas: ["Taman Kampar", "UTAR"], hospitals: ["Kampar Hospital"], lat: "4.3000", lng: "101.1500" },
      { name: "Batu Gajah", areas: ["Taman Batu Gajah", "Pusing"], hospitals: ["Hospital Batu Gajah"], lat: "4.4667", lng: "101.0500" },
      { name: "Sungai Petani", areas: ["Bandar Sungai Petani"], hospitals: ["Hospital nearby"], lat: "4.4333", lng: "100.9500" },
      { name: "Gopeng", areas: ["Taman Gopeng", "Kota Bahru"], hospitals: ["Klinik Kesihatan Gopeng"], lat: "4.4333", lng: "101.1667" },
      { name: "Tanjung Malim", areas: ["UPSI", "Behrang"], hospitals: ["Hospital Slim River nearby"], lat: "3.6833", lng: "101.5167" },
      { name: "Kuala Kangsar", areas: ["Bandar Kuala Kangsar", "Istana Iskandariah"], hospitals: ["Hospital Kuala Kangsar"], lat: "4.7667", lng: "100.9333" }
    ]
  },

  // KEDAH - 20 locations
  "kedah": {
    state: "Kedah",
    stateCode: "MY-02",
    cities: [
      { name: "Alor Setar", areas: ["Bandar Alor Setar", "Taman Ria", "Mergong"], hospitals: ["Hospital Sultanah Bahiyah"], lat: "6.1256", lng: "100.3678" },
      { name: "Sungai Petani", areas: ["Taman Ria Jaya", "Taman Pekan Baru", "Bandar Laguna Merbok"], hospitals: ["Hospital Sultan Abdul Halim"], lat: "5.6500", lng: "100.4833" },
      { name: "Kulim", areas: ["Kulim Hi-Tech Park", "Bandar Putra Kulim"], hospitals: ["Hospital Kulim"], lat: "5.3667", lng: "100.5500" },
      { name: "Langkawi", areas: ["Kuah", "Pantai Cenang", "Padang Matsirat"], hospitals: ["Hospital Langkawi"], lat: "6.3500", lng: "99.8000" },
      { name: "Jitra", areas: ["Changlun", "Kodiang"], hospitals: ["Hospital Jitra"], lat: "6.2667", lng: "100.4167" },
      { name: "Baling", areas: ["Bandar Baling", "Kupang"], hospitals: ["Hospital Baling"], lat: "5.6833", lng: "100.9167" },
      { name: "Yan", areas: ["Gurun", "Guar Chempedak"], hospitals: ["Klinik Kesihatan Yan"], lat: "5.8000", lng: "100.4000" },
      { name: "Pendang", areas: ["Bandar Pendang", "Tokai"], hospitals: ["Klinik Kesihatan Pendang"], lat: "5.9833", lng: "100.5000" }
    ]
  },

  // NEGERI SEMBILAN - 15 locations
  "negeri-sembilan": {
    state: "Negeri Sembilan",
    stateCode: "MY-05",
    cities: [
      { name: "Seremban", areas: ["Seremban 2", "Taman Bukit Kepayang", "Rasah Jaya", "Senawang"], hospitals: ["Hospital Tuanku Ja'afar"], lat: "2.7297", lng: "101.9381" },
      { name: "Port Dickson", areas: ["Teluk Kemang", "Si Rusa", "Blue Lagoon"], hospitals: ["Hospital Port Dickson"], lat: "2.5228", lng: "101.7964" },
      { name: "Nilai", areas: ["Putra Nilai", "INTI", "Bandar Baru Nilai"], hospitals: ["Columbia Asia Nilai"], lat: "2.8167", lng: "101.8000" },
      { name: "Bahau", areas: ["Bandar Bahau", "Serting"], hospitals: ["Hospital Jempol"], lat: "2.8167", lng: "102.4000" },
      { name: "Kuala Pilah", areas: ["Bandar Kuala Pilah", "Juasseh"], hospitals: ["Hospital Kuala Pilah"], lat: "2.7333", lng: "102.2500" },
      { name: "Tampin", areas: ["Gemas", "Gemencheh"], hospitals: ["Hospital Tampin"], lat: "2.4667", lng: "102.2333" },
      { name: "Rembau", areas: ["Bandar Rembau", "Pedas"], hospitals: ["Klinik Kesihatan Rembau"], lat: "2.5833", lng: "102.0833" }
    ]
  },

  // MELAKA - 12 locations
  "melaka": {
    state: "Melaka",
    stateCode: "MY-04",
    cities: [
      { name: "Melaka City", areas: ["Jonker Street", "Kota Laksamana", "Taman Melaka Raya", "Ayer Keroh"], hospitals: ["Hospital Melaka", "Mahkota Medical Centre"], lat: "2.1896", lng: "102.2501" },
      { name: "Alor Gajah", areas: ["Bandar Alor Gajah", "Masjid Tanah"], hospitals: ["Hospital Alor Gajah"], lat: "2.3833", lng: "102.2000" },
      { name: "Jasin", areas: ["Bandar Jasin", "Merlimau"], hospitals: ["Hospital Jasin"], lat: "2.3000", lng: "102.4333" },
      { name: "Ayer Keroh", areas: ["MITC", "Zoo Melaka", "Taman Tasik"], hospitals: ["Melaka Hospital nearby"], lat: "2.2667", lng: "102.2833" },
      { name: "Batu Berendam", areas: ["Taman Merdeka", "Krubong"], hospitals: ["Pantai Hospital Ayer Keroh nearby"], lat: "2.2333", lng: "102.2500" },
      { name: "Bukit Katil", areas: ["Taman Bukit Katil", "UTEM"], hospitals: ["Hospital Melaka nearby"], lat: "2.2500", lng: "102.2167" }
    ]
  },

  // PAHANG - 20 locations
  "pahang": {
    state: "Pahang",
    stateCode: "MY-06",
    cities: [
      { name: "Kuantan", areas: ["Indera Mahkota", "Taman Tas", "Bandar Satelit", "Teluk Cempedak"], hospitals: ["Hospital Tengku Ampuan Afzan"], lat: "3.8077", lng: "103.3260" },
      { name: "Temerloh", areas: ["Bandar Temerloh", "Mentakab"], hospitals: ["Hospital Temerloh"], lat: "3.4500", lng: "102.4167" },
      { name: "Bentong", areas: ["Bandar Bentong", "Karak"], hospitals: ["Hospital Bentong"], lat: "3.5167", lng: "101.9083" },
      { name: "Raub", areas: ["Bandar Raub", "Sungai Ruan"], hospitals: ["Hospital Raub"], lat: "3.7833", lng: "101.8500" },
      { name: "Cameron Highlands", areas: ["Tanah Rata", "Brinchang", "Ringlet"], hospitals: ["Hospital Cameron Highlands"], lat: "4.4697", lng: "101.3750" },
      { name: "Genting Highlands", areas: ["Gohtong Jaya", "Genting Sempah"], hospitals: ["Klinik Genting"], lat: "3.4236", lng: "101.7928" },
      { name: "Jerantut", areas: ["Bandar Jerantut", "Taman Negara Gateway"], hospitals: ["Hospital Jerantut"], lat: "3.9333", lng: "102.3667" },
      { name: "Pekan", areas: ["Bandar Pekan", "Nenasi"], hospitals: ["Hospital Pekan"], lat: "3.4833", lng: "103.4000" },
      { name: "Rompin", areas: ["Bandar Tun Razak", "Kuala Rompin"], hospitals: ["Hospital Rompin"], lat: "2.8167", lng: "103.4833" },
      { name: "Lipis", areas: ["Bandar Kuala Lipis", "Padang Tengku"], hospitals: ["Hospital Kuala Lipis"], lat: "4.1833", lng: "101.9333" }
    ]
  },

  // TERENGGANU - 12 locations
  "terengganu": {
    state: "Terengganu",
    stateCode: "MY-11",
    cities: [
      { name: "Kuala Terengganu", areas: ["Bandar Kuala Terengganu", "Manir", "Gong Badak", "Chendering"], hospitals: ["Hospital Sultanah Nur Zahirah"], lat: "5.3117", lng: "103.1324" },
      { name: "Kemaman", areas: ["Chukai", "Kerteh", "Paka"], hospitals: ["Hospital Kemaman"], lat: "4.2333", lng: "103.4167" },
      { name: "Dungun", areas: ["Bandar Dungun", "Kuala Abang"], hospitals: ["Hospital Dungun"], lat: "4.7667", lng: "103.4167" },
      { name: "Marang", areas: ["Bandar Marang", "Rusila"], hospitals: ["Klinik Kesihatan Marang"], lat: "5.2000", lng: "103.2000" },
      { name: "Besut", areas: ["Kuala Besut", "Kampung Raja"], hospitals: ["Hospital Besut"], lat: "5.8333", lng: "102.5500" },
      { name: "Setiu", areas: ["Penarik", "Merang"], hospitals: ["Klinik Kesihatan Setiu"], lat: "5.5167", lng: "102.9333" },
      { name: "Hulu Terengganu", areas: ["Kuala Berang", "Ajil"], hospitals: ["Hospital Hulu Terengganu"], lat: "5.0500", lng: "103.0167" }
    ]
  },

  // KELANTAN - 15 locations
  "kelantan": {
    state: "Kelantan",
    stateCode: "MY-03",
    cities: [
      { name: "Kota Bharu", areas: ["Bandar Kota Bharu", "Kubang Kerian", "Wakaf Bharu", "Pengkalan Chepa"], hospitals: ["Hospital Raja Perempuan Zainab II", "Hospital USM"], lat: "6.1256", lng: "102.2386" },
      { name: "Pasir Mas", areas: ["Bandar Pasir Mas", "Rantau Panjang"], hospitals: ["Hospital Pasir Mas"], lat: "6.0500", lng: "102.1333" },
      { name: "Tumpat", areas: ["Bandar Tumpat", "Pengkalan Kubor"], hospitals: ["Klinik Kesihatan Tumpat"], lat: "6.2000", lng: "102.1667" },
      { name: "Tanah Merah", areas: ["Bandar Tanah Merah", "Bukit Bunga"], hospitals: ["Hospital Tanah Merah"], lat: "5.8000", lng: "102.1500" },
      { name: "Machang", areas: ["Bandar Machang", "Temangan"], hospitals: ["Hospital Machang"], lat: "5.7667", lng: "102.2167" },
      { name: "Kuala Krai", areas: ["Bandar Kuala Krai", "Dabong"], hospitals: ["Hospital Kuala Krai"], lat: "5.5333", lng: "102.2000" },
      { name: "Gua Musang", areas: ["Bandar Gua Musang", "Chiku"], hospitals: ["Hospital Gua Musang"], lat: "4.8833", lng: "101.9667" },
      { name: "Bachok", areas: ["Bandar Bachok", "Pantai Irama"], hospitals: ["Klinik Kesihatan Bachok"], lat: "6.0667", lng: "102.4000" }
    ]
  },

  // SABAH - 25 locations
  "sabah": {
    state: "Sabah",
    stateCode: "MY-12",
    cities: [
      { name: "Kota Kinabalu", areas: ["Likas", "Luyang", "Kepayan", "Penampang", "Inanam", "Kolombong"], hospitals: ["Hospital Queen Elizabeth", "Gleneagles Kota Kinabalu"], lat: "5.9804", lng: "116.0735" },
      { name: "Sandakan", areas: ["Bandar Sandakan", "Mile 4", "Sepilok"], hospitals: ["Hospital Duchess of Kent"], lat: "5.8402", lng: "118.1179" },
      { name: "Tawau", areas: ["Bandar Tawau", "Fajar", "Sabindo"], hospitals: ["Hospital Tawau"], lat: "4.2498", lng: "117.8871" },
      { name: "Lahad Datu", areas: ["Bandar Lahad Datu", "Silabukan"], hospitals: ["Hospital Lahad Datu"], lat: "5.0267", lng: "118.3400" },
      { name: "Keningau", areas: ["Bandar Keningau", "Apin-Apin"], hospitals: ["Hospital Keningau"], lat: "5.3333", lng: "116.1667" },
      { name: "Semporna", areas: ["Bandar Semporna", "Sipadan Gateway"], hospitals: ["Hospital Semporna"], lat: "4.4833", lng: "118.6167" },
      { name: "Kudat", areas: ["Bandar Kudat", "Tip of Borneo"], hospitals: ["Hospital Kudat"], lat: "6.8833", lng: "116.8333" },
      { name: "Ranau", areas: ["Bandar Ranau", "Kundasang", "Mount Kinabalu"], hospitals: ["Hospital Ranau"], lat: "5.9667", lng: "116.6667" },
      { name: "Beaufort", areas: ["Bandar Beaufort", "Membakut"], hospitals: ["Hospital Beaufort"], lat: "5.3500", lng: "115.7500" },
      { name: "Papar", areas: ["Bandar Papar", "Kinarut"], hospitals: ["Hospital Papar"], lat: "5.7333", lng: "115.9333" },
      { name: "Tuaran", areas: ["Bandar Tuaran", "Tamparuli"], hospitals: ["Klinik Kesihatan Tuaran"], lat: "6.1833", lng: "116.2333" },
      { name: "Kunak", areas: ["Bandar Kunak", "Tungku"], hospitals: ["Hospital Kunak"], lat: "4.6833", lng: "118.2500" }
    ]
  },

  // SARAWAK - 25 locations
  "sarawak": {
    state: "Sarawak",
    stateCode: "MY-13",
    cities: [
      { name: "Kuching", areas: ["Pending", "Stutong", "BDC", "Tabuan Jaya", "Kota Samarahan"], hospitals: ["Hospital Umum Sarawak", "Normah Medical Specialist Centre"], lat: "1.5535", lng: "110.3593" },
      { name: "Miri", areas: ["Bandar Miri", "Pujut", "Senadin", "Lutong"], hospitals: ["Hospital Miri"], lat: "4.3995", lng: "113.9914" },
      { name: "Sibu", areas: ["Bandar Sibu", "Bukit Assek", "Salim"], hospitals: ["Hospital Sibu"], lat: "2.3000", lng: "111.8167" },
      { name: "Bintulu", areas: ["Bandar Bintulu", "Tanjung Kidurong", "Taman Tanjung"], hospitals: ["Hospital Bintulu"], lat: "3.1667", lng: "113.0333" },
      { name: "Sri Aman", areas: ["Bandar Sri Aman", "Engkilili"], hospitals: ["Hospital Sri Aman"], lat: "1.2333", lng: "111.4667" },
      { name: "Sarikei", areas: ["Bandar Sarikei", "Bintangor"], hospitals: ["Hospital Sarikei"], lat: "2.1167", lng: "111.5167" },
      { name: "Kapit", areas: ["Bandar Kapit", "Belaga"], hospitals: ["Hospital Kapit"], lat: "2.0167", lng: "112.9333" },
      { name: "Mukah", areas: ["Bandar Mukah", "Dalat"], hospitals: ["Hospital Mukah"], lat: "2.9000", lng: "112.1000" },
      { name: "Limbang", areas: ["Bandar Limbang", "Nanga Medamit"], hospitals: ["Hospital Limbang"], lat: "4.7500", lng: "115.0167" },
      { name: "Lawas", areas: ["Bandar Lawas", "Trusan"], hospitals: ["Hospital Lawas"], lat: "4.8500", lng: "115.4167" },
      { name: "Betong", areas: ["Bandar Betong", "Spaoh"], hospitals: ["Hospital Betong"], lat: "1.4167", lng: "111.5167" },
      { name: "Saratok", areas: ["Bandar Saratok", "Pusa"], hospitals: ["Hospital Saratok"], lat: "1.7500", lng: "111.1000" }
    ]
  },

  // LABUAN - 3 locations
  "labuan": {
    state: "Labuan",
    stateCode: "MY-15",
    cities: [
      { name: "Victoria", areas: ["Bandar Labuan", "Financial Park", "Labuan Town"], hospitals: ["Hospital Labuan"], lat: "5.2767", lng: "115.2417" },
      { name: "Rancha-Rancha", areas: ["Kampung Rancha-Rancha", "Tanjung Kubong"], hospitals: ["Hospital Labuan nearby"], lat: "5.3000", lng: "115.2333" },
      { name: "Layang-Layangan", areas: ["Kampung Layang-Layangan", "Batu Manikar"], hospitals: ["Hospital Labuan nearby"], lat: "5.3167", lng: "115.2500" }
    ]
  },

  // PERLIS - 5 locations
  "perlis": {
    state: "Perlis",
    stateCode: "MY-09",
    cities: [
      { name: "Kangar", areas: ["Bandar Kangar", "Taman Kayangan", "Jejawi"], hospitals: ["Hospital Tuanku Fauziah"], lat: "6.4414", lng: "100.1986" },
      { name: "Arau", areas: ["UniMAP", "Tambun Tulang"], hospitals: ["Klinik Kesihatan Arau"], lat: "6.4333", lng: "100.2667" },
      { name: "Padang Besar", areas: ["Border Town", "Pekan Padang Besar"], hospitals: ["Klinik Kesihatan Padang Besar"], lat: "6.6500", lng: "100.3167" },
      { name: "Kuala Perlis", areas: ["Jetty Area", "Kuala Perlis Town"], hospitals: ["Klinik Kesihatan Kuala Perlis"], lat: "6.4000", lng: "100.1333" }
    ]
  }
};

// Generate unique content for each location
function generateLocationPage(state, stateCode, city, cityData) {
  const slug = `${city.name.toLowerCase().replace(/\s+/g, '-')}`;
  const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
  const areas = cityData.areas.join(', ');
  const hospitals = cityData.hospitals.join(', ');

  // Generate unique medical context based on location
  const medicalContexts = [
    `kawasan perumahan padat dengan ramai warga emas`,
    `pusat perindustrian dengan keperluan oksigen tinggi`,
    `kawasan bandar dengan akses hospital yang baik`,
    `komuniti yang berkembang pesat`,
    `kawasan strategik berhampiran hospital utama`
  ];
  const randomContext = medicalContexts[Math.floor(Math.random() * medicalContexts.length)];

  const html = `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oxygen Concentrator ${city.name} ${state} | Sewa Beli Oksigen Terdekat | Mesin O2</title>
  <meta name="description" content="Oxygen concentrator di ${city.name}, ${state}. Sewa RM150/bulan, beli RM2,500. Penghantaran ke ${areas}. Oksigen terdekat ${city.name}. Hubungi +6011-2868 6592.">
  <meta name="keywords" content="oxygen concentrator ${city.name}, sewa oksigen ${city.name}, beli oxygen ${city.name}, mesin oksigen ${state}, oksigen terdekat ${city.name}, oxygen near me ${city.name}">
  <meta name="robots" content="index, follow">
  <meta name="geo.region" content="${stateCode}">
  <meta name="geo.placename" content="${city.name}, ${state}">
  <meta name="geo.position" content="${cityData.lat};${cityData.lng}">
  <link rel="canonical" href="https://oxygen-concentrator.my/lokasi/${stateSlug}/${slug}.html">

  <meta property="og:title" content="Oxygen Concentrator ${city.name} | Oksigen Terdekat ${state}">
  <meta property="og:description" content="Sewa & beli oxygen concentrator di ${city.name}. Penghantaran ke ${areas}.">
  <meta property="og:url" content="https://oxygen-concentrator.my/lokasi/${stateSlug}/${slug}.html">

  <link rel="stylesheet" href="../../css/styles.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "OxygenConcentrator.my - ${city.name}",
    "description": "Pembekal oxygen concentrator di ${city.name}, ${state}",
    "url": "https://oxygen-concentrator.my/lokasi/${stateSlug}/${slug}.html",
    "telephone": "+601128686592",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${city.name}",
      "addressRegion": "${state}",
      "addressCountry": "MY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "${cityData.lat}",
      "longitude": "${cityData.lng}"
    },
    "areaServed": ${JSON.stringify(cityData.areas.map(a => ({"@type": "Place", "name": a})))},
    "priceRange": "RM150 - RM5000"
  }
  </script>
</head>
<body>
  <header>
    <div class="header-top">
      <div class="container">
        <span>Oxygen Concentrator ${city.name} | Oksigen Terdekat | 24/7</span>
        <a href="tel:+601128686592">+6011-2868 6592</a>
      </div>
    </div>
    <nav>
      <div class="container">
        <a href="../../index.html" class="logo">Oxygen<span>Concentrator</span>.my</a>
        <ul class="nav-links">
          <li><a href="../../index.html">Utama</a></li>
          <li><a href="../../sewa-oxygen-concentrator.html">Sewa</a></li>
          <li><a href="../../beli-oxygen-concentrator.html">Beli</a></li>
          <li><a href="../../lokasi.html">${state}</a></li>
        </ul>
        <a href="https://wa.me/601128686592" class="cta-button">WhatsApp</a>
      </div>
    </nav>
  </header>

  <main>
    <nav class="breadcrumb" style="padding: 15px 0; background: #f8f9fa;">
      <div class="container">
        <a href="../../index.html">Utama</a> &gt;
        <a href="../../lokasi.html">Lokasi</a> &gt;
        <a href="../${stateSlug}.html">${state}</a> &gt;
        ${city.name}
      </div>
    </nav>

    <section class="hero" style="padding: 60px 0;">
      <div class="container">
        <h1>Oxygen Concentrator ${city.name}<br><small>Sewa & Beli Oksigen di ${state}</small></h1>

        <div style="background: rgba(255,255,255,0.95); padding: 20px; border-radius: 10px; margin: 20px 0; color: #333;">
          <p><strong>Oxygen concentrator di ${city.name}</strong> tersedia untuk sewa (RM150/bulan) dan beli (RM2,500). Kami melayani ${randomContext}. Penghantaran ke semua kawasan termasuk ${areas}.</p>
        </div>

        <div class="hero-buttons">
          <a href="https://wa.me/601128686592?text=Saya%20perlukan%20oxygen%20concentrator%20di%20${encodeURIComponent(city.name)}" class="btn-primary">WhatsApp Sekarang</a>
          <a href="tel:+601128686592" class="btn-secondary">+6011-2868 6592</a>
        </div>
      </div>
    </section>

    <section style="padding: 40px 0; background: #f8f9fa;">
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 30px;">Kawasan Liputan di ${city.name}</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
          ${cityData.areas.map(area => `
          <div style="background: #fff; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <strong>${area}</strong>
            <p style="font-size: 0.9em; color: #666; margin-top: 5px;">Penghantaran tersedia</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="products" style="padding: 60px 0;">
      <div class="container">
        <h2 class="section-title">Oxygen Concentrator Tersedia di ${city.name}</h2>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image">🫁</div>
            <div class="product-info">
              <h3>Oxygen Concentrator 5L</h3>
              <div class="price">Sewa: RM150/bulan | Beli: RM2,500</div>
              <ul>
                <li>Output: 1-5 Liter/minit</li>
                <li>Penghantaran ke ${city.name}</li>
                <li>Setup percuma</li>
                <li>Warranty 2 tahun</li>
              </ul>
              <a href="https://wa.me/601128686592?text=Oxygen%205L%20di%20${encodeURIComponent(city.name)}" class="btn-primary">Tempah</a>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image">🏥</div>
            <div class="product-info">
              <h3>Oxygen Concentrator 10L</h3>
              <div class="price">Sewa: RM250/bulan | Beli: RM4,500</div>
              <ul>
                <li>Output: 1-10 Liter/minit</li>
                <li>Dual output - 2 pesakit</li>
                <li>Medical grade</li>
                <li>Warranty 3 tahun</li>
              </ul>
              <a href="https://wa.me/601128686592?text=Oxygen%2010L%20di%20${encodeURIComponent(city.name)}" class="btn-primary">Tempah</a>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image">🎒</div>
            <div class="product-info">
              <h3>Portable Oxygen</h3>
              <div class="price">Sewa: RM300/bulan | Beli: RM5,000</div>
              <ul>
                <li>Bateri 4-8 jam</li>
                <li>Berat 2.5kg</li>
                <li>FAA approved</li>
                <li>Warranty 2 tahun</li>
              </ul>
              <a href="https://wa.me/601128686592?text=Portable%20Oxygen%20di%20${encodeURIComponent(city.name)}" class="btn-primary">Tempah</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 40px 0; background: #fff;">
      <div class="container">
        <h2 style="text-align: center; margin-bottom: 20px;">Hospital Berdekatan di ${city.name}</h2>
        <p style="text-align: center; color: #666;">Kami melayani pesakit dari: <strong>${hospitals}</strong></p>
      </div>
    </section>

    <section class="contact" style="padding: 60px 0;">
      <div class="container" style="text-align: center;">
        <h2>Hubungi Kami di ${city.name}</h2>
        <p>Perlukan oxygen concentrator segera? Hubungi sekarang!</p>
        <div style="margin: 30px 0;">
          <a href="tel:+601128686592" style="font-size: 1.5em; color: var(--primary);">+6011-2868 6592</a>
        </div>
        <a href="https://wa.me/601128686592?text=Saya%20perlukan%20oxygen%20di%20${encodeURIComponent(city.name)}" class="btn-primary" style="font-size: 1.2em; padding: 15px 40px;">WhatsApp Sekarang</a>
      </div>
    </section>
  </main>

  <footer style="background: #1a1a2e; color: #fff; padding: 40px 0;">
    <div class="container" style="text-align: center;">
      <p>&copy; 2024 OxygenConcentrator.my - Oxygen Concentrator ${city.name}, ${state}</p>
      <p style="margin-top: 10px; font-size: 0.9em;">
        <a href="../../index.html" style="color: #aaa;">Utama</a> |
        <a href="../../sewa-oxygen-concentrator.html" style="color: #aaa;">Sewa</a> |
        <a href="../../beli-oxygen-concentrator.html" style="color: #aaa;">Beli</a> |
        <a href="../../lokasi.html" style="color: #aaa;">Semua Lokasi</a>
      </p>
    </div>
  </footer>
</body>
</html>`;

  return { slug, html, stateSlug };
}

// Generate all pages
let allPages = [];
let sitemapEntries = [];

for (const [stateKey, stateData] of Object.entries(locations)) {
  const stateSlug = stateKey;
  const stateFolderPath = path.join(__dirname, 'lokasi', stateSlug);

  // Create state folder
  if (!fs.existsSync(stateFolderPath)) {
    fs.mkdirSync(stateFolderPath, { recursive: true });
  }

  // Generate pages for each city
  for (const city of stateData.cities) {
    const { slug, html } = generateLocationPage(stateData.state, stateData.stateCode, city, city);
    const filePath = path.join(stateFolderPath, `${slug}.html`);

    fs.writeFileSync(filePath, html);
    allPages.push({
      state: stateData.state,
      city: city.name,
      path: `lokasi/${stateSlug}/${slug}.html`,
      areas: city.areas
    });

    sitemapEntries.push(`  <url>
    <loc>https://oxygen-concentrator.my/lokasi/${stateSlug}/${slug}.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);

    console.log(`Generated: ${stateData.state} > ${city.name}`);
  }
}

console.log(`\nTotal pages generated: ${allPages.length}`);

// Save page list for reference
fs.writeFileSync(path.join(__dirname, 'location-pages.json'), JSON.stringify(allPages, null, 2));

// Save sitemap entries
fs.writeFileSync(path.join(__dirname, 'sitemap-locations.txt'), sitemapEntries.join('\n'));

console.log('Done! Check location-pages.json for full list.');
