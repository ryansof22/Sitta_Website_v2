new Vue({
    el: '#app',
    data: {
        pengirimanList: sourceData.pengirimanList,
        paket: sourceData.paket,
        // Sekarang data tracking diawali dengan data yang sudah ada (Rina Wulandari)
        trackingList: sourceData.tracking, 
        form: { nim: '', nama: '', ekspedisi: '' },
        selectedPaketIndex: -1,
        sequence: 2 // Mulai dari 2 karena DO2025-001 sudah terpakai
    },
    computed: {
        // Generate Nomor DO otomatis [cite: 53-58]
        nextDONumber() {
            const tahun = new Date().getFullYear();
            const seq = String(this.sequence).padStart(3, '0');
            return `DO${tahun}-${seq}`;
        }
    },
    methods: {
        simpanDO() {
            if (!this.form.nim || this.selectedPaketIndex === -1) return alert("Lengkapi data!");
            
            const pkt = this.paket[this.selectedPaketIndex];
            // Menambah data ke trackingList
            Vue.set(this.trackingList, this.nextDONumber, {
                nim: this.form.nim,
                nama: this.form.nama,
                ekspedisi: this.form.ekspedisi,
                total: pkt.harga,
                paket: pkt.kode
            });

            this.sequence++;
            this.form = { nim: '', nama: '', ekspedisi: '' };
            this.selectedPaketIndex = -1;
        }
    },
    watch: {
        // Watcher 1: Pantau ganti paket
        selectedPaketIndex(newVal) {
            if (newVal !== -1) console.log("User memilih paket: " + this.paket[newVal].kode);
        },
        // Watcher 2: Pantau jumlah pengiriman
        trackingList: {
            handler(val) { console.log("Total DO saat ini: " + Object.keys(val).length); },
            deep: true
        }
    }
});
