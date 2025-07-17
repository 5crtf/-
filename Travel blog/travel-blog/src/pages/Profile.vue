<template>
  <div class="profile-page">
    <div class="tabs">
      <button :class="{active: tab==='profile'}" @click="tab='profile'">Профиль</button>
      <button :class="{active: tab==='posts'}" @click="tab='posts'">Мои путешествия</button>
    </div>
    <div v-if="tab==='profile'">
      <div v-if="!showEdit" class="profile-info-block">
        <div class="profile-avatar" v-if="user.profile?.photo">
          <img :src="apiUrl + user.profile.photo" alt="avatar" />
        </div>
        <div class="profile-avatar profile-avatar-placeholder" v-else>
          {{ user.profile?.full_name?.[0] || '👤' }}
        </div>
        <div class="profile-fields">
          <div class="profile-name">{{ user.profile?.full_name || 'Имя не указано' }}</div>
          <div class="profile-city">Город: {{ user.profile?.city || 'Не указано' }}</div>
          <div class="profile-bio">О себе: {{ user.profile?.bio || 'Нет описания' }}</div>
        </div>
        <button class="edit-btn" @click="showEdit = true">Редактировать профиль</button>
      </div>
      <div v-else>
        <ProfileForm />
      </div>
      <button class="back-btn" @click="goBack">← Назад</button>
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
          :country="post.country || post.country_name || (post.location && post.location.country) || ''"
          :city="post.city || (post.location && post.location.city) || ''"
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
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiRequest } from '../api'
import { useUserStore } from '../store/user'

const apiUrl = 'https://travelblog.skillbox.cc'
const posts = ref<any[]>([])
const loading = ref(true)
const error = ref('')
const router = useRouter()
const tab = ref<'profile'|'posts'>('profile')
const showEdit = ref(false)
const user = useUserStore()

function goBack() {
  router.back()
}

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

function handleProfileFormEvents() {
  const closeEdit = () => { showEdit.value = false }
  window.addEventListener('profile-saved', closeEdit)
  window.addEventListener('profile-cancel', closeEdit)
  onUnmounted(() => {
    window.removeEventListener('profile-saved', closeEdit)
    window.removeEventListener('profile-cancel', closeEdit)
  })
}

onMounted(() => {
  fetchUserPosts()
  handleProfileFormEvents()
})
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.profile-info-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 32px 40px;
  margin-bottom: 32px;
}
.profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background: #e0e7ef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #888;
}
.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-avatar-placeholder {
  background: #e0e7ef;
}
.profile-fields {
  text-align: center;
}
.profile-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5em;
}
.profile-city, .profile-bio {
  font-size: 1rem;
  color: var(--color-muted);
  margin-bottom: 0.3em;
}
.edit-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.5em;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: var(--color-secondary);
}
.back-btn {
  background: transparent;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 18px;
  cursor: pointer;
  width: 145px;
  height: 45px;
  margin: 32px 0 32px 0;
  padding: 0;
  transition: color 0.2s, border 0.2s;
  display: block;
  border-radius: 8px;
}
.back-btn:hover {
  color: #fff;
  background: var(--color-secondary);
}
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
.profile {
  gap: 24px;
  margin: 32px 0 40px 0;
}
.profile-info {
  font-size: 17.6px;
}
.profile-actions {
  margin-top: 24px;
}
.profile-posts {
  font-size: 17.6px;
  margin: 32px 0;
}
.profile-comments {
  margin: 32px 0;
}
.profile-favorites {
  margin: 32px 0;
}
</style>
