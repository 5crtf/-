<template>
  <header class="header-bg">
    <div class="container">
      <div class="header-left">
        <div class="logo"><svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.5 25.5H1" stroke="white" stroke-linecap="round"/>
        <path d="M31.5 29.5H1.5" stroke="white" stroke-linecap="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.6633 1.26893L29 0C28.8616 0.467337 28.7241 0.923333 28.5871 1.36877C27.1769 5.95537 25.8239 9.42232 24.0856 12.622L19.7769 5.15908L19.1077 4C18.9657 4.43397 18.8248 4.85599 18.6845 5.26699C16.3394 12.1356 14.1519 15.9269 9.62277 21C9.3303 21.3276 9.02806 21.6605 8.71539 22H10.0689H17.5H18.7981H28.3453H29.5H39.3716H40.5L39.9773 21L29.6633 1.26893ZM27.7679 21H19.6083C21.3866 18.7736 22.8389 16.7314 24.0913 14.6319L27.7679 21ZM24.6695 13.6333L28.9226 21H38.8489L29.2431 2.62361C27.8404 7.05074 26.4574 10.4492 24.6695 13.6333ZM23.5166 13.6364C22.1099 16.0657 20.4466 18.3902 18.3239 21H10.9563C12.9517 18.7097 14.499 16.6257 15.8185 14.3417C17.1606 12.0187 18.2524 9.51391 19.3457 6.41227L23.5166 13.6364Z" fill="white"/>
        </svg>Travel</div>
        <div class="actions">
        <router-link v-if="!isAuth" to="/login" class="btn">Войти</router-link>
        <router-link v-else to="/profile" class="profile-info">
          <span v-if="user.profile?.photo" class="avatar" :style="`background-image: url('https://travelblog.skillbox.cc${user.profile.photo}')`"></span>
          <span class="profile-name">{{ user.profile?.full_name }}</span>
        </router-link>
        <button v-if="isAuth" class="btn logout" @click="onLogout">Выйти</button>
      </div>
      </div>
     <div class="header-slogan">
        {{ sloganText }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../store/user'
import { useRouter,useRoute } from 'vue-router'

const user = useUserStore()
const router = useRouter()
const route = useRoute() 

const isAuth = computed(() => !!user.token)

const sloganText = computed(() =>
  route.path === '/' ? 'Там, где мир начинается с путешествий' : 'Истории ваших путешествий'
)
async function onLogout() {
  await user.logout()
  router.push('/login')
}
</script>

<style scoped>
.header-bg {
  position: relative;
  left: 50%;
  right: 50%;
  width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
  background: url('/img/1. Основная страница (Первая).png') center/cover no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  min-height: 422px;
  margin-top: 0;
}
.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  height: 100%;
  padding: 0 var(--gap);
  z-index: 2;
}
.header-left {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 108px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  padding-bottom: 12px; 

}
.logo {
  font-size: 33.88px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.145em;
  color: #fff;
  display: flex;
  gap: 16px;
}
.header-slogan {
  font-weight: 700;
  font-size: 48px;
  line-height: 72px;
  text-transform: uppercase;
  color: #FFFFFF;
  text-align: center;
}
nav {
  display: flex;
  gap: var(--gap);
}
nav a {
  color: var(--color-text-btn);
  text-decoration: none;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  margin-right: 8px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid var(--color-primary);
  transition: background 0.2s, color 0.2s, border 0.2s;
}
nav a.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-secondary);
  border-color: var(--color-secondary);
  color: #fff;
}
nav a:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn {
  color: #fff;
  border: none;
  padding: 0.5em ;
  font-size: 16px;
  cursor: pointer;
}
.btn.logout {
  background: var(--color-muted);
}
.profile-info {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-color: #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  color: #fff;
}
.avatar-placeholder {
  background: #bdbdbd;
}
.profile-name {
  font-size: 17px;
  font-weight: 500;
  color: var(--color-primary);
}
.back-btn {
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-size: 18px;
  cursor: pointer;
  padding: 0 8px 0 0;
  transition: color 0.2s;
}
.back-btn:hover {
  color: var(--color-secondary);
}
@media (max-width: 700px) {
  .container {
    flex-direction: column;
    gap: 8px;
    padding: 0 8px;
  }
  nav {
    gap: 12px;
  }
}
</style> 