// 1. GREETING
// js/script.js

function updateGreeting() {
    const greetingElement = document.getElementById("greeting");
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greetText = "";

    // Logika penentuan waktu
    if (hour >= 5 && hour < 11) {
        greetText = "Selamat pagi";
    } else if (hour >= 11 && hour < 15) {
        greetText = "Selamat siang";
    } else if (hour >= 15 && hour < 18) {
        greetText = "Selamat sore";
    } else {
        greetText = "Selamat malam";
    }

    // Mengambil nama dari sessionStorage (yang disimpan saat login)
    const namaUser = sessionStorage.getItem("namaUser") || "Pengguna";
    
    // Menampilkan pesan sesuai format yang diminta
    greetingElement.innerText = `${greetText}, ${namaUser}`;
}

// Pastikan fungsi dipanggil saat halaman dashboard dimuat
window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("dashboard.html")) {
        updateGreeting();
    }
});

// 2. LOGIN (Memperbaiki jalur ke folder html/)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        const user = dataPengguna.find(u => u.email === email && u.password === pass);

        if (user) {
            sessionStorage.setItem("namaUser", user.nama);
            // KUNCI: Karena index.html ada di root, maka pindah ke html/dashboard.html
            window.location.href = "html/dashboard.html"; 
        } else {
            alert("Email atau Password salah!");
        }
    });
}

// 3. STOK (Memperbaiki jalur gambar ke assets/img/)
function tampilkanStok() {
    const tableBody = document.getElementById("stokTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = "";
    dataBahanAjar.forEach(item => {
        // Karena file .html ada di folder /html, maka naik satu tingkat ke ../assets/
        const imgPath = `../assets/${item.cover}`; 
        tableBody.innerHTML += `
            <tr>
                <td><img src="${imgPath}" width="60" style="border-radius:4px"></td>
                <td>${item.kodeBarang}</td>
                <td>${item.namaBarang}</td>
                <td>${item.stok}</td>
                <td><button onclick="tambahStok('${item.kodeBarang}')">Tambah</button></td>
            </tr>`;
    });
}

function tambahStok(kode) {
    const item = dataBahanAjar.find(i => i.kodeBarang === kode);
    if (item) { item.stok++; tampilkanStok(); }
}

// 4. TRACKING
function cariTracking() {
    const noDO = document.getElementById("noDO").value;
    const data = dataTracking[noDO];
    const container = document.getElementById("hasilTracking");
    if (data) {
        container.style.display = "block";
        document.getElementById("namaMhs").innerText = data.nama;
        document.getElementById("statusKirim").innerText = "Status: " + data.status;
        const tabel = document.getElementById("tabelPerjalanan");
        tabel.innerHTML = "<tr><th>Waktu</th><th>Keterangan</th></tr>";
        data.perjalanan.forEach(p => {
            tabel.innerHTML += `<tr><td>${p.waktu}</td><td>${p.keterangan}</td></tr>`;
        });
    } else { alert("Nomor DO tidak ditemukan!"); }
}

// INIT
window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("html/dashboard.html")) updateGreeting();
    if (window.location.pathname.includes("html/stok.html")) tampilkanStok();
});
