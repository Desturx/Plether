import { reactive, watch } from 'vue'



 const store = reactive({
    username: '',
    mail: '',
    id: '',
    setUsername(value) {
        this.username = value
    },
    setMail(value) {
        this.mail = value
    },
    setId(value) {
        this.id = value
    }
})

let savedStore = localStorage.getItem('store')
if (savedStore) {
   Object.assign(store, JSON.parse(savedStore))
}

watch(store, (newstore) => {
    localStorage.setItem('store', JSON.stringify(newstore))
}, {deep: true})

export { store }