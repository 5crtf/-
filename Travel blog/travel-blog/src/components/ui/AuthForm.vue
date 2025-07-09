<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" required />
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input id="password" v-model="password" type="password" required minlength="6" />
    </div>
    <div v-if="isRegister" class="form-group">
      <label for="confirm">Подтверждение пароля</label>
      <input id="confirm" v-model="confirm" type="password" required minlength="6" />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="isRegister" class="form-actions">
      <button class="back-btn" type="button" @click="goBack">← Назад</button>
      <button class="submit-btn" type="submit">Зарегистрироваться</button>
    </div>
    <button v-else class="submit-btn" type="submit">Войти</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isRegister?: boolean
  onSubmit?: (data: { email: string; password: string }) => void
}>()

const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const router = useRouter()

function handleSubmit() {
  error.value = ''
  if (!email.value.match(/^\S+@\S+\.\S+$/)) {
    error.value = 'Введите корректный email'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Пароль должен быть не менее 6 символов'
    return
  }
  if (props.isRegister && password.value !== confirm.value) {
    error.value = 'Пароли не совпадают'
    return
  }
  props.onSubmit?.({ email: email.value, password: password.value })
}
function goBack() {
  router.back()
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 32px 40px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-weight: 500;
  font-size: 16px;
}
input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 16px;
  font-family: inherit;
}
input:focus {
  outline: 2px solid var(--color-primary);
  border-color: var(--color-primary);
}
.submit-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.5em;
  font-size: 17.6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: var(--color-secondary);
}

.error {
  color: #e74c3c;
  font-size: 16px;
  margin-top: -8px;
}
.form-actions {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 8px;
}
.back-btn {
  background: transparent;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 18px;
  cursor: pointer;
  width: 145px;
  height: 45px;
  padding: 0;
  transition: color 0.2s, border 0.2s;
  display: block;
  border-radius: 8px;
}
.back-btn:hover {
  color: #fff;
  background: var(--color-secondary);
}
</style> 