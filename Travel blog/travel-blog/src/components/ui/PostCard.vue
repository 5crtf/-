<template>
  <div class="post-card">
    <div class="post-img" :style="image ? `background-image: url(${image})` : ''"></div>
    <div class="post-info">
      <h2>{{ title }}</h2>
      <p class="desc">{{ description }}</p>
      <div class="meta"><b>{{ country }}</b> <b>{{ city }}</b></div>
       <a class="more-link" @click="openCard">Подробнее</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  country: string
  city: string
  image?: string
}>()

const emit = defineEmits(['open'])

function openCard() {
  emit('open')
}
</script>

<style scoped>
.post-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 320px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  font-size: 20.8px;
}
.post-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
}
.post-img {
  background: #e0e7ef;
  background-size: cover;
  background-position: center;
  height: 180px;
  width: 100%;
}
.post-info {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.post-info h2 {
  font-size: 16px;
  margin: 0 0 0.5em 0;
}
.desc {
  color: var(--color-muted);
  font-size: 1rem;
  margin-bottom: 1em;
}
.meta {
  font-size: 15.2px;
  color: var(--color-text);
}

.meta {
  font-size: 15.2px;
  color: var(--color-text);
}
.more-link {
  color:#FFA902;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  transition: color 0.2s;
}
.more-link:hover {
  color: #FFA902;
   text-decoration: none;
}
</style> 