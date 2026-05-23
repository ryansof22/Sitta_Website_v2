new Vue({
    el: '#app',
    data: {
        pengirimanList: [
            { kode: "REG", nama: "Reguler (3-5 hari)" },
            { kode: "EXP", nama: "Ekspres (1-2 hari)" }
        ],
        paket: [
            { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
            { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
        ],
        trackingList: {}, // Menyimpan data DO
        form: { nim: '', nama: '', ekspedisi: '' },
        selectedPaketIndex: -1,
        sequence: 1
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
