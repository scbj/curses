const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'new',
        name: 'newTransaction',
        component: () => import('@/views/ModalTransaction.vue')
      }
    ]
  },
  {
    public: true,
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    public: true,
    path: '/install',
    name: 'install',
    component: () => import('@/views/NotStandalone.vue')
  }
]

export const publicRoutesNames = routes
  .filter(route => route.public)
  .map(route => route.name)

export default routes
