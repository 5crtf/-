import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Posts', component: () => import('../pages/Posts.vue') },
  { path: '/login', name: 'Login', component: () => import('../pages/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../pages/Register.vue') },
  { path: '/post/:id', name: 'PostDetail', component: () => import('../pages/PostDetail.vue') },
  { path: '/create', name: 'CreatePost', component: () => import('../pages/CreatePost.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../pages/Profile.vue') },
  { path: '/post/:id/add-comment', name: 'AddComment', component: () => import('../pages/AddComment.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 