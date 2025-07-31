"use client"

import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const isAuthenticated = ref(false)
const currentUser = ref(null)

// Demo users
const users = [
  { id: 1, username: "admin", password: "admin", name: "Admin User", role: "admin" },
  { id: 2, username: "manager", password: "manager", name: "Sales Manager", role: "manager" },
  { id: 3, username: "service", password: "service", name: "Customer Service", role: "service" },
]

export function useAuth() {
  const router = useRouter()

  const login = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      currentUser.value = user
      isAuthenticated.value = true
      router.push("/dashboard")
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    router.push("/")
  }

  const isAdmin = computed(() => currentUser.value?.role === "admin")
  const isManager = computed(() => currentUser.value?.role === "manager")

  return {
    isAuthenticated,
    currentUser,
    users,
    login,
    logout,
    isAdmin,
    isManager,
  }
}
