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
        <router-link v-else to="/profile" class="profile-icon">
          <span class="icon">{{ user.profile?.full_name?.[0] || '👤' }}</span>
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
.profile-icon {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
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