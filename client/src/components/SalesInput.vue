<template>
  <div>
    <AppHeader />
    <div class="p-4 space-y-6">
      <!-- Sales Form -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Add New Sale</h2>
        
        <form @submit.prevent="handleAddSale" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <div class="relative">
                <input
                  v-model="saleForm.itemName"
                  @input="filterItems"
                  @focus="showItemSuggestions = true"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type or select item"
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
                    class="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50"
                  >
                    {{ item }}
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                v-model.number="saleForm.quantity"
                type="number"
                min="1"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price per Unit ($)</label>
              <input
                v-model.number="saleForm.pricePerUnit"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Total ($)</label>
              <input
                :value="(saleForm.quantity * saleForm.pricePerUnit).toFixed(2)"
                type="text"
                readonly
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  v-model="saleForm.customerType"
                  type="radio"
                  value="walkin"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Walk-in Customer</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="saleForm.customerType"
                  type="radio"
                  value="lender"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">Lender</span>
              </label>
            </div>
          </div>
          
          <div v-if="saleForm.customerType === 'lender'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Select Lender</label>
            <select
              v-model="saleForm.lenderId"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a lender</option>
              <option v-for="lender in lenders" :key="lender.id" :value="lender.id">
                {{ lender.name }}
              </option>
            </select>
          </div>
          
          <div v-if="saleForm.customerType === 'walkin'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name (Optional)</label>
            <input
              v-model="saleForm.customerName"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer name or leave blank for 'Walk-in'"
            />
          </div>
          
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            Add Sale
          </button>
        </form>
      </div>
      
      <!-- Today's Sales -->
      <SalesList />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import SalesList from './SalesList.vue'
import { useData } from '@/composables/useData'
import { useAuth } from '@/composables/useAuth'

const { items, lenders, addSale, loadData } = useData()
const { currentUser } = useAuth()

const showItemSuggestions = ref(false)
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

const handleAddSale = () => {
  const customerName = saleForm.value.customerType === 'lender' 
    ? lenders.value.find(l => l.id == saleForm.value.lenderId)?.name
    : saleForm.value.customerName || 'Walk-in'
  
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
  
  alert('Sale added successfully!')
}

onMounted(() => {
  loadData()
})
</script>
