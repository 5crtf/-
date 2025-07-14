<template>
  <div class="create-post-page">
    <h1>Добавить моё путешествие</h1>
    <PostForm />
  </div>
</template>

<script setup lang="ts">
import PostForm from '../components/ui/PostForm.vue'
</script>

<style scoped>
.back-btn {
  background: transparent;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 18px;
  cursor: pointer;
  width: 145px;
  height: 51px;
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
.create-post-page {
  max-width: 900px;
  margin: 48px auto;
  padding: 32px 16px;
  background: none;
}
h1 {
  text-align: center;
  margin-bottom: 32px;
}
.form-group {
  margin-top: 32px;
}
</style> 