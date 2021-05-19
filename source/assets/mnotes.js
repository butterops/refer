var app = new Vue({
    el: '#app',
    data: {
        title: 'Minimal Notes',
        note: {
            text: '',
            date: ''
        },
        notes: [{
            text: 'Minimal Notes',
            date: new Date(Date.now()).toLocaleString()
        }]
    },
    methods: {
        addNote() {
            let {
                text, title, color
            } = this.note
            this.notes.push({
                text,
                date: new Date(Date.now()).toLocaleString(),
            })
            this.note.text = ''
        },
        removeNote(index) {
            this.$delete(this.notes, index)
        },

    },
    mounted() {
        if (localStorage.getItem('notes')) this.notes = JSON.parse(localStorage.getItem('notes'));
    },
    watch: {
        notes: {
            handler() {
                localStorage.setItem('notes', JSON.stringify(this.notes));
            },
            deep: true,
        },
    }
})