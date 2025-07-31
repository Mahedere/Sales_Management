<template>
  <div>
    <AppHeader />
    <div class="p-4 max-w-4xl mx-auto">
      <!-- Main Actions - Centered and Larger -->
      <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-8">{{ $t('selectAction') }}</h2>
        
        <div class="grid grid-cols-1 gap-8 w-full max-w-2xl">
          <button
            @click="$router.push('/sales')"
            class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            <div class="flex flex-col items-center space-y-4">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <ShoppingCart class="w-8 h-8" />
              </div>
              <div class="text-center">
                <h3 class="text-2xl font-bold">{{ $t('salesInput') }}</h3>
                <p class="text-blue-100 text-lg mt-2">{{ $t('recordDailySales') }}</p>
              </div>
            </div>
          </button>
          
          <button
            @click="$router.push('/borrowers')"
            class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
          >
            <div class="flex flex-col items-center space-y-4">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <CreditCard class="w-8 h-8" />
              </div>
              <div class="text-center">
                <h3 class="text-2xl font-bold">{{ $t('borrowerManagement') }}</h3>
                <p class="text-green-100 text-lg mt-2">{{ $t('trackLoansPayments') }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { ShoppingCart, CreditCard } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'
import { useData } from '@/composables/useData'
import { useI18n } from '@/composables/useI18n'

const { loadData } = useData()
const { $t } = useI18n()

onMounted(() => {
  loadData()
})
</script>
