const API_URL = 'https://travelblog.skillbox.cc/api'

function getToken() {
  return localStorage.getItem('token')
}

export async function apiRequest(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers)
  if (getToken()) {
    headers.set('Authorization', `Bearer ${getToken()}`)
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return res.json()
}

// Авторизация
export async function login(email: string, password: string) {
  return apiRequest('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
}

// Регистрация
export async function register(email: string, password: string) {
  return apiRequest('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
}

// Получить список постов
export async function getPosts() {
  return apiRequest('/posts')
}

// Получить пост по id
export async function getPost(id: number) {
  return apiRequest(`/posts/${id}`)
}

// Создать пост
export async function createPost(data: { title: string; description: string; country: string; city: string; photo: File }) {
  const form = new FormData()
  form.append('title', data.title)
  form.append('description', data.description)
  form.append('country', data.country)
  form.append('city', data.city)
  form.append('photo', data.photo)
  return apiRequest('/posts', {
    method: 'POST',
    body: form
  })
}

// Получить профиль
export async function getProfile() {
  return apiRequest('/user')
}

// Обновить профиль
export async function updateProfile(data: { full_name: string; city?: string; bio?: string; photo?: File }) {
  const form = new FormData()
  form.append('full_name', data.full_name)
  if (data.city) form.append('city', data.city)
  if (data.bio) form.append('bio', data.bio)
  if (data.photo) form.append('photo', data.photo)
  return apiRequest('/user', {
    method: 'POST',
    body: form
  })
}

// Сменить пароль
export async function changePassword(password: string) {
  return apiRequest('/user/password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
}

// Добавить комментарий к посту
export async function addComment(postId: number, data: { full_name: string; comment: string }) {
  return apiRequest(`/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name: data.full_name, comment: data.comment })
  })
}

// Выход
export async function logout() {
  return apiRequest('/logout')
} 