<template>
  <div>
    <div class="post-detail-container" v-if="!loading && !error">
      <div class="post-main">
        <div class="post-image" :style="post.photo ? `background-image: url(${apiUrl + post.photo})` : ''"></div>
        <div class="post-content">
          <h1>{{ post.title }}</h1>
          <div class="meta">Страна: <b>{{ post.country }}</b> | Город: <b>{{ post.city }}</b></div>
          <div class="author" v-if="post.user">
            <div class="avatar" :style="post.user.photo ? `background-image: url(${apiUrl + post.user.photo})` : ''"></div>
            <div>
              <div class="name">{{ post.user.full_name }}</div>
              <div class="city">{{ post.user.city }}</div>
              <div class="about">{{ post.user.bio }}</div>
            </div>
          </div>
          <div class="description">
            {{ post.description }}
          </div>
        </div>
      </div>
      <div class="comments-block">
        <h2>Отзывы</h2>
        <div class="comments-list">
          <div class="comment" v-for="(comment, idx) in post.comments || []" :key="idx">
            <div class="comment-author">{{ comment.author_name }}</div>
            <div class="comment-date">{{ formatDate(comment.created_at) }}</div>
            <div class="comment-text">{{ comment.comment }}</div>
          </div>
          <div v-if="(post.comments || []).length === 0" class="empty">Отзывов пока нет</div>
          <router-link v-if="isAuth" class="add-comment-btn" :to="`/post/${route.params.id}/add-comment`">Ваше впечатление об этом месте</router-link>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="loader">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <button class="back-btn" @click="goBack">← Назад</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPost, addComment } from '../api'
import { useUserStore } from '../store/user'
import CommentForm from '../components/ui/CommentForm.vue'

const apiUrl = 'http://travelblog.skillbox.cc'
const route = useRoute()
const router = useRouter()
const user = useUserStore()
const isAuth = computed(() => !!user.token)

const post = ref<any>({})
const loading = ref(true)
const error = ref('')
const showForm = ref(false)

async function fetchPost() {
  loading.value = true
  error.value = ''
  try {
    post.value = await getPost(Number(route.params.id))
  } catch (e: any) {
    error.value = e.message || 'Ошибка загрузки поста'
  } finally {
    loading.value = false
  }
}

async function addCommentHandler({ full_name, comment }: { full_name: string; comment: string }) {
  try {
    await addComment(Number(route.params.id), { full_name, comment })
    showForm.value = false
    await fetchPost()
  } catch (e: any) {
    alert(e.message || 'Ошибка добавления комментария')
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString()
}

function goBack() {
  router.back()
}

onMounted(fetchPost)
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
.post-detail-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 32px 16px;
}
.post-main {
  display: flex;
  gap: 32px;
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 20px;
  overflow: hidden;
}
.post-image {
  width: 340px;
  background: #e0e7ef;
  flex-shrink: 1;
  background-size: 340px 230px;
  background-repeat: no-repeat;
}
.post-content {
  flex: 1;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 19px;
}
.post-content h1 {
  font-size: 32px;
  margin: 0;
}
.meta {
  color: var(--color-muted);
  font-size: 17.6px;
}
.author {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
}
.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #d1d5db;
}
.name {
  font-weight: 600;
  font-size: 1.1rem;
}
.city {
  color: var(--color-muted);
  font-size: 0.95rem;
}
.about {
  font-size: 0.95rem;
  color: var(--color-text);
}
.description {
  font-size: 1.1rem;
  margin-top: 1rem;
}
.comments-block {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 32px 24px;
}
.comments-block h2 {
  margin-top: 0;
}
.add-comment-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 24px;
  margin: auto;
  cursor: pointer;
  transition: background 0.2s;
}
.add-comment-btn:hover {
  background: var(--color-secondary);
}
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.comment {
  background: #f7f8fa;
  border-radius: 8px;
  padding: 16px 19px;
}
.comment-author {
  font-weight: 600;
  font-size: 17.6px;
  margin-bottom: 0.2rem;
  text-align: left;
}
.comment-date {
  color: var(--color-muted);
  font-size: 15.2px;
  margin-bottom: 0.5rem;
  text-align: left;
}
.comment-text {
  font-size: 15.2px;
  color: var(--color-text);
  text-align: left;
}
@media (max-width: 700px) {
  .post-main {
    flex-direction: column;
    align-items: center;
  }
  .post-image {
    width: 100%;
    height: 220px;
  }
  .post-content {
    padding: 19px 8px;
  }
}
</style> 