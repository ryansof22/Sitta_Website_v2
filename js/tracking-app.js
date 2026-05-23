new Vue({
    el: '#app',
    data: {
        paketList: [
            { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
            { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
        ],
        // Ambil riwayat tracking dari localStorage
        tracking: JSON.parse(localStorage.getItem('sitta_tracking_db')) || {},
        form: { nim: '', nama: '' },
        selectedPaketIndex: null
    },
    computed: {
        generatedDoNumber() {
            const year = new Date().getFullYear();
            const count = Object.keys(this.tracking).length + 1;
            return `DO${year}-${count.toString().padStart(3, '0')}`;
        }
    },
    watch: {
        // Simpan setiap kali ada DO baru
        tracking: {
            handler(newVal) {
                localStorage.setItem('sitta_tracking_db', JSON.stringify(newVal));
            },
            deep: true
        }
    },
    methods: {
        simpanDO() {
            if (this.selectedPaketIndex === null) return alert("Pilih paket terlebih dahulu");
            
            const paket = this.paketList[this.selectedPaketIndex];
            const newId = this.generatedDoNumber;
            
            this.$set(this.tracking, newId, {
                nim: this.form.nim,
                nama: this.form.nama,
                status: "Diproses",
                total: paket.harga
            });
            
            alert("Delivery Order " + newId + " Berhasil Dibuat!");
            this.form = { nim: '', nama: '' };
            this.selectedPaketIndex = null;
        }
    }
});
