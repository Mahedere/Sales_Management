<template>
  <div>
    <AppHeader />
    <div class="p-4 max-w-6xl mx-auto space-y-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 class="text-xl font-semibold text-gray-800">{{ $t('lenderManagement') }}</h2>
          
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <!-- Search Input -->
            <div class="relative flex-1 sm:w-64">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('searchLenderName')"
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
            
            <!-- Add Lender Button -->
            <button
              @click="showAddLender = true"
              class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 whitespace-nowrap"
            >
              <Plus class="w-4 h-4 inline mr-2" />
              {{ $t('addLender') }}
            </button>
          </div>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="lender in filteredLenders"
            :key="lender.id"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-lg">{{ lender.name }}</h3>
                <p class="text-sm text-gray-600">ID: {{ lender.id }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="showPaymentModal(lender.id)"
                  class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  {{ $t('addPayment') }}
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-gray-600">{{ $t('totalOwed') }}</p>
                <p class="font-semibold text-red-600 text-lg">${{ lender.totalOwed.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">{{ $t('totalPaid') }}</p>
                <p class="font-semibold text-green-600 text-lg">${{ lender.totalPaid.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">{{ $t('lastPayment') }}</p>
                <p class="text-gray-800">{{ lender.lastPayment || $t('never') }}</p>
              </div>
            </div>
            
            <div v-if="lender.totalOwed - lender.totalPaid > 0" class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                  :style="{ width: `${Math.min((lender.totalPaid / lender.totalOwed) * 100, 100)}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-600 mt-2">
                {{ ((lender.totalPaid / lender.totalOwed) * 100).toFixed(1) }}% {{ $t('paid') }}
              </p>
            </div>
          </div>
          
          <div v-if="filteredLenders.length === 0" class="text-center py-8 text-gray-500">
            {{ searchQuery ? $t('noLendersFound') : $t('noLendersYet') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Add Lender Modal -->
    <div v-if="showAddLender" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('addNewLender') }}</h3>
        
        <form @submit.prevent="handleAddLender" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('name') }}</label>
            <input
              v-model="newLender.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('enterLenderName')"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('initialLoanAmount') }} ($)</label>
            <input
              v-model.number="newLender.totalOwed"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('enterInitialLoanAmount')"
            />
          </div>
          
          <div class="flex space-x-3">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              {{ $t('addLender') }}
            </button>
            <button
              type="button"
              @click="showAddLender = false"
              class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-all duration-200"
            >
              {{ $t('cancel') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Payment Modal -->
    <div v-if="showPaymentForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('addPayment') }}</h3>
        <p class="text-gray-600 mb-4">{{ $t('addingPaymentFor') }}: <strong>{{ selectedLenderName }}</strong></p>
        
        <form @submit.prevent="handleAddPayment" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('paymentAmount') }} ($)</label>
            <input
              v-model.number="paymentAmount"
              type="number"
              step="0.01"
              min="0.01"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('enterPaymentAmount')"
            />
          </div>
          
          <div class="flex space-x-3">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
            >
              {{ $t('addPayment') }}
            </button>
            <button
              type="button"
              @click="closePaymentModal"
              class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-all duration-200"
            >
              {{ $t('cancel') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Search } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'
import { useData } from '@/composables/useData'
import { useI18n } from '@/composables/useI18n'

const { lenders, addLender, addPayment, loadData } = useData()
const { $t } = useI18n()

const showAddLender = ref(false)
const showPaymentForm = ref(false)
const searchQuery = ref('')
const selectedLenderId = ref(null)
const selectedLenderName = ref('')
const paymentAmount = ref(0)

const newLender = ref({
  name: '',
  totalOwed: 0
})

const filteredLenders = computed(() => {
  if (!searchQuery.value) return lenders.value
  
  return lenders.value.filter(lender =>
    lender.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleAddLender = () => {
  addLender(newLender.value)
  newLender.value = { name: '', totalOwed: 0 }
  showAddLender.value = false
  alert($t('lenderAddedSuccessfully'))
}

const showPaymentModal = (lenderId) => {
  const lender = lenders.value.find(l => l.id === lenderId)
  if (lender) {
    selectedLenderId.value = lenderId
    selectedLenderName.value = lender.name
    paymentAmount.value = 0
    showPaymentForm.value = true
  }
}

const handleAddPayment = () => {
  const success = addPayment(selectedLenderId.value, paymentAmount.value)
  if (success) {
    closePaymentModal()
    alert($t('paymentRecordedSuccessfully'))
  }
}

const closePaymentModal = () => {
  showPaymentForm.value = false
  selectedLenderId.value = null
  selectedLenderName.value = ''
  paymentAmount.value = 0
}

onMounted(() => {
  loadData()
})
</script>
