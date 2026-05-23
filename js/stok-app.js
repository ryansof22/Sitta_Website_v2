new Vue({
    el: '#app',
    data: {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        stok: JSON.parse(localStorage.getItem('sitta_stok')) || [
            { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024</em>" },
            { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
            { kode: "BIOL4201", judul: "Biologi Umum", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh pendingin" },
            { kode: "FISIP4001", judul: "Dasar Sosiologi", kategori: "MK Pilihan", upbjj: "Makassar", lokasiRak: "R2-C1", harga: 55000, qty: 2, safety: 8, catatanHTML: "Stok menipis" }
        ],
        filterUpbjj: '',
        filterKategori: '',
        showLowStock: false,
        newStok: { kode: '', judul: '', upbjj: 'Jakarta', qty: 0, safety: 0, kategori: 'MK Wajib', lokasiRak: 'TBA' }
    },
    computed: {
        filteredStok() {
            return this.stok.filter(item => {
                const matchUpbjj = !this.filterUpbjj || item.upbjj === this.filterUpbjj;
                const matchKategori = !this.filterKategori || item.kategori === this.filterKategori;
                const matchLow = !this.showLowStock || (item.qty < item.safety || item.qty === 0);
                return matchUpbjj && matchKategori && matchLow;
            });
        }
    },
    watch: {
        filterUpbjj(newVal) {
            if (!newVal) this.filterKategori = ''; // Reset kategori jika UPBJJ direset
            console.log("Filter UPBJJ berubah menjadi: " + newVal);
        },
        stok: {
            handler(newData) {
                localStorage.setItem('sitta_stok', JSON.stringify(newData));
                console.log("Database Stok diperbarui di LocalStorage");
            },
            deep: true
    },
    methods: {
        getStatusText(item) {
            if (item.qty === 0) return 'Kosong';
            return item.qty < item.safety ? 'Menipis' : 'Aman';
        },
        getStatusClass(item) {
            if (item.qty === 0) return 'text-red';
            return item.qty < item.safety ? 'text-orange' : 'text-green';
        },
        resetFilter() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.showLowStock = false;
        },
        tambahStok() {
            this.stok.push({...this.newStok, catatanHTML: 'Data Baru'});
            alert("Data berhasil ditambahkan!");
        }
    }
});
