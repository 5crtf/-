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
import { ref, defineEmits } from 'vue'

const name = ref('')
const comment = ref('')

const emit = defineEmits(['submit-comment'])

function onSubmit() {
  emit('submit-comment', { full_name: name.value, comment: comment.value })
  name.value = ''
  comment.value = ''
}
</script>

<style scoped>
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-bottom: 32px;
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
input, textarea {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 16px;
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
  font-size: 16px;
}
</style> 