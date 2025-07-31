"use client"

import { ref } from "vue"
import { useRouter } from "vue-router"

const isAuthenticated = ref(false)
const currentUser = ref(null)

// Simplified users - no admin role needed
const users = [
  { id: 1, username: "manager1", password: "manager1", name: "Sales Manager 1", role: "manager" },
  { id: 2, username: "manager2", password: "manager2", name: "Sales Manager 2", role: "manager" },
  { id: 3, username: "manager3", password: "manager3", name: "Sales Manager 3", role: "manager" },
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

  return {
    isAuthenticated,
    currentUser,
    users,
    login,
    logout,
  }
}
