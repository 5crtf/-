<template>
  <header class="header-bg">
    <div class="container">
      <div class="header-left">
        <div class="logo">TravelBlog</div>
        <div class="header-slogan">Там, где мир начинается с путешествий</div>
      </div>
      <nav>
        <router-link to="/">Путешествия</router-link>
      </nav>
      <div class="actions">
        <router-link v-if="!isAuth" to="/login" class="btn">Войти</router-link>
        <router-link v-else to="/profile" class="profile-info">
          <span v-if="user.profile?.photo" class="avatar" :style="`background-image: url('https://travelblog.skillbox.cc${user.profile.photo}')`"></span>
          <span v-else class="avatar avatar-placeholder">{{ user.profile?.full_name?.[0] || '👤' }}</span>
          <span class="profile-name">{{ user.profile?.full_name }}</span>
        </router-link>
        <button v-if="isAuth" class="btn logout" @click="onLogout">Выйти</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

const isAuth = computed(() => !!user.token)

async function onLogout() {
  await user.logout()
  router.push('/login')
}
</script>

<style scoped>
.header-bg {
  width: 100vw;
  min-width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  background: url('/img/1. Основная страница (Первая).png') center/cover no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  height: 250px;
  min-height: 250px;
  margin-top: 0;
}
.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--gap);
  z-index: 2;
}
.header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.logo {
  font-size: 27px;
  font-weight: bold;
  color: var(--color-primary);
}
.header-slogan {
  margin-top: 8px;
  font-size: 22px;
  font-weight: 400;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
  letter-spacing: 0.5px;
}
nav {
  display: flex;
  gap: var(--gap);
}
nav a {
  color: var(--color-text-btn);
  text-decoration: none;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  margin-right: 8px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid var(--color-primary);
  transition: background 0.2s, color 0.2s, border 0.2s;
}
nav a.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: #fff;
}
nav a:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5em 1.2em;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn.logout {
  background: var(--color-muted);
}
.profile-info {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  color: #fff;
}
.avatar-placeholder {
  background: #bdbdbd;
}
.profile-name {
  font-size: 17px;
  font-weight: 500;
  color: var(--color-primary);
}
@media (max-width: 700px) {
  .container {
    flex-direction: column;
    gap: 8px;
    padding: 0 8px;
  }
  nav {
    gap: 12px;
  }
}
</style> 