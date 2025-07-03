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
  margin: 3rem auto;
  padding: 2rem 1rem;
  background: none;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style> 