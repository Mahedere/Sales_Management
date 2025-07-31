<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button
          @click="$router.push('/dashboard')"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft class="w-5 h-5 text-gray-600" />
        </button>
        <h1 class="text-xl font-semibold text-gray-800">{{ getPageTitle() }}</h1>
      </div>
      
      <div class="flex items-center space-x-2">
        <!-- Language Toggle -->
        <button
          @click="toggleLanguage"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          {{ currentLanguage === 'en' ? 'አማ' : 'EN' }}
        </button>
        
        <span class="text-sm text-gray-600 hidden sm:block">{{ currentUser?.name }}</span>
        <button
          @click="logout"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut class="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ArrowLeft, LogOut } from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { currentUser, logout } = useAuth()
const { currentLanguage, toggleLanguage, $t } = useI18n()

const getPageTitle = () => {
  const titles = {
    dashboard: $t('dashboard'),
    sales: $t('salesInput'),
    lenders: $t('lenderManagement')
  }
  return titles[route.name] || $t('dashboard')
}
</script>
