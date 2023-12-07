import { reactive, watch } from 'vue'



 const store = reactive({
    username: '',
    mail: '',
    id: '',
    friendRequests: [],
    setUsername(value) {
        this.username = value
    },
    setMail(value) {
        this.mail = value
    },
    setId(value) {
        this.id = value
    },
    addNewFriendRequest(value) {
        this.friendRequests.push(value)
    }
})

let savedStore = localStorage.getItem('store')
if (savedStore) {
   Object.assign(store, JSON.parse(savedStore))
}

watch(store, (newstore) => {
    console.log()
    localStorage.setItem('store', JSON.stringify(newstore))
}, {deep: true})

export { store }