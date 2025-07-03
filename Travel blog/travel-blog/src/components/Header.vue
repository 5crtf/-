<template>
  <header>
    <div class="container">
      <div class="logo">TravelBlog</div>
      <nav>
        <router-link to="/">Путешествия</router-link>
        <router-link to="/create" v-if="isAuth">Добавить моё путешествие</router-link>
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
header {
  background: var(--color-header);
  height: var(--header-height);
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
}
.logo {
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-primary);
}
nav {
  display: flex;
  gap: var(--gap);
}
nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.2s;
}
nav a.router-link-exact-active {
  color: var(--color-primary);
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
  font-size: 1rem;
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
  font-size: 1.2rem;
  color: #fff;
}
.avatar-placeholder {
  background: #bdbdbd;
}
.profile-name {
  font-size: 1.05rem;
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