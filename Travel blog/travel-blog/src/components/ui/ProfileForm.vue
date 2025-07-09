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
    <div class="form-actions">
      <button class="back-btn" type="button" @click="goBack">← Назад</button>
      <button class="cancel-btn" type="button" @click="onCancel">Отмена</button>
      <button class="submit-btn" type="submit">Сохранить</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { updateProfile } from '../../api'

const user = useUserStore()
const fullname = ref(user.profile?.full_name || '')
const city = ref(user.profile?.city || '')
const about = ref(user.profile?.bio || '')
const photo = ref<File|null>(null)
const photoUrl = ref(user.profile?.photo ? 'https://travelblog.skillbox.cc' + user.profile.photo : '')
const password = ref('')
const error = ref('')
const router = useRouter()

watch(() => user.profile, (val) => {
  fullname.value = val?.full_name || ''
  city.value = val?.city || ''
  about.value = val?.bio || ''
  photoUrl.value = val?.photo ? 'https://travelblog.skillbox.cc' + val.photo : ''
})

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

function goBack() {
  router.back()
}

function onCancel() {
  if (typeof window !== 'undefined') {
    const evt = new CustomEvent('profile-cancel')
    window.dispatchEvent(evt)
  }
}

async function onSubmit() {
  error.value = ''
  if (!fullname.value) {
    error.value = 'Ф. И. О. обязательно'
    return
  }
  try {
    await updateProfile({
      full_name: fullname.value,
      city: city.value,
      bio: about.value,
      photo: photo.value || undefined
    })
    await user.fetchProfile()
    if (typeof window !== 'undefined') {
      const evt = new CustomEvent('profile-saved')
      window.dispatchEvent(evt)
    }
  } catch (e: any) {
    error.value = e.message || 'Ошибка сохранения профиля'
  }
}
</script>

<style scoped>
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 20px ;
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
  width: 120px;
  height: 45px;
  padding: 0;
  transition: color 0.2s, border 0.2s;
  display: block;
  border-radius: 8px;
}
.back-btn:hover {
  color: #fff;
  background: var(--color-secondary);
}

.cancel-btn {
  background: #e0e7ef;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1.5em;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #d1d5db;
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
.form-actions-center {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style> 