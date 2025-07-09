<template>
  <form class="post-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="title">Заголовок</label>
      <input id="title" v-model="title" type="text" maxlength="255" required />
    </div>
    <div class="form-group">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description" maxlength="2000" required></textarea>
    </div>
    <div class="form-group">
      <label for="image">Фотография (JPEG/PNG)</label>
      <input id="image" type="file" accept="image/jpeg,image/png" @change="onFileChange" required />
      <div v-if="imageUrl" class="img-preview">
        <img :src="imageUrl" alt="preview" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="country">Страна</label>
        <input id="country" v-model="country" type="text" maxlength="255" required />
      </div>
      <div class="form-group">
        <label for="city">Город</label>
        <input id="city" v-model="city" type="text" maxlength="255" required />
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loader">Публикация...</div>
    <div class="form-actions">
      <button class="back-btn" type="button" @click="goBack">← Назад</button>
      <button class="submit-btn" type="submit" :disabled="loading">Опубликовать</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createPost } from '../../api'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const country = ref('')
const city = ref('')
const image = ref<File|null>(null)
const imageUrl = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    error.value = 'Только JPEG или PNG'
    return
  }
  image.value = file
  imageUrl.value = URL.createObjectURL(file)
}

function goBack() {
  router.back()
}

async function onSubmit() {
  error.value = ''
  if (!title.value || !description.value || !country.value || !city.value || !image.value) {
    error.value = 'Заполните все поля'
    return
  }
  loading.value = true
  try {
    await createPost({
      title: title.value,
      description: description.value,
      country: country.value,
      city: city.value,
      photo: image.value,
    })
    title.value = ''
    description.value = ''
    country.value = ''
    city.value = ''
    image.value = null
    imageUrl.value = ''
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Ошибка публикации'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 32px 40px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 19px;
  flex: 1;
}
.form-row {
  display: flex;
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
.img-preview {
  margin-top: 8px;
}
.img-preview img {
  max-width: 180px;
  max-height: 120px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.submit-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 11px 24px;
  font-size: 17.6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: var(--color-secondary);
}
.error {
  color: #e74c3c;
  font-size: 16px;
  margin-top: -8px;
}
.loader {
  text-align: center;
  color: var(--color-primary);
  font-size: 17.6px;
  margin-bottom: 16px;
}
.form-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}
.back-btn {
  background: transparent;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 18px;
  cursor: pointer;
  width: 145px;
  height: 50px;
  padding: 0;
  transition: color 0.2s, border 0.2s;
  display: block;
  border-radius: 8px;
}
.back-btn:hover {
  color: #fff;
  background: var(--color-secondary);
}
@media (max-width: 700px) {
  .form-row {
    flex-direction: column;
    gap: 8px;
  }
  .post-form {
    padding: 19px 8px;
  }
}
</style> 