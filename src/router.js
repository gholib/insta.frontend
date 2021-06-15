import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

const router = new Router({
    base: '/',
    mode: 'history',
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
              {
                path: '/competitions',
                name: 'competitions',
                component: () => import('./views/competition/Competitions.vue')
              },
            ],
        },
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/login',
                name: 'login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/instagram/:link',
                name: 'instagram',
                component: () => import('./views/competition/Results.vue')
              },
              {
                path: '/projects/daler',
                name: 'daler',
                component: () => import('./views/projects/InstagramFollowing.vue')
              },
              {
                path: '/register',
                name: 'register',
                component: () => import('@/views/pages/Register.vue')
              },
              {
                path: '/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.beforeEach((to, from, next) => {
  if (!['login', 'instagram', 'register', 'daler'].includes(to.name) && !store.getters['auth/getToken']) next({ name: 'login' })
  else next()
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
