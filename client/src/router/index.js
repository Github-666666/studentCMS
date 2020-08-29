import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/student'
    },
    {
        path: '/student',
        name: 'Student',
        component: ()=>import('../views/Student')
    }
]

const router = new VueRouter({
    routes
})

export default router
