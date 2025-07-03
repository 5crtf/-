<template>
  <div class="auth-page">
    <h1>Вход</h1>
    <AuthForm :onSubmit="onLogin" />
    <div v-if="user.error" class="error">{{ user.error }}</div>
    <router-link to="/register" class="register-link">Нет аккаунта? Зарегистрироваться</router-link>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '../components/ui/AuthForm.vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

async function onLogin(data: { email: string; password: string }) {
  const ok = await user.login(data.email, data.password)
  if (ok) router.push('/')
}
</script>

<style scoped>
.auth-page {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem 1rem;
  background: none;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}
.register-link {
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: var(--color-primary);
  text-decoration: underline;
  font-size: 1.05rem;
  transition: color 0.2s;
}
.register-link:hover {
  color: var(--color-secondary);
}
</style> 