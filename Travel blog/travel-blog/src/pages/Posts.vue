<template>
  <div class="posts-container">
    <div class="posts-header">
      <router-link v-if="isAuth" to="/create" class="add-btn">Добавить моё путешествие</router-link>
    </div>
    <div v-if="loading" class="loader">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="posts.length === 0" class="empty">Постов пока нет</div>
    <div v-else class="posts-list">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :description="post.excerpt || post.description || ''"
        :country="post.country || ''"
        :city="post.city || ''"
        :image="post.photo ? apiUrl + post.photo : ''"
        @click="goToPost(post.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PostCard from '../components/ui/PostCard.vue'
import { getPosts } from '../api'
import { useUserStore } from '../store/user'

const apiUrl = 'http://travelblog.skillbox.cc'
const user = useUserStore()
const isAuth = computed(() => !!user.token)
const router = useRouter()

const posts = ref<any[]>([])
const loading = ref(true)
const error = ref('')

async function fetchPosts() {
  loading.value = true
  error.value = ''
  try {
    posts.value = await getPosts()
  } catch (e: any) {
    error.value = e.message || 'Ошибка загрузки постов'
  } finally {
    loading.value = false
  }
}

function goToPost(id: number) {
  router.push(`/post/${id}`)
}

onMounted(fetchPosts)
</script>

<style scoped>
.posts-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 2rem 1rem;
}
.posts-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
}
.posts-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
}
.add-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.5em;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}
.add-btn:hover {
  background: var(--color-secondary);
}
.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--gap);
}
.post-card {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}
.post-img {
  background: #e0e7ef;
  height: 180px;
  width: 100%;
}
.post-info {
  padding: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.post-info h2 {
  font-size: 1.3rem;
  margin: 0 0 0.5em 0;
}
.desc {
  color: var(--color-muted);
  font-size: 1rem;
  margin-bottom: 1em;
}
.meta {
  font-size: 0.95rem;
  color: var(--color-text);
}
.loader {
  text-align: center;
  color: var(--color-primary);
  font-size: 1.2rem;
  margin: 2rem 0;
}
.error {
  color: #e74c3c;
  text-align: center;
  margin: 2rem 0;
}
.empty {
  color: var(--color-muted);
  text-align: center;
  margin: 2rem 0;
}
</style> 