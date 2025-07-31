<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Admin Panel</h3>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button
        @click="$router.push('/users')"
        class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Users class="w-6 h-6 text-gray-600 mx-auto mb-2" />
        <p class="text-sm font-medium">Manage Users</p>
      </button>
      <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <FileText class="w-6 h-6 text-gray-600 mx-auto mb-2" />
        <p class="text-sm font-medium">Reports</p>
      </button>
      <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <Settings class="w-6 h-6 text-gray-600 mx-auto mb-2" />
        <p class="text-sm font-medium">Settings</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Users, FileText, Settings } from 'lucide-vue-next'
</script>
