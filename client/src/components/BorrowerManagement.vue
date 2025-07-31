<template>
  <div>
    <AppHeader />
    <div class="p-4 max-w-6xl mx-auto space-y-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 class="text-xl font-semibold text-gray-800">{{ $t('borrowerManagement') }}</h2>
          
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <!-- Search Input -->
            <div class="relative flex-1 sm:w-64">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('searchBorrowerName')"
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search class="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
            
            <!-- Add Borrower Button -->
            <button
              @click="showAddBorrower = true"
              class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 whitespace-nowrap"
            >
              <Plus class="w-4 h-4 inline mr-2" />
              {{ $t('addBorrower') }}
            </button>
          </div>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="borrower in filteredBorrowers"
            :key="borrower.id"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800 text-lg">{{ borrower.name }}</h3>
                <p class="text-sm text-gray-600">ID: {{ borrower.id }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="showPaymentModal(borrower.id)"
                  class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  {{ $t('addPayment') }}
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-gray-600">{{ $t('totalOwed') }}</p>
                <p class="font-semibold text-red-600 text-lg">${{ borrower.totalOwed.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">{{ $t('totalPaid') }}</p>
                <p class="font-semibold text-green-600 text-lg">${{ borrower.totalPaid.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">{{ $t('lastPayment') }}</p>
                <p class="text-gray-800">{{ borrower.lastPayment || $t('never') }}</p>
              </div>
            </div>
            
            <div v-if="borrower.totalOwed - borrower.totalPaid > 0" class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                  :style="{ width: `${Math.min((borrower.totalPaid / borrower.totalOwed) * 100, 100)}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-600 mt-2">
                {{ ((borrower.totalPaid / borrower.totalOwed) * 100).toFixed(1) }}% {{ $t('paid') }}
              </p>
            </div>
          </div>
          
          <div v-if="filteredBorrowers.length === 0" class="text-center py-8 text-gray-500">
            {{ searchQuery ? $t('noBorrowersFound') : $t('noBorrowersYet') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Add Borrower Modal -->
    <div v-if="showAddBorrower" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('addNewBorrower') }}</h3>
        
        <form @submit.prevent="handleAddBorrower" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('name') }}</label>
            <input
              v-model="newBorrower.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('enterBorrowerName')"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('initialLoanAmount') }} ($)</label>
            <input
              v-model.number="newBorrower.totalOwed"
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
              {{ $t('addBorrower') }}
            </button>
            <button
              type="button"
              @click="showAddBorrower = false"
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
        <p class="text-gray-600 mb-4">{{ $t('addingPaymentFor') }}: <strong>{{ selectedBorrowerName }}</strong></p>
        
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

const { borrowers, addBorrower, addPayment, loadData } = useData()
const { $t } = useI18n()

const showAddBorrower = ref(false)
const showPaymentForm = ref(false)
const searchQuery = ref('')
const selectedBorrowerId = ref(null)
const selectedBorrowerName = ref('')
const paymentAmount = ref(0)

const newBorrower = ref({
  name: '',
  totalOwed: 0
})

const filteredBorrowers = computed(() => {
  if (!searchQuery.value) return borrowers.value
  
  return borrowers.value.filter(borrower =>
    borrower.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleAddBorrower = () => {
  addBorrower(newBorrower.value)
  newBorrower.value = { name: '', totalOwed: 0 }
  showAddBorrower.value = false
  alert($t('borrowerAddedSuccessfully'))
}

const showPaymentModal = (borrowerId) => {
  const borrower = borrowers.value.find(b => b.id === borrowerId)
  if (borrower) {
    selectedBorrowerId.value = borrowerId
    selectedBorrowerName.value = borrower.name
    paymentAmount.value = 0
    showPaymentForm.value = true
  }
}

const handleAddPayment = () => {
  const success = addPayment(selectedBorrowerId.value, paymentAmount.value)
  if (success) {
    closePaymentModal()
    alert($t('paymentRecordedSuccessfully'))
  }
}

const closePaymentModal = () => {
  showPaymentForm.value = false
  selectedBorrowerId.value = null
  selectedBorrowerName.value = ''
  paymentAmount.value = 0
}

onMounted(() => {
  loadData()
})
</script>
