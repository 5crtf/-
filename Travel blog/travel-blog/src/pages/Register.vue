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
function goBack() {
  router.back()
}
</script>

<style scoped>
.back-btn {
  background: transparent;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 18px;
  cursor: pointer;
  width: 145px;
  height: 45px;
  margin: 32px 0 0 0;
  padding: 0;
  transition: color 0.2s, border 0.2s;
  display: block;
  border-radius: 8px;
}
.back-btn:hover {
  color: #fff;
  background: var(--color-secondary);
}
.auth-page {
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