// --- Data Structures (Dataset-Ready System) ---

// Daftar event/festival di Maluku: ditampilkan di bagian Event Radar dan modal detail event.
const events = [
    { 
        id: 'e1', 
        category: 'Musik', 
        date: '30-31 Oktober 2026', 
        title: 'Amboina International Music Fest', 
        location: 'Kota Ambon', 
        desc: 'Merayakan Ambon sebagai City of Music UNESCO dengan pertunjukan musik bambu tradisional dan kolaborasi musisi dunia.',
        target_audience: 'Semua Umur, Pecinta Seni, Wisatawan',
        is_date_tentative: false,
        image: 'images/events/e1.jpg',
        imageBackup: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80'
    },
    { 
        id: 'e2', 
        category: 'Budaya', 
        date: '12-14 November 2026', 
        title: 'Banda Neira Festival', 
        location: 'Banda Neira', 
        desc: 'Festival budaya tahunan yang menampilkan balap perahu belang khas Maluku dan napak tilas jalur rempah kolonial.',
        target_audience: 'Keluarga, Pecinta Sejarah, Wisatawan',
        is_date_tentative: false,
        image: 'images/events/e2.jpg',
        imageBackup: 'https://images.unsplash.com/photo-1628186256976-78b1d9edb314?auto=format&fit=crop&q=80'
    },
    { 
        id: 'e3', 
        category: 'Bahari', 
        date: '12-17 Oktober 2026', 
        title: 'Festival Pesona Meti Kei', 
        location: 'Maluku Tenggara', 
        desc: 'Tradisi unik menangkap ikan saat air laut surut sangat jauh (Meti), dipadukan dengan tarian adat dan pesta rakyat di pasir putih.',
        target_audience: 'Keluarga, Domestik, Pecinta Alam',
        is_date_tentative: false,
        image: 'images/events/e3.jpg',
        imageBackup: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80'
    },
    {
        id: 'e7',
        category: 'UMKM',
        date: '8-10 Oktober 2026',
        title: 'Festival Maluku Manggurebe',
        location: 'Taman Pattimura, Ambon',
        desc: 'Festival tahunan Bank Indonesia Perwakilan Maluku untuk mendorong UMKM: pameran produk lokal, kuliner olahan sagu, fashion show, talk show, dan pertunjukan seni.',
        target_audience: 'Keluarga, Pecinta Kuliner, Pelaku UMKM',
        is_date_tentative: false,
        image: 'images/events/e7.jpg',
        imageBackup: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80'
    }
];

// Daftar kuliner khas Maluku untuk kartu di bagian Kuliner.
const foods = [
    { id: 'f1', name: 'Papeda Ikan Kuah Kuning', emoji: '🍲', desc: 'Bubur sagu lengket disantap dengan ikan berkuah rempah.' },
    { id: 'f2', name: 'Sambal Colo-colo', emoji: '🌶️', desc: 'Sambal pedas segar dari tomat, cabai, bawang, dan jeruk lemon cui.' },
    { id: 'f3', name: 'Kopi Sibu-sibu', emoji: '☕', desc: 'Kopi robusta campur bubuk cengkeh dan biji kenari.' },
    { id: 'f4', name: 'Rujak Natsepa', emoji: '🥗', desc: 'Rujak buah segar dengan bumbu kacang kasar yang gurih manis.' }
];

// Dataset tanya-jawab chatbot lokal (cadangan bila server Python offline): pola kalimat -> jawaban.
const qaDataset = [
    // 1. DATA PEMBUKA (OPENING) & BAHASA
    { category: 'OP-001', pattern: ['halo chatbot'], response: 'Halo! Selamat datang di Layanan Informasi Kuliner dan Wisata Maluku. Ada yang bisa saya bantu?' },
    { category: 'OP-002', pattern: ['selamat pagi admin'], response: 'Selamat pagi! Ada yang bisa saya bantu untuk mengeksplorasi Maluku hari ini?' },
    { category: 'OP-005', pattern: ['haiii', 'haii', 'hai'], response: 'Hai juga! Yuk, mau tanya-tanya apa kita hari ini tentang Maluku?' },
    { category: 'OP-006', pattern: ['p'], response: 'Halo! Ada yang bisa saya bantu? (Silakan ketik pertanyaan Anda ya).' },
    { category: 'OP-008', pattern: ['siooo halo', 'sio halo'], response: 'Halo! Selamat datang. Ada yang bisa beta bantu par ose hari ini?' },
    { category: 'OP-009', pattern: ['selamat pagi loku', 'pagi loku'], response: 'Selamat pagi! Mari tanyakan apa saja seputar kuliner dan wisata eksotis di Maluku.' },

    // 2. DATA WISATA & KULINER (INTENT & FOKUS PENCARIAN)
    { category: 'WS-001', pattern: ['wisata pantai paling bagus di ambon', 'pantai paling bagus'], response: 'Beta merekomendasikan Pantai Liang yang terkenal dengan pasir putihnya, atau Pantai Natsepa yang sangat cocok untuk bersantai sambil menikmati rujak!' },
    { category: 'WS-002', pattern: ['cara menuju ke pantai natsepa', 'cara ke pantai natsepa', 'rute ke natsepa'], response: 'Untuk menuju Pantai Natsepa, kamu bisa menggunakan kendaraan pribadi (motor/mobil) atau menaiki angkot jurusan Suli dari Terminal Mardika di pusat kota Ambon.' },
    { category: 'WS-003', pattern: ['rujak natsepa yang paling enak', 'rujak natsepa'], response: 'Semua rujak di Pantai Natsepa enak-enak! Penjualnya berjejer rapi di pinggir pantai, kamu bisa langsung pilih tempat duduk yang paling nyaman menghadap laut.' },
    { category: 'WS-004', pattern: ['pantai liang tiket masuk berapa', 'tiket pantai liang', 'harga tiket liang'], response: 'Harga tiket masuk Pantai Liang sangat terjangkau, berkisar antara Rp 10.000 hingga Rp 15.000 per orang.' },
    { category: 'WS-005', pattern: ['rekomendasi tempat sejarah', 'tempat sejarah di kota ambon', 'wisata sejarah'], response: 'Kamu wajib mengunjungi Benteng Amsterdam, melihat kemegahan Gong Perdamaian Dunia di pusat kota, atau napak tilas di Benteng Duurstede.' },
    { category: 'WS-006', pattern: ['benteng amsterdam maluku lokasinya', 'lokasi benteng amsterdam', 'benteng amsterdam'], response: 'Benteng Amsterdam terletak di Negeri Hila, Kecamatan Leihitu, Kabupaten Maluku Tengah. Sekitar 1,5 jam perjalanan dari pusat Kota Ambon.' },
    { category: 'WS-007', pattern: ['tiket masuk gong perdamaian', 'tiket gong perdamaian', 'gong perdamaian dunia'], response: 'Untuk masuk ke area Gong Perdamaian Dunia, tarifnya sangat terjangkau yaitu sekitar Rp 5.000 per orang.' },
    { category: 'WS-011', pattern: ['biaya speedboat pulau ora', 'biaya resort pulau ora', 'estimasi harga pulau ora', 'pulau ora'], response: 'Estimasi biaya ke Pulau Ora cukup bervariasi. Untuk resort terapungnya sekitar 1-3 jutaan per malam. Ditambah ongkos penyeberangan dan mobil dari Pelabuhan Tulehu ke Desa Saleman/Sawai.' },
    { category: 'WS-018', pattern: ['kondisi jalan mobil ke pantai pintu kota', 'jalan ke pintu kota', 'akses pintu kota'], response: 'Aksesibilitas jalan menuju Pantai Pintu Kota sudah beraspal baik dan mulus. Sangat aman dan nyaman dilalui oleh mobil maupun motor.' },
    { category: 'WS-020', pattern: ['ke banda neira naik kapal atau pesawat', 'transportasi ke banda neira', 'ke banda neira'], response: 'Untuk ke Banda Neira, kamu punya dua opsi transportasi: lewat jalur laut dengan Kapal Pelni/Kapal Cepat (sekitar 7-14 jam), atau jalur udara menggunakan pesawat perintis Susi Air.' },

    // 3. DATA CAMPURAN (MIX GEN Z & SLANG)
    { category: 'MIX-001', pattern: ['makanan khas ambon yg paling viral', 'wajub dicoba', 'makanan khas'], response: 'Wah, kuliner viral yang wajib banget kamu coba pastinya Papeda Ikan Kuah Kuning dan Rujak Natsepa. Asli bikin nagih!' },
    { category: 'MIX-002', pattern: ['spill dong takjil', 'camilan manis khas ambon', 'nemenin ngopi'], response: 'Spill nih! Buat nemenin ngopi, cobain Pisang Asar, Sukun Goreng, atau Gogos (ketan isi ikan). Dijamin nongkrong makin seru!' },
    { category: 'MIX-003', pattern: ['papeda tuh sbnrnya apa', 'tekstur papeda', 'kek lem', 'wkwk'], response: 'Wkwk papeda itu emang terbuat dari sagu murni, makanya teksturnya kental dan melar kaya lem. Tapi pas dimakan bareng ikan kuah kuning yang gurih seger, beuh.. lumer di mulut!' },
    { category: 'MIX-007', pattern: ['lauk pauk lokal', 'mkn sukun goreng', 'sukun goreng'], response: 'Sukun goreng khas Maluku itu gaulnya dimakan bareng sambal terasi atau dabu-dabu lokal. Dicocol pas anget-anget rasanya juara!' },
    { category: 'MIX-040', pattern: ['kondisi sinyal internet', '4g', 'desa wisata maluku'], response: 'Sinyal 4G di sebagian besar desa wisata utama sudah aman dan tercover dengan baik kok! Jadi kamu tetep bisa update sosmed lancar jaya.' },
    { category: 'MIX-041', pattern: ['budget minim 1 jutaan', 'budget 1 juta', 'wisata n kulineran'], response: '1 jutaan? Bisa banget! Kamu bisa sewa motor, nongkrong di cafe tepi pantai, makan papeda, nikmatin Rujak Natsepa, dan foto-foto sepuasnya di spot aesthetic Ambon.' },
    { category: 'MIX-042', pattern: ['cara sewa motor harian', 'bandara pattimura'], response: 'Mekanismenya gampang banget. Banyak penyedia sewa motor lokal yang bisa janjian serah terima unit langsung di area Bandara Pattimura. Tinggal WA aja!' },
    { category: 'MIX-043', pattern: ['umkm kuliner di ambon', 'support qris', 'emg hrs cash'], response: 'Udah banyak banget UMKM, resto, dan cafe di Ambon yang support QRIS! Tapi untuk jaga-jaga kalau belanja di pinggir jalan/pantai, tetep sediakan uang cash pecahan kecil ya.' },
    { category: 'MIX-044', pattern: ['spill estimasi harga seporsi', 'kohu-kohu', 'pricey ga ya'], response: 'Tenang, seporsi Kohu-kohu (olahan sayur dan ikan) itu sangat ramah kantong, biasanya cuma belasan ribu rupiah aja. Sama sekali nggak pricey kok!' },

    // 4. DATA PENUTUP (CLOSING)
    { category: 'CL-001', pattern: ['terima kasih bot', 'terima kasih loku', 'terima kasih'], response: 'Sama-sama! Senang bisa membantu Anda. Selamat mengeksplorasi Maluku!' },
    { category: 'CL-002', pattern: ['oke makasih infonya', 'makasih infonya', 'oke makasih'], response: 'Siap, sama-sama! Kalau butuh informasi lain, langsung chat aku lagi ya.' },
    { category: 'CL-005', pattern: ['dangke banyak'], response: 'Dangke banyak jua! Sampai baku dapa lai di informasi berikutnya.' },
    { category: 'CL-008', pattern: ['dangke loku', 'dangke'], response: 'Yo, sama-sama! Tetap jaga kesehatan selama berwisata di Ambon.' },
    { category: 'CL-010', pattern: ['sampai jumpa', 'dadah'], response: 'Sampai jumpa kembali! Jangan lupa cobain Papeda dan Colo-colo ya!' }
];

// Kamus singkatan/slang -> kata baku, dipakai normalizeSlang() sebelum mencocokkan pertanyaan.
const slangDict = { 'yg': 'yang', 'dmn': 'dimana', 'brp': 'berapa', 'gmn': 'bagaimana', 'bgt': 'banget', 'rekomen': 'rekomendasi', 'spill': 'info', 'pricey': 'mahal', 'otw': 'pergi', 'klo': 'kalo' };

// Teks pengganti ikon Lucide bila CDN ikon gagal dimuat (nama ikon -> simbol teks).
const iconFallbacks = {
    'alert-circle': '!',
    'arrow-right': '->',
    bookmark: '☆',
    calendar: 'Cal',
    'check-circle-2': '✓',
    'chevron-down': '⌄',
    database: 'DB',
    globe: 'Web',
    'image-off': 'Img',
    info: 'i',
    instagram: 'IG',
    lightbulb: 'Tip',
    linkedin: 'in',
    mail: '@',
    map: 'Map',
    'map-pin': 'Pin',
    'map-pin-plus': 'Pin+',
    menu: '☰',
    'message-circle': 'Chat',
    'message-square': 'Chat',
    moon: 'Moon',
    'music-2': '♪',
    network: 'Net',
    'rotate-ccw': '↺',
    search: 'Search',
    send: 'Send',
    sparkles: '*',
    sun: 'Sun',
    users: 'Users',
    waves: 'Wave',
    x: '×'
};

// Gambar cadangan berupa SVG gradien buatan sendiri, dipakai saat foto asli dan backup gagal dimuat.
const imageFallbacks = {
    beach: createSvgDataUrl('Maluku Vibes', 'Laut biru, pasir putih, dan langit tropis', ['#0284c7', '#10b981', '#f97316']),
    night: createSvgDataUrl('Malam Maluku', 'Langit senja dan pulau rempah', ['#020617', '#0369a1', '#fbbf24']),
    food: createSvgDataUrl('Kuliner Maluku', 'Rempah, laut, dan rasa lokal', ['#f97316', '#fbbf24', '#10b981']),
    music: createSvgDataUrl('Event Maluku', 'Musik, budaya, dan festival lokal', ['#8b5cf6', '#0284c7', '#f97316']),
    profile: createSvgDataUrl('Dustin Welliken', 'Pembuat MalukuVibes', ['#0369a1', '#10b981', '#f97316']),
    travel: createSvgDataUrl('Jelajah Maluku', 'Destinasi dan cerita pulau', ['#0369a1', '#0f172a', '#10b981'])
};

// Memetakan judul tertentu ke gambar cadangan yang paling cocok temanya.
const fallbackByTitle = {
    'Amboina International Music Fest': imageFallbacks.music,
    'Banda Neira Festival': imageFallbacks.travel,
    'Festival Pesona Meti Kei': imageFallbacks.beach,
    'Festival Maluku Manggurebe': imageFallbacks.food,
    'Dustin Welliken': imageFallbacks.profile
};

// Kosakata bahasa Ambon untuk bagian Panduan Bahasa Lokal.
const localPhrases = [
    { word: "Beta / Ose", meaning: "Saya / Kamu", example: "Ose mau jalan kemana hari ini? Beta ikut ya." },
    { word: "Dangke", meaning: "Terima Kasih", example: "Dangke banyak su bantu beta cari jalan." },
    { word: "Sio", meaning: "Aduh / Astaga (Ekspresi)", example: "Sio, pica! (Aduh, luar biasa!)" },
    { word: "Loku", meaning: "Ambil / Pegang", example: "Loku makanan itu, nanti habis." },
    { word: "Gas", meaning: "Ayo pergi / Lakukan", example: "Ke Pantai Natsepa sore ini? Gas!" }
];

// Cerita singkat tiap wilayah untuk kartu Storytelling Map dan kotak detailnya.
const regionStories = [
    { id: 'Kota Ambon', title: 'Pulau Ambon: City of Music & 95 Pesona', desc: 'Pusat kebudayaan, musik dunia UNESCO, dan gerbang pariwisata Maluku dengan 95 destinasi lengkap dari pantai eksotis, situs sejarah Pattimura, hingga kearifan negeri adat.', highlights: ['95 Destinasi', 'UNESCO City of Music', 'Sejarah Rempah'] },
    { id: 'Maluku Tengah', title: 'Maluku Tengah: Jantung Sejarah, Rempah & Bahari (148 Destinasi)', desc: 'Membentang dari Jazirah Leihitu & Salahutu, Kepulauan Lease (Haruku, Saparua, Nusalaut), hingga eksotisme alam Seram (Sawai, Masohi & TN Manusela).', highlights: ['148 Destinasi', 'Kepulauan Lease', 'Taman Nasional Manusela'] },
    { id: 'Banda', title: 'Banda Neira: Jejak Rempah Dunia', desc: 'Pulau kecil yang pernah diperebutkan bangsa Eropa karena Pala. Di sini, sejarah kolonial berpadu dengan taman laut yang luar biasa.', highlights: ['Benteng Belgica', 'Diving', 'Pala'] },
    { id: 'Seram', title: 'Pulau Seram: Nusa Ina (Pulau Ibu)', desc: 'Pulau terbesar yang dianggap sebagai tanah asal alifuru (orang Maluku). Menyimpan keajaiban resort terapung Pantai Ora dan tebing tersembunyi Makariki.', highlights: ['Pantai Ora', 'Tebing Makariki', 'Sawai'] },
    { id: 'Kei', title: 'Kepulauan Kei: Surga Pasir Putih', desc: 'Terkenal dengan Pasir Panjang Ngurbloat yang diakui sebagai salah satu pasir pantai terhalus di dunia menyerupai tepung, serta laguna Pulau Bair.', highlights: ['Pasir Terhalus', 'Pulau Bair', 'Gua Hawang'] }
];

// Soal kuis persona wisata; setiap pilihan menambah skor ke satu persona.
const personaQuestions = [
    { q: "Pas lagi liburan, kamu lebih milih...", options: [{ t: "Jalan santai di pinggir pantai sepi", p: "Si Anak Healing" }, { t: "Cari spot foto keren buat feeds IG", p: "Si Pemburu Aesthetic" }, { t: "Blusukan ke museum & tempat bersejarah", p: "Si Pecinta Sejarah" }] },
    { q: "Kalo urusan makan, gaya kamu...", options: [{ t: "Makan di resto nyaman & bersih", p: "Si Anak Healing" }, { t: "Coba jajanan pinggir jalan & warung lokal", p: "Si Pecinta Sejarah" }, { t: "Cafe kekinian yang plating-nya cakep", p: "Si Pemburu Aesthetic" }] },
    { q: "Destinasi impian kamu di Maluku?", options: [{ t: "Resort terapung Pantai Ora", p: "Si Anak Healing" }, { t: "Pintu Kota & Pulau Bair", p: "Si Pemburu Aesthetic" }, { t: "Benteng Belgica di Banda Neira", p: "Si Pecinta Sejarah" }] }
];



// --- Global State & Pagination ---
// Status filter destinasi yang sedang aktif (mood, hidden gem, wilayah, kategori, kata kunci).
let currentMood = 'all';
let showHiddenGemsOnly = false;
let currentRegionFilter = 'Kota Ambon';
let currentTypeFilter = 'all';
let currentSearchQuery = '';
// Paginasi: jumlah kartu yang tampil sekarang, bertambah PAGE_INCREMENT setiap klik 'Muat lagi'.
let visibleLimit = 18;
const PAGE_INCREMENT = 18;

// Status kuis persona: nomor soal, skor tiap persona, dan persona hasil akhir.
let quizCurrentQuestion = 0;
let quizScores = { "Si Anak Healing": 0, "Si Pemburu Aesthetic": 0, "Si Pecinta Sejarah": 0 };
let finalPersona = "";

// --- Advanced Image Fallback System ---
// Dipanggil oleh onerror <img>: coba URL backup dulu, lalu ganti dengan gambar/blok gradien cadangan.
window.handleImageError = function(imgElem, backupUrl, title) {
    if (!imgElem.dataset.triedBackup) {
        console.warn(`Primary image failed for ${title}. Attempting backup URL...`);
        imgElem.dataset.triedBackup = "true";
        imgElem.src = backupUrl;
    } else if (!imgElem.dataset.triedFallback) {
        console.error(`Backup image failed for ${title}. Switching to CSS visual fallback.`);
        imgElem.dataset.triedFallback = "true";

        if (imgElem.classList.contains('creator-profile-img') || imgElem.id === 'modalImg' || imgElem.id === 'eventModalImg') {
            imgElem.removeAttribute('onerror');
            imgElem.src = fallbackByTitle[title] || imageFallbacks.travel;
            return;
        }
        
        const fallbackContainer = document.createElement('div');
        fallbackContainer.className = 'img-fallback-container';
        
        const angle = 120 + (title.length * 5);
        fallbackContainer.style.background = `linear-gradient(${angle}deg, var(--primary-dark) 0%, var(--accent-gem) 100%)`;
        
        fallbackContainer.innerHTML = `
            <i data-lucide="image-off" style="width: 48px; height: 48px; opacity: 0.5;"></i>
            <span style="margin-top: 0.5rem; font-weight: bold; text-align: center; padding: 0 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${title}</span>
        `;
        
        if (imgElem.parentNode) {
            imgElem.parentNode.replaceChild(fallbackContainer, imgElem);
            refreshIcons();
        }
    }
};

// Membuat gambar SVG (gradien + judul + subjudul) sebagai data URL, tanpa perlu file gambar.
function createSvgDataUrl(title, subtitle, colors) {
    const escapedTitle = escapeHtml(title);
    const escapedSubtitle = escapeHtml(subtitle);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
            <defs>
                <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${colors[0]}"/>
                    <stop offset="58%" stop-color="${colors[1]}"/>
                    <stop offset="100%" stop-color="${colors[2]}"/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#020617" flood-opacity=".28"/>
                </filter>
            </defs>
            <rect width="1200" height="800" fill="url(#bg)"/>
            <path d="M0 545c120-72 238-88 354-48 139 48 244 55 397 2 184-64 321-33 449 49v252H0Z" fill="#fff" opacity=".22"/>
            <path d="M0 614c152-47 294-48 426-2 165 58 306 35 454-9 121-36 228-19 320 42v155H0Z" fill="#fff" opacity=".18"/>
            <circle cx="920" cy="170" r="92" fill="#fff" opacity=".2"/>
            <g filter="url(#shadow)">
                <text x="80" y="570" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#fff">${escapedTitle}</text>
                <text x="84" y="632" font-family="Arial, sans-serif" font-size="30" fill="#fff" opacity=".86">${escapedSubtitle}</text>
            </g>
        </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// Mengubah <i data-lucide> menjadi ikon SVG; bila Lucide tidak termuat, ganti dengan teks dari iconFallbacks.
function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    document.querySelectorAll('i[data-lucide]').forEach(icon => {
        const name = icon.getAttribute('data-lucide');
        const fallback = document.createElement('span');
        fallback.className = `icon-fallback icon-${name}`;
        fallback.setAttribute('aria-hidden', 'true');
        fallback.textContent = iconFallbacks[name] || '*';
        fallback.style.cssText = icon.getAttribute('style') || '';
        icon.replaceWith(fallback);
    });
}

// Mengamankan teks sebelum dimasukkan ke innerHTML agar tidak bisa menyisipkan tag/skrip (XSS).
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Dibuka ke window agar bisa dipanggil dari skrip inline di index.html.
window.refreshIcons = refreshIcons;

// Foto profil pembuat: pasang gambar cadangan bila gagal dimuat atau belum muncul setelah 250 ms.
function initImageSafety() {
    document.querySelectorAll('.creator-profile-img').forEach(img => {
        const applyProfileFallback = () => {
            img.removeAttribute('onerror');
            img.src = imageFallbacks.profile;
        };

        img.addEventListener('error', applyProfileFallback, { once: true });

        setTimeout(() => {
            if (!img.complete || img.naturalWidth === 0) applyProfileFallback();
        }, 250);
    });
}

// --- Initialization ---
// Titik awal: setelah HTML siap, jalankan semua inisialisasi dan render setiap bagian halaman.
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initRegionTabs();
    initCategorySubnav();
    initMoodPlanner();
    initHiddenGemsToggle();
    initFilters();
    updateRegionCountBadges();
    renderDestinations();
    renderEvents(events, 'Semua');
    renderFoods();
    renderStoryMap();
    renderPhrases();
    initImageSafety();
    refreshIcons();
    
    setTimeout(() => {
        const badge = document.querySelector('.floating-chat-btn .badge');
        if(badge) badge.style.display = 'flex';
    }, 3000);
});

// --- Navbar Logic ---
// Navbar: beri bayangan saat halaman digulir dan tandai link menu sesuai bagian yang sedang terlihat.
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });
}

// --- Theme Logic ---
// Tema terang/gelap: ambil dari localStorage atau setelan OS, lalu pasang tombol pengganti tema.
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };

    const toggleBtn = document.getElementById('themeToggle');
    const toggleBtnMobile = document.getElementById('themeToggleMobile');
    
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
    if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleTheme);
}

// Ganti ikon tombol tema: matahari saat mode gelap, bulan saat mode terang.
function updateThemeIcon(theme) {
    const toggleBtn = document.getElementById('themeToggle');
    const toggleBtnMobile = document.getElementById('themeToggleMobile');
    const iconHTML = theme === 'dark' ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    
    if (toggleBtn) toggleBtn.innerHTML = iconHTML;
    if (toggleBtnMobile) toggleBtnMobile.innerHTML = iconHTML;
    refreshIcons();
}

// Buka/tutup menu navigasi versi HP.
window.toggleMobileMenu = () => document.getElementById('mobileMenu').classList.toggle('active');


// --- Region Navigation Tabs Logic ---
// Tab wilayah: klik tab mengganti filter wilayah, menyamakan dropdown, lalu render ulang destinasi.
function initRegionTabs() {
    const tabs = document.querySelectorAll('.region-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentRegionFilter = tab.dataset.region;
            
            // Sync with select dropdown if present
            const regionSelect = document.getElementById('regionFilter');
            if (regionSelect) {
                regionSelect.value = currentRegionFilter;
            }
            
            visibleLimit = PAGE_INCREMENT;
            renderDestinations();
        });
    });
}

// Tulis jumlah destinasi per wilayah pada badge di setiap tab wilayah.
function updateRegionCountBadges() {
    const counts = {
        'Kota Ambon': destinations.filter(d => d.region === 'Kota Ambon').length,
        'Maluku Tengah': destinations.filter(d => d.region === 'Maluku Tengah').length,
        'Banda': destinations.filter(d => d.region === 'Banda').length,
        'Seram': destinations.filter(d => d.region === 'Seram').length,
        'Kei': destinations.filter(d => d.region === 'Kei').length,
        'Kota Tual': destinations.filter(d => d.region === 'Kota Tual').length,
    };
    
    document.querySelectorAll('.region-tab').forEach(tab => {
        const reg = tab.dataset.region;
        const countBadge = tab.querySelector('.region-count');
        if (countBadge) {
            if (reg === 'all') {
                countBadge.textContent = destinations.length;
            } else if (counts[reg] !== undefined) {
                countBadge.textContent = counts[reg];
            }
        }
    });
}

// --- Category Subnav Pills Logic ---
// Pill kategori (Alam, Bahari, Sejarah, dst.): klik mengganti filter kategori.
function initCategorySubnav() {
    const pills = document.querySelectorAll('.subnav-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentTypeFilter = pill.dataset.type;
            visibleLimit = PAGE_INCREMENT;
            renderDestinations();
        });
    });
}

// --- Mood & Filters Logic ---
// Tombol mood: mengganti filter mood destinasi sekaligus kategori event yang sesuai.
function initMoodPlanner() {
    document.querySelectorAll('.mood-tag').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mood-tag').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMood = e.target.dataset.mood;
            visibleLimit = PAGE_INCREMENT;
            renderDestinations();
            syncMoodWithEvents(currentMood);
        });
    });
}

// Saklar Hidden Gems: bila aktif hanya destinasi tersembunyi yang tampil.
function initHiddenGemsToggle() {
    const toggle = document.getElementById('hiddenGemsToggle');
    if (toggle) {
        toggle.addEventListener('change', (e) => {
            showHiddenGemsOnly = e.target.checked;
            visibleLimit = PAGE_INCREMENT;
            renderDestinations();
        });
    }
}

// Kolom pencarian dan dropdown wilayah: setiap perubahan memfilter ulang daftar destinasi.
function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            visibleLimit = PAGE_INCREMENT;
            renderDestinations();
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', (e) => {
            currentRegionFilter = e.target.value;
            // Sync with tab button
            document.querySelectorAll('.region-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.region === currentRegionFilter);
            });
            visibleLimit = PAGE_INCREMENT;
            renderDestinations();
        });
    }
}

// Menyaring destinasi dengan semua filter aktif, memperbarui penghitung, lalu menggambar kartu sesuai batas paginasi.
function renderDestinations() {
    const grid = document.getElementById('destinasiGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = destinations.filter(item => {
        const query = currentSearchQuery;
        const matchSearch = !query || 
            item.name.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            (item.subdistrict && item.subdistrict.toLowerCase().includes(query)) ||
            item.type.toLowerCase().includes(query);
            
        const matchRegion = currentRegionFilter === 'all' || item.region === currentRegionFilter;
        const matchType = currentTypeFilter === 'all' || item.type === currentTypeFilter;
        const matchMood = currentMood === 'all' || item.moods.includes(currentMood);
        const matchHiddenGem = showHiddenGemsOnly ? item.is_hidden_gem === true : true; 
        
        return matchSearch && matchRegion && matchType && matchMood && matchHiddenGem;
    });

    // Update Counter Bar
    const currentRegionLabel = document.getElementById('currentRegionLabel');
    const currentVisibleCount = document.getElementById('currentVisibleCount');
    const totalVisibleCount = document.getElementById('totalVisibleCount');
    const totalBadgeCount = document.getElementById('totalBadgeCount');
    
    const regionNames = {
        'Kota Ambon': 'Pulau Ambon (Kota Ambon)',
        'Maluku Tengah': 'Kabupaten Maluku Tengah',
        'Banda': 'Kepulauan Banda Neira',
        'Seram': 'Pulau Seram',
        'Kei': 'Kepulauan Kei',
        'all': 'Seluruh Wilayah Maluku'
    };
    
    if (currentRegionLabel) {
        currentRegionLabel.textContent = regionNames[currentRegionFilter] || currentRegionFilter;
    }
    
    const itemsToDisplay = filtered.slice(0, visibleLimit);
    if (currentVisibleCount) currentVisibleCount.textContent = itemsToDisplay.length;
    if (totalVisibleCount) totalVisibleCount.textContent = filtered.length;
    if (totalBadgeCount) totalBadgeCount.textContent = filtered.length;

    const loadMoreContainer = document.getElementById('loadMoreContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreContainer) {
        if (filtered.length <= visibleLimit) {
            loadMoreContainer.style.display = 'none';
        } else {
            loadMoreContainer.style.display = 'flex';
            if (loadMoreBtn) {
                const remaining = filtered.length - visibleLimit;
                loadMoreBtn.innerHTML = `<i data-lucide="chevron-down"></i> Muat ${Math.min(remaining, PAGE_INCREMENT)} Destinasi Lagi (${remaining} tersisa)`;
            }
        }
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600;">Destinasi tidak ditemukan</p>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Coba sesuaikan kata kunci pencarian, ubah filter wilayah, atau reset filter mood.</p>
                <button class="btn-outline" onclick="resetDestinationFilters()" style="margin-top: 1rem; padding: 0.5rem 1.25rem;">Reset Filter</button>
            </div>`;
        refreshIcons();
        return;
    }

    itemsToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        const hiddenGemHTML = item.is_hidden_gem ? `<span class="hidden-gem-badge">💎 Hidden Gem</span>` : '';
        
        const safeName = item.name.replace(/'/g, "\\'");
        const safeBackup = item.imageBackup.replace(/'/g, "\\'");
        const subdistrictHTML = item.subdistrict ? `<div class="card-subdistrict"><i data-lucide="map-pin" style="width:13px; color:var(--primary);"></i> <span>${item.subdistrict}</span></div>` : '';
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <span class="card-badge">${item.region}</span>
                ${hiddenGemHTML}
                <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy" onerror="handleImageError(this, '${safeBackup}', '${safeName}')">
            </div>
            <div class="card-body">
                <div class="card-tags">
                    <span class="tag">${item.type}</span>
                    <span class="tag tag-outline">${item.moods[0]}</span>
                </div>
                <h3 class="card-title">${item.name}</h3>
                ${subdistrictHTML}
                <p class="card-desc">${item.desc.substring(0, 85)}...</p>
                <div class="card-footer">
                    <button class="btn-outline full-width" onclick="openModal('${item.id}')" style="padding: 0.5rem 1rem; font-size: 0.875rem;"><i data-lucide="info" style="width:14px;"></i> Lihat Penjelasan</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    refreshIcons();
}

// Tombol 'Muat lagi': tampilkan PAGE_INCREMENT kartu berikutnya.
window.loadMoreDestinations = () => {
    visibleLimit += PAGE_INCREMENT;
    renderDestinations();
};

// Tampilkan semua destinasi hasil filter sekaligus.
window.showAllDestinations = () => {
    visibleLimit = 9999;
    renderDestinations();
};

// Kembalikan semua filter (kecuali wilayah) ke awal, termasuk tampilan tombol dan input.
window.resetDestinationFilters = () => {
    currentMood = 'all';
    currentTypeFilter = 'all';
    currentSearchQuery = '';
    showHiddenGemsOnly = false;
    visibleLimit = PAGE_INCREMENT;
    
    document.querySelectorAll('.mood-tag').forEach(b => b.classList.toggle('active', b.dataset.mood === 'all'));
    document.querySelectorAll('.subnav-pill').forEach(b => b.classList.toggle('active', b.dataset.type === 'all'));
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    const hiddenToggle = document.getElementById('hiddenGemsToggle');
    if (hiddenToggle) hiddenToggle.checked = false;
    
    renderDestinations();
};

// Destination Modal
// Buka modal detail destinasi dan isi gambar, lokasi, kategori, deskripsi, dan tips.
window.openModal = (id) => {
    const item = destinations.find(d => d.id === id);
    if (!item) return;

    const modalImg = document.getElementById('modalImg');
    delete modalImg.dataset.triedBackup;
    delete modalImg.dataset.triedFallback;
    
    modalImg.src = item.image;
    modalImg.alt = item.name;
    const safeBackup = item.imageBackup.replace(/'/g, "\\'");
    const safeName = item.name.replace(/'/g, "\\'");
    modalImg.setAttribute('onerror', `handleImageError(this, '${safeBackup}', '${safeName}')`);

    const locationText = item.subdistrict ? `${item.region} (${item.subdistrict})` : item.region;
    document.getElementById('modalRegion').textContent = locationText;
    document.getElementById('modalCategory').textContent = item.type;
    document.getElementById('modalTitle').textContent = item.name;
    document.getElementById('modalDesc').textContent = item.desc;
    document.getElementById('modalTips').textContent = item.tips;
    document.getElementById('modalHiddenGem').style.display = item.is_hidden_gem ? 'inline-block' : 'none';

    document.getElementById('destModal').classList.add('active');
    refreshIcons();
}
// Tutup modal detail destinasi.
window.closeModal = () => document.getElementById('destModal').classList.remove('active');

// --- Storytelling Map Logic ---
// Gambar kartu wilayah di Storytelling Map; klik kartu membuka cerita wilayah itu.
function renderStoryMap() {
    const container = document.getElementById('storyMapContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const regionImages = {
        'Kota Ambon': { url: 'https://images.unsplash.com/photo-1599813531393-82b4ccda79d0?auto=format&fit=crop&q=80', backup: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80' },
        'Maluku Tengah': { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80', backup: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80' },
        'Banda': { url: 'https://images.unsplash.com/photo-1628186256976-78b1d9edb314?auto=format&fit=crop&q=80', backup: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80' },
        'Seram': { url: 'images/malteng/malteng-114.jpg', backup: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80' },
        'Kei': { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80', backup: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80' }
    };

    regionStories.forEach(region => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.onclick = () => showStoryDetail(region.id);
        
        const imgData = regionImages[region.id] || regionImages['Kota Ambon'];
        const safeBackup = imgData.backup.replace(/'/g, "\\'");
        const safeTitle = region.title.replace(/'/g, "\\'");
        
        card.innerHTML = `
            <img src="${imgData.url}" alt="${region.title}" loading="lazy" onerror="handleImageError(this, '${safeBackup}', '${safeTitle}')">
            <div class="story-card-content">
                <h3>${region.id}</h3>
                <span style="font-size:0.8rem; opacity:0.8;">Klik untuk membaca cerita <i data-lucide="arrow-right" style="width:12px;"></i></span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Tampilkan judul, cerita, dan highlight wilayah terpilih di kotak detail, lalu gulir ke sana.
function showStoryDetail(regionId) {
    const region = regionStories.find(r => r.id === regionId);
    if (!region) return;
    const detailBox = document.getElementById('storyDetailBox');
    const highlightsHTML = region.highlights.map(h => `<span>${h}</span>`).join('');
    
    document.getElementById('storyRegionTitle').textContent = region.title;
    document.getElementById('storyRegionDesc').textContent = region.desc;
    document.getElementById('storyHighlights').innerHTML = highlightsHTML;
    
    detailBox.style.display = 'block';
    detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// --- Persona Quiz Logic ---
// Mulai kuis persona dari awal: reset skor lalu tampilkan soal pertama.
window.openPersonaQuiz = () => {
    quizCurrentQuestion = 0;
    quizScores = { "Si Anak Healing": 0, "Si Pemburu Aesthetic": 0, "Si Pecinta Sejarah": 0 };
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizBody').style.display = 'block';
    renderQuizQuestion();
    document.getElementById('quizModal').classList.add('active');
}

// Tampilkan soal kuis saat ini beserta tombol pilihannya.
function renderQuizQuestion() {
    const qData = personaQuestions[quizCurrentQuestion];
    document.getElementById('quizQuestionText').textContent = `Pertanyaan ${quizCurrentQuestion + 1} dari ${personaQuestions.length}: ${qData.q}`;
    
    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = '';
    
    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.textContent = opt.t;
        btn.onclick = () => handleQuizAnswer(opt.p);
        optionsDiv.appendChild(btn);
    });
}

// Catat jawaban (tambah skor persona), lanjut ke soal berikut atau tampilkan hasil.
function handleQuizAnswer(personaClass) {
    quizScores[personaClass]++;
    quizCurrentQuestion++;
    
    if (quizCurrentQuestion < personaQuestions.length) {
        renderQuizQuestion();
    } else {
        showQuizResult();
    }
}

// Tentukan persona dengan skor tertinggi dan tampilkan ikon serta deskripsinya.
function showQuizResult() {
    finalPersona = Object.keys(quizScores).reduce((a, b) => quizScores[a] > quizScores[b] ? a : b);
    
    document.getElementById('quizBody').style.display = 'none';
    document.getElementById('personaTitle').textContent = finalPersona;
    
    const icons = { "Si Anak Healing": "🌿", "Si Pemburu Aesthetic": "📸", "Si Pecinta Sejarah": "🏰" };
    const descs = {
        "Si Anak Healing": "Kamu butuh ketenangan. Aku akan filter destinasi yang sepi, santai, dan cocok buat rebahan di pantai.",
        "Si Pemburu Aesthetic": "Feeds IG mu harus on point! Aku akan siapkan spot-spot dengan pemandangan paling spektakuler.",
        "Si Pecinta Sejarah": "Kamu suka cerita masa lalu. Benteng, desa tua, dan rempah adalah incaranmu."
    };
    
    document.getElementById('personaIcon').textContent = icons[finalPersona];
    document.getElementById('personaDesc').textContent = descs[finalPersona];
    document.getElementById('quizResult').style.display = 'block';
}

// Terapkan persona hasil kuis sebagai filter mood, tutup kuis, lalu gulir ke daftar destinasi.
window.applyPersonaAndClose = () => {
    if (finalPersona === "Si Anak Healing") currentMood = 'healing santai';
    if (finalPersona === "Si Pemburu Aesthetic") currentMood = 'foto-foto aesthetic';
    if (finalPersona === "Si Pecinta Sejarah") currentMood = 'wisata sejarah';
    
    document.querySelectorAll('.mood-tag').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.mood === currentMood) b.classList.add('active');
    });
    
    renderDestinations();
    syncMoodWithEvents(currentMood);
    
    document.getElementById('quizModal').classList.remove('active');
    document.getElementById('destinasi').scrollIntoView({ behavior: 'smooth' });
}
// Tutup modal kuis tanpa menerapkan hasil.
window.closeQuizModal = () => document.getElementById('quizModal').classList.remove('active');


// --- Local Phrase Guide Logic ---
// Gambar kartu kosakata bahasa Ambon dari localPhrases.
function renderPhrases() {
    const container = document.getElementById('phraseGrid');
    if (!container) return;
    container.innerHTML = '';
    localPhrases.forEach(item => {
        const card = document.createElement('div');
        card.className = 'phrase-card';
        card.innerHTML = `
            <div class="phrase-word">${item.word}</div>
            <div class="phrase-mean">${item.meaning}</div>
            <div class="phrase-ex">"${item.example}"</div>
        `;
        container.appendChild(card);
    });
}


// --- Event Radar Logic ---
// ID event yang di-bookmark pengguna (hanya selama halaman terbuka).
const savedEvents = new Set();

// Samakan kategori event dengan mood yang dipilih (mis. kulineran -> UMKM).
function syncMoodWithEvents(mood) {
    let targetCategory = 'Semua';
    if (mood === 'healing santai') targetCategory = 'Musik';
    if (mood === 'kulineran') targetCategory = 'UMKM';
    if (mood === 'foto-foto aesthetic') targetCategory = 'Bahari';
    if (mood === 'wisata sejarah') targetCategory = 'Budaya';
    
    renderEvents(events, targetCategory);
}

// Gambar tombol kategori event dan kartu event sesuai kategori yang aktif.
function renderEvents(data, activeCategory = 'Semua') {
    const grid = document.getElementById('eventGrid');
    const filterContainer = document.getElementById('categoryFilters');
    if (!grid || !filterContainer) return;
    
    const categories = ['Semua', 'Budaya', 'Musik', 'Bahari', 'Kuliner', 'UMKM'];
    filterContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `month-btn ${cat === activeCategory ? 'active' : ''}`;
        btn.textContent = cat;
        btn.onclick = () => renderEvents(events, cat);
        filterContainer.appendChild(btn);
    });

    grid.innerHTML = '';
    const filteredData = activeCategory === 'Semua' ? data : data.filter(e => e.category === activeCategory);

    if (filteredData.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">Belum ada event di kategori ini. Cek kategori lain ya!</p>`;
        return;
    }

    filteredData.forEach(item => {
        const isSaved = savedEvents.has(item.id);
        const card = document.createElement('div');
        card.className = 'card';
        
        const tentativeHTML = item.is_date_tentative ? `<span class="tag-tentative" style="position:absolute; top:1rem; left:1rem; z-index:2;"><i data-lucide="alert-circle" style="width:12px;"></i> Jadwal dpt berubah</span>` : '';
        const safeName = item.title.replace(/'/g, "\\'");
        const safeBackup = item.imageBackup.replace(/'/g, "\\'");

        card.innerHTML = `
            <div class="card-img-wrapper">
                ${tentativeHTML}
                <button class="card-save ${isSaved ? 'saved' : ''}" onclick="toggleSaveEvent('${item.id}', this, event)">
                    <i data-lucide="bookmark" style="${isSaved ? 'fill: currentColor;' : ''}"></i>
                </button>
                <img src="${item.image}" alt="${item.title}" class="card-img event-poster" loading="lazy" onerror="handleImageError(this, '${safeBackup}', '${safeName}')">
            </div>
            <div class="card-body">
                <div class="card-tags">
                    <span class="tag">${item.category}</span>
                    <span class="tag tag-outline"><i data-lucide="calendar" style="width:12px;"></i> ${item.date}</span>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc.substring(0, 70)}...</p>
                <div class="card-footer">
                    <button class="btn-outline full-width" onclick="openEventModal('${item.id}')" style="padding: 0.4rem; font-size: 0.875rem;">Lihat Detail</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    refreshIcons();
}

// Simpan/batal simpan bookmark event; stopPropagation agar klik tidak membuka kartu.
window.toggleSaveEvent = (id, btn, event) => {
    event.stopPropagation();
    if (savedEvents.has(id)) {
        savedEvents.delete(id);
        btn.classList.remove('saved');
        btn.innerHTML = '<i data-lucide="bookmark"></i>';
    } else {
        savedEvents.add(id);
        btn.classList.add('saved');
        btn.innerHTML = '<i data-lucide="bookmark" style="fill: currentColor;"></i>';
    }
    refreshIcons();
};

// Buka modal detail event dan isi kategori, tanggal, lokasi, deskripsi, dan target pengunjung.
window.openEventModal = (id) => {
    const item = events.find(e => e.id === id);
    if (!item) return;

    const modalImg = document.getElementById('eventModalImg');
    delete modalImg.dataset.triedBackup;
    delete modalImg.dataset.triedFallback;
    
    modalImg.src = item.image;
    modalImg.alt = item.title;
    const safeBackup = item.imageBackup.replace(/'/g, "\\'");
    const safeTitle = item.title.replace(/'/g, "\\'");
    modalImg.setAttribute('onerror', `handleImageError(this, '${safeBackup}', '${safeTitle}')`);

    document.getElementById('eventModalCategory').textContent = item.category;
    document.getElementById('eventModalDate').querySelector('span').textContent = item.date;
    document.getElementById('eventModalTentative').style.display = item.is_date_tentative ? 'inline-flex' : 'none';
    document.getElementById('eventModalTitle').textContent = item.title;
    document.getElementById('eventModalLocation').querySelector('span').textContent = item.location;
    document.getElementById('eventModalDesc').textContent = item.desc;
    document.getElementById('eventModalTarget').textContent = item.target_audience;

    document.getElementById('eventModal').classList.add('active');
    refreshIcons();
}

// Tutup modal detail event.
window.closeEventModal = () => document.getElementById('eventModal').classList.remove('active');

// Gambar kartu kuliner dari data foods.
function renderFoods() {
    const container = document.getElementById('foodContainer');
    if (!container) return;
    container.innerHTML = '';
    foods.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <div class="food-emoji">${item.emoji}</div>
            <h3 class="food-title">${item.name}</h3>
            <p class="card-desc" style="font-size:0.875rem;">${item.desc}</p>
        `;
        container.appendChild(card);
    });
}


// --- Smart Itinerary & Route Logic ---
// Tombol pilihan form itinerary: tandai tombol yang dipilih dalam satu grup.
document.querySelectorAll('.radio-btn input').forEach(input => {
    input.addEventListener('change', (e) => {
        const siblings = e.target.closest('.radio-group').querySelectorAll('.radio-btn');
        siblings.forEach(s => s.classList.remove('active'));
        e.target.parentElement.classList.add('active');
    });
});

// Generator itinerary: pilih destinasi sesuai budget, urutkan per rute, lalu susun rencana pagi/siang/sore per hari.
const itineraryForm = document.getElementById('itineraryForm');
if (itineraryForm) {
    itineraryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const duration = parseInt(document.querySelector('input[name="duration"]:checked').value);
        const style = document.querySelector('input[name="style"]:checked').value;
        const budget = document.querySelector('input[name="budget"]:checked').value;
        
        let possibleDests = destinations.filter(d => d.budget_tier.includes(budget) || budget === 'Backpacker');
        if (possibleDests.length === 0) possibleDests = destinations; 
        
        possibleDests.sort((a, b) => a.route_group - b.route_group);

        const resultDiv = document.getElementById('itineraryResult');
        let html = `<h3>Plan Trip ${duration} Hari (Gaya ${style} - ${budget})</h3>
                    <div class="route-badge"><i data-lucide="map"></i> Smart Route: Ambon → Seram / Sekitarnya</div>
                    <div style="margin-top:1.5rem;">`;
        
        let transportText = budget === 'Backpacker' ? 'naik angkot / sewa motor' : 'sewa mobil nyaman';
        let foodText = budget === 'Backpacker' ? 'di warung lokal' : 'di restoran lokal rekomendasi';

        for (let i = 0; i < duration; i++) {
            const dest = possibleDests[i % possibleDests.length];
            
            html += `
                <div class="day-plan">
                    <div class="day-title"><i data-lucide="map-pin"></i> Hari ${i+1}: Eksplor ${dest.region}</div>
                    <div class="timeline">
                        <div class="timeline-item">
                            <h4>Pagi - Eksplorasi <span class="est-budget">${budget}</span></h4>
                            <p>Perjalanan ke <strong>${dest.name}</strong> ${transportText}. ${dest.desc}</p>
                        </div>
                        <div class="timeline-item">
                            <h4>Siang - Kuliner <span class="est-budget">${budget}</span></h4>
                            <p>Makan siang ${foodText}. ${dest.tips}</p>
                        </div>
                        <div class="timeline-item">
                            <h4>Sore - Bersantai <span class="est-budget">${budget}</span></h4>
                            <p>Menikmati sore gaya ${style}. Jangan lupa siapkan kamera untuk momen sunset.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        html += `</div>
            <div style="margin-top: 2rem; padding: 1rem; background: var(--white); border-radius: 8px; font-size:0.875rem; border-left: 4px solid var(--accent);">
                <strong>Catatan Smart Companion:</strong> Rute ini disusun berurutan berdasarkan efisiensi waktu perjalanan di Maluku.
            </div>
        `;
        
        resultDiv.innerHTML = html;
        resultDiv.style.display = 'block';
        refreshIcons();
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}


// --- Chatbot Logic "Loku" ---
// Status apakah jendela chatbot sedang terbuka.
let isChatOpen = false;

// Buka/tutup chatbot; saat pertama dibuka tampilkan pesan sambutan beserta saran pertanyaan.
window.toggleChat = () => {
    const chatWidget = document.getElementById('chatWidget');
    const badge = document.querySelector('.floating-chat-btn .badge');
    isChatOpen = !isChatOpen;

    if (isChatOpen) {
        chatWidget.classList.add('active');
        if (badge) badge.style.display = 'none';

        const messages = document.getElementById('chatMessages');
        if (messages.children.length === 0) {
            addMessage('Halo! Beta "Loku", asisten informasi kuliner dan wisata Maluku. Beta siap bantu info 309 destinasi wisata (95 di Pulau Ambon, 91 di Kepulauan Kei, 78 di Kepulauan Banda Neira, 37 di Kota Tual, dan pulau eksotis lainnya). Ada yang bisa beta bantu hari ini?', 'bot', [
                '95 Wisata di Ambon',
                '78 Wisata di Banda Neira',
                '91 Wisata di Kepulauan Kei',
                'Wisata Kota Tual'
            ]);
        }
    } else {
        chatWidget.classList.remove('active');
    }
};

// Rapikan teks: huruf kecil, buang aksen/tanda baca/huruf berulang, lalu ganti slang dengan kata baku.
function normalizeSlang(text) {
    let normalized = text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/(.)\1{2,}/g, '$1$1')
        .replace(/[^\w\s-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    Object.keys(slangDict).forEach(slang => {
        const regex = new RegExp(`\\b${slang}\\b`, 'g');
        normalized = normalized.replace(regex, slangDict[slang]);
    });
    return normalized;
}

// Jawaban chatbot lokal: coba aturan kata kunci dulu, lalu dataset dengan skor tertinggi, bila tidak ada beri jawaban maaf.
function getBotResponse(input) {
    const text = normalizeSlang(input);
    const dynamicResponse = getDynamicBotResponse(text);
    if (dynamicResponse) return dynamicResponse;

    const matches = qaDataset
        .map(item => ({ ...item, score: getDatasetScore(text, item.pattern) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    if (matches[0] && matches[0].score >= 7) {
        const isGreeting = /^(OP|CL)/.test(matches[0].category);
        return {
            answer: isGreeting ? matches[0].response : `${matches[0].response}\n\nMau beta bantu cari rekomendasi tempat lain juga?`,
            suggestions: buildFollowUpSuggestions(matches[0].category)
        };
    }

    return {
        answer: 'Maaf, saya belum mengerti pertanyaan itu. Coba ulangi dengan kata lain atau pilih salah satu topik di bawah ya.',
        suggestions: [
            'Wisata di Pulau Ambon',
            'Rekomendasi pantai di Ambon',
            'Kuliner wajib dicoba',
            'Hidden gems Maluku'
        ]
    };
}

// Nilai kemiripan input dengan pola dataset: cocok frasa utuh + jumlah kata sama + persentase pola yang tercakup.
function getDatasetScore(input, patterns) {
    const inputTokens = tokenize(input);
    let bestScore = 0;

    patterns.forEach(pattern => {
        const normalizedPattern = normalizeSlang(pattern);
        const patternTokens = tokenize(normalizedPattern);
        // cocokkan per kata utuh: pola pendek seperti 'p' atau 'hai' jangan cocok dengan "pantai"
        let score = ` ${input} `.includes(` ${normalizedPattern} `) ? 8 : 0;

        patternTokens.forEach(token => {
            if (inputTokens.includes(token)) score += token.length > 4 ? 2 : 1;
        });

        if (patternTokens.length > 0) {
            const coverage = patternTokens.filter(token => inputTokens.includes(token)).length / patternTokens.length;
            score += Math.round(coverage * 4);
        }

        bestScore = Math.max(bestScore, score);
    });

    return bestScore;
}

// Pecah teks menjadi kata penting (lebih dari 2 huruf, tanpa kata umum seperti 'dan', 'yang').
function tokenize(text) {
    return normalizeSlang(text)
        .split(' ')
        .filter(token => token.length > 2 && !['dan', 'yang', 'aku', 'beta', 'saya', 'mau', 'ada', 'info', 'dong'].includes(token));
}

// Jawaban berbasis kata kunci (wilayah, pantai, kuliner, dst.) atau nama destinasi; null bila tidak ada yang cocok.
function getDynamicBotResponse(text) {
    const contains = (...words) => words.some(word => text.includes(word));

    if (contains('95 wisata', '95 daftar', 'daftar wisata ambon', 'wisata di ambon', 'wisata pulau ambon')) {
        return {
            answer: 'Di Pulau Ambon (Kota Ambon) terdapat 95 destinasi wisata lengkap! Mulai dari pantai legendaris (Pintu Kota, Namalatu, Santai, Lawena), spot selam (Gua Hukurila, Laha Muck Diving, Batu Capeu), situs sejarah (Benteng Victoria, Soya, Monumen Pattimura, Gong Perdamaian), hingga wisata alam (Siwang Paradise, Hutan Sagu Rutong, Talaga Pange). Kamu bisa filter langsung di bagian Destinasi!',
            suggestions: ['Spot diving di Ambon', 'Wisata sejarah di Ambon', 'Hidden gems Ambon']
        };
    }

    if (contains('kei', 'malra', 'maluku tenggara', '91 wisata', 'wisata kei', 'pulau kei', 'ngurbloat', 'ngurtavur', 'hawang')) {
        return {
            answer: 'Kepulauan Kei (Maluku Tenggara) memiliki 91 destinasi wisata! Terkenal dengan Pantai Ngurbloat (pasir sehalus tepung, terhalus di Asia), Pantai Ngurtavur (lidah pasir timbul 2 km ke tengah laut tempat burung pelikan Australia), Goa Hawang dengan air biru kristal bawah tanah, hingga Air Terjun Hoko dan Desa Adat Tanimbar Kei. Kota Tual (ibukota Kepulauan Kei) punya 37 destinasi tambahan termasuk Pulau Bair yang legendaris!',
            suggestions: ['Pantai Ngurbloat', 'Pantai Ngurtavur', 'Goa Hawang', 'Wisata Kota Tual']
        };
    }

    if (contains('tual', 'kota tual', 'pulau bair', 'dullah', 'tayando', 'bair', 'duroa', 'adranan', 'goa tengkorak', 'museum belan')) {
        return {
            answer: 'Kota Tual adalah ibukota Kabupaten Maluku Tenggara yang secara geografis termasuk dalam Kepulauan Kei. Memiliki 37 destinasi wisata menarik: Pulau Bair (Raja Ampat-nya Maluku dengan teluk labirin karst), Pantai Difur & Dullah, Jembatan Gantung Wear Fair, Goa Tengkorak (tulang leluhur purba), Museum Belan, Danau Ohoitel, Pulau Adranan, serta tradisi Tikam Dabus Tayando Yamtel. Cek tab "Kota Tual (Kep. Kei)" di menu Destinasi!',
            suggestions: ['Pulau Bair', 'Jembatan Gantung Wear Fair', 'Goa Tengkorak', 'Museum Belan']
        };
    }

        if (contains('banda', 'banda neira', '78 wisata', 'rhun', 'hatta', 'belgica', 'gunung api', 'nassau', 'bung hatta', 'lava flow', 'pala')) {
        return {
            answer: 'Kepulauan Banda Neira memiliki 78 destinasi wisata legendaris! Mulai dari situs sejarah rempah dunia (Benteng Belgica, Benteng Nassau, Benteng Hollandia, Benteng Revenge di Pulau Ai, Istana Mini VOC, Rumah Pengasingan Bung Hatta & Sutan Sjahrir, Monumen Perigi Pantai), surga bahari (Lava Flow Snorkeling di lereng Gunung Api, diving hiu martil di Pulau Hatta, Pulau Rhun & Nailaka yang pernah ditukar dengan Manhattan New York, Pulau Ay), keagungan alam (Gunung Api Banda 656 mdpl, Perkebunan Pala tertua, Hutan Kenari raksasa), hingga tradisi sakral (Ritual Cuci Parigi Lonthor, perahu Kora-kora Belang, Tari Cakalele). Cek tab "Banda Neira" di bagian Destinasi!',
            suggestions: ['Benteng Belgica', 'Lava Flow Snorkeling', 'Pulau Rhun', 'Rumah Bung Hatta']
        };
    }

    if (contains('hidden gem', 'hidden gems', 'anti mainstream', 'tersembunyi')) {
        const gems = destinations.filter(item => item.is_hidden_gem).slice(0, 5).map(item => `${item.name} (${item.region})`).join(', ');
        return {
            answer: `Kalau mau yang anti-mainstream dan tersembunyi di Ambon & Maluku: ${gems}. Pantai Lawena cocok untuk surfing, Siwang Paradise untuk pemandangan bukit, dan Tebing Makariki untuk adventure ekstrem.`,
            suggestions: ['Siwang Paradise', 'Pantai Lawena', 'Gua Hukurila']
        };
    }

    if (contains('pantai', 'laut', 'bahari', 'snorkeling', 'diving', 'selam')) {
        return {
            answer: 'Rekomendasi bahari terbaik: Di Ambon ada Pintu Kota, Pantai Namalatu, Pantai Santai, Pantai Lawena, dan spot diving kelas dunia di Bawah Laut Bandara Pattimura (Laha) serta Gua Bawah Laut Hukurila. Di luar Ambon ada Pantai Ora, Pantai Liang, dan Pantai Ngurbloat Kei!',
            suggestions: ['Gua Bawah Laut Hukurila', 'Pantai Pintu Kota', 'Pantai Ora']
        };
    }

    if (contains('aesthetic', 'foto', 'instagram', 'spot')) {
        return {
            answer: 'Spot foto paling aesthetic: Pintu Kota, Siwang Paradise, Pantai Coral Liang Payer, Jembatan Merah Putih saat malam, dan Pulau Bair Kei. Datang saat sunrise atau golden hour sore hari!',
            suggestions: ['Siwang Paradise', 'Pintu Kota', 'Jembatan Merah Putih']
        };
    }

    if (contains('sejarah', 'benteng', 'monumen', 'museum', 'pattimura')) {
        return {
            answer: 'Wisata sejarah utama: Museum Siwalima, Benteng Victoria, Gong Perdamaian Dunia, Monumen Christina Martha Tiahahu, Gereja Tua Soya, War Cemetery Tantui, dan Benteng Amsterdam.',
            suggestions: ['Museum Siwalima', 'Benteng Victoria', 'Gong Perdamaian']
        };
    }

    if (contains('kuliner', 'makanan', 'makan', 'papeda', 'rujak', 'sukun', 'kopi')) {
        return {
            answer: 'Kuliner wajib Maluku: Papeda Ikan Kuah Kuning, Rujak Natsepa, Sambal Colo-colo, Kopi Sibu-sibu, Kuliner Tapal Kuda Air Salobar, dan Sukun Goreng renyah.',
            suggestions: ['Kuliner Tapal Kuda', 'Rujak Natsepa yang paling enak', 'Papeda itu apa']
        };
    }

    const destinationMatch = destinations.find(item => text.includes(item.name.toLowerCase()));
    if (destinationMatch) {
        const sub = destinationMatch.subdistrict ? ` di kawasan ${destinationMatch.subdistrict}` : '';
        return {
            answer: `📌 **${destinationMatch.name}** (${destinationMatch.region}${sub}): ${destinationMatch.desc}\n\n💡 **Tips lokal:** ${destinationMatch.tips}`,
            suggestions: ['Lihat tempat lain di wilayah ini', 'Rekomendasi kuliner', 'Buat itinerary']
        };
    }

    return null;
}

// Saran pertanyaan lanjutan sesuai awalan kategori dataset (OP pembuka, WS wisata, MIX campuran, CL penutup).
function buildFollowUpSuggestions(category) {
    if (category.startsWith('OP')) return ['95 Wisata di Ambon', 'Rekomendasi pantai', 'Kuliner wajib'];
    if (category.startsWith('WS')) return ['Buat itinerary', 'Estimasi budget', 'Kuliner terdekat'];
    if (category.startsWith('MIX')) return ['Info QRIS dan cash', 'Sewa motor bandara', 'Tempat aesthetic'];
    if (category.startsWith('CL')) return ['Tanya destinasi lain', 'Buka itinerary', 'Event budaya'];
    return ['Pantai Natsepa', 'Banda Neira', 'Siwang Paradise'];
}

// Tambahkan gelembung pesan ke chat (teks di-escape) dan tombol saran bila pesan dari bot.
function addMessage(text, sender, suggestions = []) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    msgDiv.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
    messages.appendChild(msgDiv);

    if (sender === 'bot' && suggestions.length > 0) {
        const options = document.createElement('div');
        options.className = 'chat-suggestions';

        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => sendQuickPrompt(suggestion));
            options.appendChild(btn);
        });

        messages.appendChild(options);
    }

    messages.scrollTop = messages.scrollHeight;
}

// Tampilkan jawaban bot, baik berupa teks biasa maupun objek {answer, suggestions}.
function addBotResponse(response) {
    if (typeof response === 'string') {
        addMessage(response, 'bot');
        return;
    }

    addMessage(response.answer, 'bot', response.suggestions || []);
}

// Dijalankan sebagai komponen Streamlit (streamlit_app.py): pertanyaan dikirim ke Python lewat postMessage, bukan fetch.
const diStreamlit = new URLSearchParams(location.search).has('streamlitUrl');
const tungguJawaban = {};
const kirimKeStreamlit = (type, data) => window.parent.postMessage({ isStreamlitMessage: true, type, ...data }, '*');
if (diStreamlit) {
    // Streamlit memasang scrolling="no" pada iframe sehingga halaman tak bisa digulir; ubah lalu muat ulang sekali agar berlaku.
    try {
        if (window.frameElement?.getAttribute('scrolling') === 'no') {
            window.frameElement.setAttribute('scrolling', 'yes');
            location.reload();
        }
    } catch (err) { /* beda origin: biarkan */ }
    window.addEventListener('message', (e) => {
        const j = e.data?.type === 'streamlit:render' && e.data.args?.jawaban;
        if (j && tungguJawaban[j.id]) { tungguJawaban[j.id](j); delete tungguJawaban[j.id]; }
    });
    kirimKeStreamlit('streamlit:componentReady', { apiVersion: 1 });
    // Tinggi iframe = tinggi layar, supaya navbar & tombol Loku (position: fixed) tetap di tempatnya.
    const aturTinggi = () => {
        let h = 800;
        try { h = window.parent.innerHeight; } catch (err) { /* beda origin: pakai 800 */ }
        kirimKeStreamlit('streamlit:setFrameHeight', { height: h });
    };
    aturTinggi();
    try { window.parent.addEventListener('resize', aturTinggi); } catch (err) { /* beda origin */ }
}
function tanyaStreamlit(message) {
    const id = Date.now() + Math.random();
    return Promise.race([
        new Promise((ok) => {
            tungguJawaban[id] = ok;
            kirimKeStreamlit('streamlit:setComponentValue', { value: { id, message }, dataType: 'json' });
        }),
        new Promise((_, gagal) => setTimeout(() => gagal(new Error('timeout')), 180000)),
    ]);
}

// Kirim pesan chat: tanya server Python (localhost:8000/chat); bila gagal/offline pakai chatbot lokal.
const chatForm = document.getElementById('chatForm');
if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputField = document.getElementById('chatInput');
        const text = inputField.value.trim();

        if (text) {
            addMessage(text, 'user');
            inputField.value = '';

            // Tampilkan pesan loading sementara
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'msg bot';
            loadingMsg.id = 'botLoadingTemp';
            loadingMsg.textContent = 'Loku sedang mengetik...';
            const messages = document.getElementById('chatMessages');
            if (messages) {
                messages.appendChild(loadingMsg);
                messages.scrollTop = messages.scrollHeight;
            }

            try {
                if (diStreamlit) {
                    const data = await tanyaStreamlit(text);
                    document.getElementById('botLoadingTemp')?.remove();
                    addMessage(data.answer, 'bot');
                    return;
                }
                // Panggil FastAPI backend
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 180000); // Gemini bisa 60-130 detik
                // Dibuka lewat server lokal lain (port 5500/file): server chat ada di localhost:8000; selain itu server yang sama.
                const lokal = ['localhost', '127.0.0.1', ''].includes(location.hostname) && location.port !== '8000';
                const res = await fetch(lokal ? 'http://localhost:8000/chat' : '/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    document.getElementById('botLoadingTemp')?.remove();
                    addMessage(data.answer, 'bot');
                    return;
                }
            } catch (err) {
                // Jika backend offline atau timeout, fallback ke bot lokal
            }

            document.getElementById('botLoadingTemp')?.remove();
            setTimeout(() => {
                const response = getBotResponse(text);
                addBotResponse(response);
            }, 300);
        }
    });
}

// Kirim teks tombol saran seolah-olah diketik pengguna.
window.sendQuickPrompt = (text) => {
    const inputField = document.getElementById('chatInput');
    if (!inputField) return;
    inputField.value = text;
    const form = document.getElementById('chatForm');
    if (form) form.dispatchEvent(new Event('submit'));
};

// Hapus riwayat chat dan tampilkan pesan sambutan ulang.
window.resetChat = () => {
    const messages = document.getElementById('chatMessages');
    if (messages) messages.innerHTML = '';
    addMessage('Obrolan su di-reset. Ada yang bisa beta bantu seputar 309 destinasi wisata di Ambon, Banda Neira, Kei, Tual, dan Maluku?', 'bot', [
        '95 Wisata di Ambon',
        '78 Wisata di Banda Neira',
        '91 Wisata di Kepulauan Kei'
    ]);
};

// --- Contact Form Logic ---
// Form kontak: kirim pesan ke email Dustin lewat FormSubmit (tanpa backend); form hanya dikosongkan bila terkirim.
window.handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    try {
        const res = await fetch('https://formsubmit.co/ajax/a8b47e9148212e9011ab4da05aa8a2f1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                _subject: 'Pesan baru dari MalukuVibes',
                _template: 'table',
                _captcha: 'false',
                Nama: form.contactName.value,
                Kontak: form.contactContact.value,
                Pesan: form.contactMessage.value
            })
        });
        const data = await res.json();
        if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Gagal mengirim');
        alert("Dangke! Pesan kamu sudah terkirim. Dustin akan menghubungi kamu lewat kontak yang diberikan.");
        form.reset();
    } catch (err) {
        console.error('FormSubmit:', err);
        alert(`Maaf, pesan gagal terkirim. Coba lagi sebentar ya.\n(${err.message})`);
    } finally {
        btn.disabled = false;
    }
};


// --- Peta 3D Ambon (MapLibre + terrain AWS + citra satelit Esri) ---
// Peta 3D: citra satelit + elevasi medan, tombol navigasi, penanda Kota Ambon, dan rotasi otomatis.
if (window.maplibregl && document.getElementById('map3d')) {
    const map = new maplibregl.Map({
        container: 'map3d',
        center: [128.2, -3.65], zoom: 9.6, pitch: 62, bearing: -25, maxPitch: 80,
        style: {
            version: 8,
            sources: {
                sat: { type: 'raster', tileSize: 256, maxzoom: 17, attribution: 'Esri World Imagery',
                    tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'] },
                dem: { type: 'raster-dem', encoding: 'terrarium', tileSize: 256, maxzoom: 14, attribution: 'Terrain: AWS/Mapzen',
                    tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'] }
            },
            layers: [{ id: 'sat', type: 'raster', source: 'sat' }],
            terrain: { source: 'dem', exaggeration: 1.8 }
        }
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
    new maplibregl.Marker({ color: '#f97316' }).setLngLat([128.1814, -3.6954]).setPopup(new maplibregl.Popup().setText('Kota Ambon')).addTo(map);
    // putar pelan sampai user menyentuh peta
    let spin = true;
    const rotate = () => { if (spin) { map.setBearing(map.getBearing() + 0.08); requestAnimationFrame(rotate); } };
    map.on('load', rotate);
    ['mousedown', 'touchstart', 'wheel'].forEach(ev => map.getCanvas().addEventListener(ev, () => { spin = false; }, { once: true, passive: true }));
}
