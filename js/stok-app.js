new Vue({
    el: '#app',
    data: {
        // Dummy data sesuai dataBahanAjar.js
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        stok: [
            { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024</em>" },
            { kode: "EKMA4115", judul: "Pengantar Akuntansi", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A4", harga: 60000, qty: 7, safety: 15, catatanHTML: "<strong>Cover baru</strong>" },
            { kode: "BIOL4201", judul: "Biologi Umum", kategori: "Praktikum", upbjj: "Surabaya", lokasiRak: "R3-B2", harga: 80000, qty: 12, safety: 10, catatanHTML: "Butuh pendingin" },
            { kode: "FISIP4001", judul: "Dasar Sosiologi", kategori: "MK Pilihan", upbjj: "Makassar", lokasiRak: "R2-C1", harga: 55000, qty: 2, safety: 8, catatanHTML: "Stok menipis" }
        ],
        filterUPBJJ: '',
        filterKategori: '',
        isCritical: false,
        sortBy: 'judul',
        newStok: { kode: '', judul: '', upbjj: '', qty: 0, safety: 0 },
        errorMsg: ''
    },
    computed: {
        // Implementasi poin 1.2 & 1.4: List Rendering & Computed [cite: 87, 89]
        filteredStok() {
            let result = this.stok.filter(item => {
                let matchUPBJJ = this.filterUPBJJ ? item.upbjj === this.filterUPBJJ : true;
                let matchKat = this.filterKategori ? item.kategori === this.filterKategori : true;
                let matchCrit = this.isCritical ? (item.qty < item.safety || item.qty === 0) : true;
                return matchUPBJJ && matchKat && matchCrit;
            });

            return result.sort((a, b) => {
                if (this.sortBy === 'qty' || this.sortBy === 'harga') return a[this.sortBy] - b[this.sortBy];
                return a.judul.localeCompare(b.judul);
            });
        }
    },
    methods: {
        getStatus(item) {
            if (item.qty === 0) return 'Kosong';
            if (item.qty < item.safety) return 'Menipis';
            return 'Aman';
        },
        statusClass(item) {
            return {
                'status-aman': item.qty >= item.safety && item.qty > 0,
                'status-menipis': item.qty < item.safety && item.qty > 0,
                'status-kosong': item.qty === 0
            };
        },
        tambahStok() {
            if (!this.newStok.kode || !this.newStok.judul) {
                this.errorMsg = "Data tidak boleh kosong!";
                return;
            }
            this.stok.push({...this.newStok, kategori: 'MK Wajib', catatanHTML: '-'});
            this.newStok = { kode: '', judul: '', upbjj: '', qty: 0, safety: 0 };
            this.errorMsg = "";
        },
        resetFilter() {
            this.filterUPBJJ = '';
            this.filterKategori = '';
            this.isCritical = false;
        }
    },
    watch: {
        // Implementasi poin 1.5: Minimal 2 Watchers [cite: 90]
        filterUPBJJ(newVal) {
            if (!newVal) this.filterKategori = '';
            console.log("Filter UPBJJ berubah ke: " + newVal);
        },
        stok: {
            handler() { console.log("Data stok terupdate!"); },
            deep: true
        }
    }
});
