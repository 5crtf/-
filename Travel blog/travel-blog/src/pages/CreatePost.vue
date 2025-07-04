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
.create-post-page {
  max-width: 700px;
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