<template>
  <div>
    <AppHeader />
    <div class="p-4 space-y-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Lender Management</h2>
          <button
            @click="showAddLender = true"
            class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            <Plus class="w-4 h-4 inline mr-2" />
            Add Lender
          </button>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="lender in lenders"
            :key="lender.id"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-semibold text-gray-800">{{ lender.name }}</h3>
                <p class="text-sm text-gray-600">ID: {{ lender.id }}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="handleAddPayment(lender.id)"
                  class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  Add Payment
                </button>
                <button
                  @click="sendReminder(lender.id)"
                  class="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors"
                >
                  Remind
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p class="text-gray-600">Total Owed</p>
                <p class="font-semibold text-red-600">${{ lender.totalOwed.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">Total Paid</p>
                <p class="font-semibold text-green-600">${{ lender.totalPaid.toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">Balance</p>
                <p class="font-semibold text-gray-800">${{ (lender.totalOwed - lender.totalPaid).toFixed(2) }}</p>
              </div>
              <div>
                <p class="text-gray-600">Last Payment</p>
                <p class="text-gray-800">{{ lender.lastPayment || 'Never' }}</p>
              </div>
            </div>
            
            <div v-if="lender.totalOwed - lender.totalPaid > 0" class="mt-3">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                  :style="{ width: `${(lender.totalPaid / lender.totalOwed) * 100}%` }"
                ></div>
              </div>
              <p class="text-xs text-gray-600 mt-1">
                {{ ((lender.totalPaid / lender.totalOwed) * 100).toFixed(1) }}% paid
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Lender Modal -->
    <div v-if="showAddLender" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Lender</h3>
        
        <form @submit.prevent="handleAddLender" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              v-model="newLender.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter lender name"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Initial Loan Amount ($)</label>
            <input
              v-model.number="newLender.totalOwed"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter initial loan amount"
            />
          </div>
          
          <div class="flex space-x-3">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              Add Lender
            </button>
            <button
              type="button"
              @click="showAddLender = false"
              class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'
import { useData } from '@/composables/useData'

const { lenders, addLender, addPayment, loadData } = useData()

const showAddLender = ref(false)
const newLender = ref({
  name: '',
  totalOwed: 0
})

const handleAddLender = () => {
  addLender(newLender.value)
  newLender.value = { name: '', totalOwed: 0 }
  showAddLender.value = false
  alert('Lender added successfully!')
}

const handleAddPayment = (lenderId) => {
  const amount = prompt('Enter payment amount:')
  if (amount && !isNaN(amount)) {
    const success = addPayment(lenderId, amount)
    if (success) {
      alert('Payment recorded successfully!')
    }
  }
}

const sendReminder = (lenderId) => {
  const lender = lenders.value.find(l => l.id === lenderId)
  if (lender) {
    alert(`Reminder sent to ${lender.name}`)
  }
}

onMounted(() => {
  loadData()
})
</script>
