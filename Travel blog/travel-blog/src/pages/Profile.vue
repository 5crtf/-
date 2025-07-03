<template>
  <div class="profile-page">
    <h1>Профиль пользователя</h1>
    <div class="tabs">
      <button :class="{active: tab==='profile'}" @click="tab='profile'">Профиль</button>
      <button :class="{active: tab==='posts'}" @click="tab='posts'">Мои путешествия</button>
    </div>
    <div v-if="tab==='profile'">
      <ProfileForm />
    </div>
    <div v-else class="user-posts-block">
      <h2>Мои путешествия</h2>
      <div v-if="loading" class="loader">Загрузка...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="posts.length === 0" class="empty">У вас пока нет путешествий</div>
      <div v-else class="user-posts-list">
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
  </div>
</template>

<script setup lang="ts">
import ProfileForm from '../components/ui/ProfileForm.vue'
import PostCard from '../components/ui/PostCard.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiRequest } from '../api'

const apiUrl = 'https://travelblog.skillbox.cc'
const posts = ref<any[]>([])
const loading = ref(true)
const error = ref('')
const router = useRouter()
const tab = ref<'profile'|'posts'>('profile')

async function fetchUserPosts() {
  loading.value = true
  error.value = ''
  try {
    posts.value = await apiRequest('/posts?mine=1')
  } catch (e: any) {
    error.value = e.message || 'Ошибка загрузки истории путешествий'
  } finally {
    loading.value = false
  }
}

function goToPost(id: number) {
  router.push(`/post/${id}`)
}

onMounted(fetchUserPosts)
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1.5rem;
  margin: 2rem 0 2.5rem 0;
  justify-content: center;
}
.tabs button {
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-muted);
  cursor: pointer;
  padding: 0.5em 1.2em;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.tabs button.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
.user-posts-block {
  margin-top: 0;
}
.user-posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--gap);
  margin-top: 1.5rem;
}
.loader {
  text-align: center;
  color: var(--color-primary);
  font-size: 1.1rem;
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
