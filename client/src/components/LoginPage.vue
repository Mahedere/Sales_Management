<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Business Manager</h1>
        <p class="text-gray-600">Sign in to your account</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            v-model="loginForm.username"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your username"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="loginForm.password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
        >
          Sign In
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Demo accounts:</p>
        <p><strong>admin/admin</strong> (Admin) | <strong>manager/manager</strong> (Sales Manager)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Store } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()

const loginForm = ref({
  username: '',
  password: ''
})

const handleLogin = () => {
  const success = login(loginForm.value.username, loginForm.value.password)
  if (!success) {
    alert('Invalid credentials')
  }
  loginForm.value = { username: '', password: '' }
}
</script>
