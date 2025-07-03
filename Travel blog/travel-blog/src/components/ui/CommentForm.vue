<template>
  <form class="comment-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">Ваше имя</label>
      <input id="name" v-model="name" type="text" maxlength="255" required />
    </div>
    <div class="form-group">
      <label for="comment">Комментарий</label>
      <textarea id="comment" v-model="comment" maxlength="600" required></textarea>
    </div>
    <button class="submit-btn" type="submit">Оставить отзыв</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const comment = ref('')

function onSubmit() {
  alert(`Комментарий отправлен!\nИмя: ${name.value}\nТекст: ${comment.value}`)
  name.value = ''
  comment.value = ''
}
</script>

<style scoped>
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-weight: 500;
  font-size: 1rem;
}
input, textarea {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 1rem;
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
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: var(--color-secondary);
}
</style> 