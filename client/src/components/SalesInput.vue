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
                    @click="selectItem(item)"
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
                  value="lender"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">{{ $t('lender') }}</span>
              </label>
            </div>
          </div>
          
          <div v-if="saleForm.customerType === 'lender'">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('selectLender') }}</label>
            <select
              v-model="saleForm.lenderId"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{{ $t('chooseALender') }}</option>
              <option v-for="lender in lenders" :key="lender.id" :value="lender.id">
                {{ lender.name }}
              </option>
            </select>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import SalesList from './SalesList.vue'
import { useData } from '@/composables/useData'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'

const { items, lenders, addSale, loadData } = useData()
const { currentUser } = useAuth()
const { $t } = useI18n()

const showItemSuggestions = ref(false)
const showConfirmation = ref(false)
const filteredItems = ref([])

const saleForm = ref({
  itemName: '',
  quantity: 1,
  pricePerUnit: 0,
  customerType: 'walkin',
  customerName: '',
  lenderId: ''
})

const filterItems = () => {
  const query = saleForm.value.itemName.toLowerCase()
  filteredItems.value = items.value.filter(item => 
    item.toLowerCase().includes(query)
  )
}

const selectItem = (item) => {
  saleForm.value.itemName = item
  showItemSuggestions.value = false
  filteredItems.value = []
}

const getCustomerName = () => {
  if (saleForm.value.customerType === 'lender') {
    return lenders.value.find(l => l.id == saleForm.value.lenderId)?.name || ''
  }
  return saleForm.value.customerName || 'Walk-in'
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
    lenderId: saleForm.value.lenderId
  }
  
  addSale(saleData, currentUser.value.id)
  
  // Reset form
  saleForm.value = {
    itemName: '',
    quantity: 1,
    pricePerUnit: 0,
    customerType: 'walkin',
    customerName: '',
    lenderId: ''
  }
  
  showConfirmation.value = false
  alert($t('saleAddedSuccessfully'))
}

onMounted(() => {
  loadData()
})
</script>
