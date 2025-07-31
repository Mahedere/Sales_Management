<template>
  <div>
    <AppHeader />
    <div class="p-4 space-y-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">User Management</h2>
        
        <div class="space-y-4">
          <div
            v-for="user in users"
            :key="user.id"
            class="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 class="font-semibold text-gray-800">{{ user.name }}</h3>
              <p class="text-sm text-gray-600">{{ user.username }} | {{ user.role }}</p>
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                Edit Role
              </button>
              <button class="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import { useAuth } from '@/composables/useAuth'

const { users } = useAuth()
</script>
