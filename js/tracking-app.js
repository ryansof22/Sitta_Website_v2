new Vue({
    el: '#app',
    data: {
        paketList: [
            { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
            { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
        ],
        tracking: JSON.parse(localStorage.getItem('sitta_tracking')) || {
            "DO2025-001": { nim: "123456789", nama: "Rina Wulandari", status: "Dalam Perjalanan", total: 120000 }
        },
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
    methods: {
        simpanDO() {
            const paket = this.paketList[this.selectedPaketIndex];
            const newId = this.generatedDoNumber;
            
            this.$set(this.tracking, newId, {
                nim: this.form.nim,
                nama: this.form.nama,
                status: "Diproses",
                total: paket.harga
            });
            
            alert("DO Berhasil Dibuat: " + newId);
            this.form = { nim: '', nama: '' };
            this.selectedPaketIndex = null;
        }
    }
    watch: {
        tracking: {
            handler(newData) {
                localStorage.setItem('sitta_tracking', JSON.stringify(newData));
                console.log("Database Tracking diperbarui");
            },
            deep: true
        }
    },
});
