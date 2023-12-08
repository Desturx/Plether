import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {guest:false, navbar: true, header:true}, // esto debería estar a "false"
      component: HomeView
    },
    {
      path: '/',
      name: 'favourites',
      meta: { guest: false, navbar: true, header: true},
      component: () => import('../views/FavouritesView.vue')
    },
    {
      path: '/playGame',
      name: 'playGame',
      meta: { guest: false, navbar: true, header: false},
      component: () => import('../views/PlayGameView.vue')
    },
    {
      path: '/',
      name: 'friends',
      meta: { guest: false, navbar: true, header: true},
      component: () => import('../views/FriendsView.vue')
    },
    {
      path: '/games/:id',
      name: 'games',
      meta: { guest: false, navbar: true, header: false},
      component: ()=> import('../views/GameView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {guest:true},
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {guest: true, navbar: false},
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {guest: true, navbar: false},
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {guest: false, navbar: true},
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.guest) {
    // COMPROBAR AQUI SI ESTÁ LOGUEADO, IS NO, AL LOGIN
    console.log(sessionStorage.logged)
    if (!sessionStorage.logged) {
      // intentar mandar petición al server con la cookie;
      const url = 'http://localhost:5000/api/users/auth'
      await axios
        .post(url, {}, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            //ha tenido exito y el token existe
            console.log('tiene login')
            sessionStorage.logged = true;
            console.log(sessionStorage)
            return next()
          }
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data._message)
        })

      return next({ path: '/login' })
    }
  }
  return next()
})




export default router
