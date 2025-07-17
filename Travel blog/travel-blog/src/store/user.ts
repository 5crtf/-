import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, getProfile, logout as apiLogout } from '../api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    profile: null as null | {
      id: number
      full_name: string
      city?: string
      country?: string
      bio?: string
      photo?: string
    },
    loading: false,
    error: '' as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    removeToken() {
      this.token = ''
      localStorage.removeItem('token')
    },
    async login(email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await apiLogin(email, password)
        this.setToken(res.access_token || res.token)
        await this.fetchProfile()
        return true
      } catch (e: any) {
        this.error = 'Неверный email или пароль'
        return false
      } finally {
        this.loading = false
      }
    },
    async register(email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await apiRegister(email, password)
        this.setToken(res.access_token || res.token)
        await this.fetchProfile()
        return true
      } catch (e: any) {
        this.error = 'Этот email уже зарегистрирован'
        return false
      } finally {
        this.loading = false
      }
    },
    async fetchProfile() {
      this.loading = true
      this.error = ''
      try {
        this.profile = await getProfile()
      } catch (e: any) {
        this.error = 'Ошибка профиля'
      } finally {
        this.loading = false
      }
    },
    async logout() {
      this.loading = true
      try {
        await apiLogout()
      } catch {}
      this.removeToken()
      this.profile = null
    },
  },
}) 