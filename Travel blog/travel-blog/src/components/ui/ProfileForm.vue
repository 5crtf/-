<template>
  <form class="profile-form" @submit.prevent="onSubmit">
    <div class="form-row">
      <div class="form-group">
        <label for="fullname">Ф. И. О.</label>
        <input id="fullname" v-model="fullname" type="text" required />
      </div>
      <div class="form-group">
        <label for="city">Город</label>
        <input id="city" v-model="city" type="text" />
      </div>
    </div>
    <div class="form-group">
      <label for="about">Краткое описание</label>
      <textarea id="about" v-model="about" maxlength="300"></textarea>
    </div>
    <div class="form-group">
      <label for="photo">Фотография</label>
      <input id="photo" type="file" accept="image/jpeg,image/png" @change="onFileChange" />
      <div v-if="photoUrl" class="img-preview">
        <img :src="photoUrl" alt="avatar" />
      </div>
    </div>
    <div class="form-group">
      <label for="password">Новый пароль</label>
      <input id="password" v-model="password" type="password" minlength="6" />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <button class="submit-btn" type="submit">Сохранить</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fullname = ref('')
const city = ref('')
const about = ref('')
const photo = ref<File|null>(null)
const photoUrl = ref('')
const password = ref('')
const error = ref('')

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    error.value = 'Только JPEG или PNG'
    return
  }
  photo.value = file
  photoUrl.value = URL.createObjectURL(file)
}

function onSubmit() {
  error.value = ''
  if (!fullname.value) {
    error.value = 'Ф. И. О. обязательно'
    return
  }
  // Здесь будет отправка данных через API
  alert('Профиль сохранён!')
}
</script>

<style scoped>
.profile-form {
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
.form-row {
  display: flex;
  gap: 19px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
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
  max-width: 80px;
  max-height: 80px;
  border-radius: 50%;
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
  margin-top: 8px;
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
@media (max-width: 700px) {
  .form-row {
    flex-direction: column;
    gap: 8px;
  }
  .profile-form {
    padding: 19px 8px;
  }
}
</style> 