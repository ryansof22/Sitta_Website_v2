new Vue({
    el: '#app',
    data: {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        // Cek localStorage, jika kosong gunakan data default
        stok: JSON.parse(localStorage.getItem('sitta_stok_db')) || [
            { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024</em>" },
            { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
            { kode: "BIOL4201", judul: "Biologi Umum", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh pendingin" }
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
        // Otomatis simpan ke localStorage setiap ada perubahan data stok
        stok: {
            handler(newVal) {
                localStorage.setItem('sitta_stok_db', JSON.stringify(newVal));
            },
            deep: true
        },
        filterUpbjj(newVal) {
            if (!newVal) this.filterKategori = ''; 
        }
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
            alert("Data Stok Berhasil Disimpan!");
            // Reset Form
            this.newStok = { kode: '', judul: '', upbjj: 'Jakarta', qty: 0, safety: 0, kategori: 'MK Wajib', lokasiRak: 'TBA' };
        }
    }
});
