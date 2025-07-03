<template>
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
      <button class="add-comment-btn" @click="showForm = !showForm" v-if="!showForm && isAuth">Ваше впечатление об этом месте</button>
      <CommentForm v-if="showForm && isAuth" @submit-comment="addComment" />
      <div class="comments-list">
        <div class="comment" v-for="comment in post.comments || []" :key="comment.id">
          <div class="comment-header">
            <span class="comment-author">{{ comment.name }}</span>
            <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
          </div>
          <div class="comment-text">{{ comment.text }}</div>
        </div>
        <div v-if="(post.comments || []).length === 0" class="empty">Отзывов пока нет</div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loader">Загрузка...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPost, addComment } from '../api'
import { useUserStore } from '../store/user'
import CommentForm from '../components/ui/CommentForm.vue'

const apiUrl = 'http://travelblog.skillbox.cc'
const route = useRoute()
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

async function addCommentHandler({ name, comment }: { name: string; comment: string }) {
  try {
    await addComment(Number(route.params.id), { name, text: comment })
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

onMounted(fetchPost)
</script>

<style scoped>
.post-detail-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 2rem 1rem;
}
.post-main {
  display: flex;
  gap: 2rem;
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-bottom: 2rem;
  overflow: hidden;
}
.post-image {
  width: 340px;
  height: 340px;
  background: #e0e7ef;
  flex-shrink: 0;
}
.post-content {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.post-content h1 {
  font-size: 2rem;
  margin: 0;
}
.meta {
  color: var(--color-muted);
  font-size: 1.1rem;
}
.author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
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
  padding: 2rem 1.5rem;
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
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}
.add-comment-btn:hover {
  background: var(--color-secondary);
}
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.comment {
  background: #f7f8fa;
  border-radius: 8px;
  padding: 1rem 1.2rem;
}
.comment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.comment-author {
  font-weight: 600;
}
.comment-date {
  color: var(--color-muted);
  font-size: 0.95rem;
}
.comment-text {
  font-size: 1rem;
}
@media (max-width: 900px) {
  .post-main {
    flex-direction: column;
    align-items: center;
  }
  .post-image {
    width: 100%;
    height: 220px;
  }
  .post-content {
    padding: 1.2rem 0.5rem;
  }
}
</style> 