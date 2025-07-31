<template>
  <div>
    <AppHeader />
    <div class="p-4 max-w-4xl mx-auto space-y-6">
      <!-- Sales Form -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ $t('addNewSale') }}</h2>
        
        <form @submit.prevent="showConfirmation = true" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('itemName') }}</label>
              <div class="relative">
                <input
                  v-model="saleForm.itemName"
                  @input="filterItems"
                  @focus="showItemSuggestions = true"
                  @blur="hideItemSuggestions"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="$t('typeOrSelectItem')"
                />
                <div
                  v-if="showItemSuggestions && filteredItems.length > 0"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto custom-scrollbar"
                >
                  <button
                    v-for="item in filteredItems"
                    :key="item"
                    type="button"
                    @mousedown="selectItem(item)"
                    class="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 text-sm"
                  >
                    {{ item }}
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('quantity') }}</label>
              <input
                v-model.number="saleForm.quantity"
                type="number"
                min="1"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="$t('enterQuantity')"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('pricePerUnit') }} ($)</label>
              <input
                v-model.number="saleForm.pricePerUnit"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="$t('enterPrice')"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('total') }} ($)</label>
              <input
                :value="(saleForm.quantity * saleForm.pricePerUnit).toFixed(2)"
                type="text"
                readonly
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('customerType') }}</label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  v-model="saleForm.customerType"
                  type="radio"
                  value="walkin"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ $t('walkInCustomer') }}</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="saleForm.customerType"
                  type="radio"
                  value="borrower"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ $t('borrower') }}</span>
              </label>
            </div>
          </div>
          
          <div v-if="saleForm.customerType === 'borrower'">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('selectBorrower') }}</label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <input
                  v-model="borrowerSearchQuery"
                  @input="filterBorrowers"
                  @focus="showBorrowerSuggestions = true"
                  @blur="hideBorrowerSuggestions"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="$t('typeOrSelectBorrower')"
                />
                <div
                  v-if="showBorrowerSuggestions && filteredBorrowers.length > 0"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto custom-scrollbar"
                >
                  <button
                    v-for="borrower in filteredBorrowers"
                    :key="borrower.id"
                    type="button"
                    @mousedown="selectBorrower(borrower)"
                    class="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 text-sm"
                  >
                    {{ borrower.name }}
                  </button>
                </div>
                <div
                  v-if="showBorrowerSuggestions && filteredBorrowers.length === 0 && borrowerSearchQuery"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                  <div class="px-4 py-2 text-sm text-gray-500">
                    {{ $t('noBorrowersFound') }}
                  </div>
                </div>
              </div>
              <button
                type="button"
                @click="showAddBorrowerFromSales = true"
                class="px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap"
              >
                <Plus class="w-4 h-4 inline mr-1" />
                {{ $t('addNew') }}
              </button>
            </div>
          </div>
          
          <div v-if="saleForm.customerType === 'walkin'">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('customerNameOptional') }}</label>
            <input
              v-model="saleForm.customerName"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('enterCustomerNameOrLeaveBlank')"
            />
          </div>
          
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            {{ $t('reviewSale') }}
          </button>
        </form>
      </div>
      
      <!-- Today's Sales -->
      <SalesList />
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('confirmSale') }}</h3>
        
        <div class="space-y-3 mb-6">
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('item') }}:</span>
            <span class="font-medium">{{ saleForm.itemName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('quantity') }}:</span>
            <span class="font-medium">{{ saleForm.quantity }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('pricePerUnit') }}:</span>
            <span class="font-medium">${{ saleForm.pricePerUnit }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('total') }}:</span>
            <span class="font-bold text-lg">${{ (saleForm.quantity * saleForm.pricePerUnit).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('customer') }}:</span>
            <span class="font-medium">{{ getCustomerName() }}</span>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <button
            @click="handleAddSale"
            class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            {{ $t('yes') }}, {{ $t('save') }}
          </button>
          <button
            @click="showConfirmation = false"
            class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-all duration-200"
          >
            {{ $t('cancel') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Borrower from Sales Modal -->
    <div v-if="showAddBorrowerFromSales" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('addNewBorrower') }}</h3>
        
        <form @submit.prevent="handleAddBorrowerFromSales" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('name') }}</label>
            <input
              v-model="newBorrowerFromSales.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="$t('enterBorrowerName')"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('initialLoanAmount') }} ($)</label>
            <input
              v-model.number="newBorrowerFromSales.totalOwed"
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
              @click="cancelAddBorrowerFromSales"
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
import { Plus } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'
import SalesList from './SalesList.vue'
import { useData } from '@/composables/useData'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'

const { items, borrowers, addSale, addBorrower, loadData } = useData()
const { currentUser } = useAuth()
const { $t } = useI18n()

const showItemSuggestions = ref(false)
const showBorrowerSuggestions = ref(false)
const showConfirmation = ref(false)
const showAddBorrowerFromSales = ref(false)
const filteredItems = ref([])
const filteredBorrowers = ref([])
const borrowerSearchQuery = ref('')

const saleForm = ref({
  itemName: '',
  quantity: 1,
  pricePerUnit: 0,
  customerType: 'walkin',
  customerName: '',
  borrowerId: '',
  selectedBorrowerName: ''
})

const newBorrowerFromSales = ref({
  name: '',
  totalOwed: 0
})

const filterItems = () => {
  const query = saleForm.value.itemName.toLowerCase()
  filteredItems.value = items.value.filter(item => 
    item.toLowerCase().includes(query)
  )
}

const filterBorrowers = () => {
  const query = borrowerSearchQuery.value.toLowerCase()
  if (!query) {
    filteredBorrowers.value = borrowers.value.slice(0, 10) // Show first 10 by default
  } else {
    filteredBorrowers.value = borrowers.value.filter(borrower => 
      borrower.name.toLowerCase().includes(query)
    ).slice(0, 20) // Show up to 20 matches
  }
}

const selectItem = (item) => {
  saleForm.value.itemName = item
  showItemSuggestions.value = false
  filteredItems.value = []
}

const selectBorrower = (borrower) => {
  saleForm.value.borrowerId = borrower.id
  saleForm.value.selectedBorrowerName = borrower.name
  borrowerSearchQuery.value = borrower.name
  showBorrowerSuggestions.value = false
  filteredBorrowers.value = []
}

const hideItemSuggestions = () => {
  setTimeout(() => {
    showItemSuggestions.value = false
  }, 200)
}

const hideBorrowerSuggestions = () => {
  setTimeout(() => {
    showBorrowerSuggestions.value = false
  }, 200)
}

const getCustomerName = () => {
  if (saleForm.value.customerType === 'borrower') {
    return saleForm.value.selectedBorrowerName || borrowerSearchQuery.value
  }
  return saleForm.value.customerName || 'Walk-in'
}

const handleAddBorrowerFromSales = () => {
  const newBorrower = addBorrower(newBorrowerFromSales.value)
  
  // Auto-select the newly added borrower
  saleForm.value.borrowerId = newBorrower.id
  saleForm.value.selectedBorrowerName = newBorrower.name
  borrowerSearchQuery.value = newBorrower.name
  
  // Reset and close modal
  newBorrowerFromSales.value = { name: '', totalOwed: 0 }
  showAddBorrowerFromSales.value = false
  
  alert($t('borrowerAddedSuccessfully'))
}

const cancelAddBorrowerFromSales = () => {
  newBorrowerFromSales.value = { name: '', totalOwed: 0 }
  showAddBorrowerFromSales.value = false
}

const handleAddSale = () => {
  const customerName = getCustomerName()
  
  const saleData = {
    itemName: saleForm.value.itemName,
    quantity: saleForm.value.quantity,
    pricePerUnit: saleForm.value.pricePerUnit,
    total: saleForm.value.quantity * saleForm.value.pricePerUnit,
    customerType: saleForm.value.customerType,
    customerName,
    borrowerId: saleForm.value.borrowerId
  }
  
  addSale(saleData, currentUser.value.id)
  
  // Reset form
  saleForm.value = {
    itemName: '',
    quantity: 1,
    pricePerUnit: 0,
    customerType: 'walkin',
    customerName: '',
    borrowerId: '',
    selectedBorrowerName: ''
  }
  borrowerSearchQuery.value = ''
  
  showConfirmation.value = false
  alert($t('saleAddedSuccessfully'))
}

onMounted(() => {
  loadData()
  // Initialize filtered borrowers
  filteredBorrowers.value = borrowers.value.slice(0, 10)
})
</script>
