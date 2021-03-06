import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        components: {
          page: () => import('@/views/Home.vue')
        }
      },
      {
        path: 'home/create',
        name: 'home.create',
        components: {
          page: () => import('@/views/Home.vue'),
          modal: () => import('@/views/ModalTransaction.vue')
        }
      },
      {
        path: 'home/edit',
        name: 'home.edit',
        components: {
          page: () => import('@/views/Home.vue'),
          modal: () => import('@/views/ModalTransaction.vue')
        },
        beforeEnter: (to, from, next) => {
          if (to.name === 'home.edit') {
            store.set('transaction/modal@mode', 'edit')
          }
          next()
        }
      },
      {
        path: 'stats',
        name: 'stats',
        components: {
          page: () => import('@/views/Stats.vue')
        }
      },
      {
        path: 'activity',
        name: 'activity',
        components: {
          page: () => import('@/views/Activity.vue')
        }
      },
      {
        path: 'account',
        name: 'account',
        components: {
          page: () => import('@/views/Account.vue')
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    public: true,
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/install',
    name: 'install',
    public: true,
    component: () => import('@/views/NotStandalone.vue')
  }
]

export const publicRoutesNames = routes
  .filter(route => route.public)
  .map(route => route.name)

export default routes
