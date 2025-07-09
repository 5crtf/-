<template>
  <div class="add-comment-page">
    <h1>Добавить отзыв</h1>
    <form class="comment-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Ваше имя</label>
        <input id="name" v-model="name" type="text" maxlength="255" required />
      </div>
      <div class="form-group">
        <label for="comment">Комментарий</label>
        <textarea id="comment" v-model="comment" maxlength="600" required></textarea>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="form-actions">
        <button class="back-btn" type="button" @click="goBack">← Назад</button>
        <button class="submit-btn" type="submit" :disabled="loading">Оставить отзыв</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addComment } from '../api'

const route = useRoute()
const router = useRouter()
const name = ref('')
const comment = ref('')
const error = ref('')
const loading = ref(false)

function goBack() {
  router.back()
}

async function onSubmit() {
  error.value = ''
  if (!name.value || !comment.value) {
    error.value = 'Заполните все поля'
    return
  }
  loading.value = true
  try {
    await addComment(Number(route.params.id), { full_name: name.value, comment: comment.value })
    router.push(`/post/${route.params.id}`)
  } catch (e: any) {
    error.value = e.message || 'Ошибка добавления отзыва'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.add-comment-page {
  max-width: 500px;
  margin: 48px auto;
  padding: 32px 16px;
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
h1 {
  text-align: center;
  margin-bottom: 32px;
}
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-weight: 500;
  font-size: 17.6px;
}
input, textarea {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 17.6px;
  font-family: inherit;
  resize: none;
}
input:focus, textarea:focus {
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
  align-self: flex-start;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: var(--color-secondary);
}
.error {
  color: #e74c3c;
  font-size: 17.6px;
}
.form-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  height: 50px;
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