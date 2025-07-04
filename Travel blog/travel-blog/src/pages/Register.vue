<template>
  <div class="auth-page">
    <h1>Регистрация</h1>
    <AuthForm :isRegister="true" :onSubmit="onRegister" />
    <div v-if="user.error" class="error">{{ user.error }}</div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '../components/ui/AuthForm.vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

async function onRegister(data: { email: string; password: string }) {
  const ok = await user.register(data.email, data.password)
  if (ok) router.push('/')
}
</script>

<style scoped>
.auth-page {
  max-width: 500px;
  margin: 48px auto;
  padding: 32px 16px;
  background: none;
}
h1 {
  text-align: center;
  margin-bottom: 32px;
}
.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 16px;
}
</style> 