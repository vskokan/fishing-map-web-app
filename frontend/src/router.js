import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/views/Home'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        { 
            path: '/', 
            redirect: '/map' 
        },
        {
            path: '/map',
            component: () => import('./views/Map.vue')
        },
        {
            path: '/test',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/fish',
            component: () => import('./views/Fish.vue')
        },
        {
            path: '/profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/partners',
            component: () => import('./views/Partners.vue')
        },
        {
            path: '/reviews',
            component: () => import('./views/Reviews.vue')
        },
        {
            path: '/database',
            component: () => import('./views/Database.vue'),
            children: [
                {
                    path: 'fishes',
                    component: () => import('./views/Tables/Fishes.vue')
                }, 
                {
                    path: 'methods',
                    component: () => import('./views/Tables/Methods.vue')
                },
                {
                    path: 'baits',
                    component: () => import('./views/Tables/Baits.vue')
                },
                {
                    path: 'users',
                    component: () => import('./views/Tables/Users.vue')
                },
                {
                    path: 'reviews',
                    component: () => import('./views/Tables/Reviews.vue')
                },
                {
                    path: 'facts',
                    component: () => import('./views/Tables/Facts.vue')
                },
                {
                    path: 'cities',
                    component: () => import('./views/Tables/Places.vue')
                },
                {
                    path: 'districts',
                    component: () => import('./views/Tables/Districts.vue')
                },
                {
                    path: 'partners',
                    component: () => import('./views/Tables/Partners.vue')
                },
                {
                    path: 'departments',
                    component: () => import('./views/Tables/Departments.vue')
                },
                {
                    path: 'discounts',
                    component: () => import('./views/Tables/Discounts.vue')
                },
            ],
            redirect: '/database/fishes'
        },
        { 
            path: '/404', 
            component: () => import('./views/404.vue'), 
        }, 
        { 
            path: '/login', 
            component: () => import('./views/Login.vue'), 
        }, 
        { 
            path: '/reg', 
            component: () => import('./views/SignUp.vue'), 
        },
        { 
            path: '*', 
            redirect: '/404' 
        },
    ]
})