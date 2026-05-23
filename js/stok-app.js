new Vue({
    el: '#app',
    data: {
        upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
        kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
        stok: JSON.parse(localStorage.getItem('db_stok')) || [
            { kode: "EKMA4116", judul: "Pengantar Manajemen", kategori: "MK Wajib", upbjj: "Jakarta", lokasiRak: "R1-A3", harga: 65000, qty: 28, safety: 20, catatanHTML: "<em>Edisi 2024</em>" }
        ],
        filterUpbjj: '',
        filterKategori: '',
        onlyReorder: false,
        newEntry: { kode: '', judul: '', upbjj: 'Jakarta', qty: 0, safety: 0, kategori: 'MK Wajib', lokasiRak: 'TBA' }
    },
    computed: {
        filteredStok() {
            return this.stok.filter(item => {
                const matchUpbjj = !this.filterUpbjj || item.upbjj === this.filterUpbjj;
                const matchKategori = !this.filterKategori || item.kategori === this.filterKategori;
                const matchReorder = !this.onlyReorder || (item.qty < item.safety || item.qty === 0);
                return matchUpbjj && matchKategori && matchReorder;
            });
        }
    },
    watch: {
        stok: {
            handler(val) { localStorage.setItem('db_stok', JSON.stringify(val)); },
            deep: true
        },
        filterUpbjj(val) { if (!val) this.filterKategori = ''; }
    },
    methods: {
        statusText(item) {
            if (item.qty === 0) return 'Kosong';
            return item.qty < item.safety ? 'Menipis' : 'Aman';
        },
        statusColor(item) {
            if (item.qty === 0) return 'text-red';
            return item.qty < item.safety ? 'text-orange' : 'text-green';
        },
        resetFilter() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.onlyReorder = false;
        },
        addBahanAjar() {
            this.stok.push({ ...this.newEntry, catatanHTML: 'Input Manual' });
            this.newEntry = { kode: '', judul: '', upbjj: 'Jakarta', qty: 0, safety: 0, kategori: 'MK Wajib', lokasiRak: 'TBA' };
            alert("Berhasil disimpan ke database lokal!");
        }
    }
});
