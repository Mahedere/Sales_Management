<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800">{{ $t('todaysSales') }}</h3>
      <button
        @click="showExportConfirmation = true"
        class="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
      >
        {{ $t('exportCSV') }}
      </button>
    </div>
    
    <div class="space-y-3">
      <div
        v-for="sale in todaysSalesData"
        :key="sale.id"
        class="p-4 border border-gray-200 rounded-lg"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h4 class="font-medium text-gray-800">{{ sale.itemName || 'N/A' }}</h4>
            <p class="text-sm text-gray-600">
              Qty: {{ sale.quantity || 0 }} × ${{ (sale.pricePerUnit || 0).toFixed(2) }} = ${{ (sale.total || 0).toFixed(2) }}
            </p>
            <p class="text-sm text-gray-500">
              Customer: {{ sale.customerName || 'N/A' }} | {{ formatTime(sale.timestamp) }}
            </p>
            <p class="text-xs text-blue-600 mt-1">
              {{ $t('madeBy') }}: {{ getUserName(sale.userId) }}
            </p>
          </div>
          <span
            :class="sale.customerType === 'borrower' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'"
            class="px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0"
          >
            {{ sale.customerType === 'borrower' ? $t('borrower') : 'Walk-in' }}
          </span>
        </div>
      </div>
      
      <div v-if="todaysSalesData.length === 0" class="text-center py-8 text-gray-500">
        {{ $t('noSalesRecordedToday') }}
      </div>
    </div>

    <!-- Export Confirmation Modal -->
    <div v-if="showExportConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('confirmExport') }}</h3>
        <p class="text-gray-600 mb-6">{{ $t('areYouSureExportTodaysSales') }}</p>
        
        <div class="flex space-x-3">
          <button
            @click="exportSales('csv')"
            class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            {{ $t('yes') }}, {{ $t('export') }}
          </button>
          <button
            @click="showExportConfirmation = false"
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
import { ref } from 'vue'
import { useData } from '@/composables/useData'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'

const { todaysSalesData } = useData()
const { users } = useAuth()
const { $t } = useI18n()

const showExportConfirmation = ref(false)

const formatTime = (timestamp) => {
  if (!timestamp) return 'N/A'
  try {
    return new Date(timestamp).toLocaleTimeString()
  } catch (error) {
    return 'N/A'
  }
}

const getUserName = (userId) => {
  if (!userId) return 'Unknown'
  const user = users.find(u => u.id === userId)
  return user ? user.name : 'Unknown'
}

const exportSales = (format) => {
  const data = todaysSalesData.value
  
  if (format === 'csv') {
    const csv = [
      'Item,Quantity,Price,Total,Customer,Type,Time,Made By',
      ...data.map(sale => 
        `"${sale.itemName || 'N/A'}",${sale.quantity || 0},${(sale.pricePerUnit || 0).toFixed(2)},${(sale.total || 0).toFixed(2)},"${sale.customerName || 'N/A'}",${sale.customerType || 'walkin'},${formatTime(sale.timestamp)},"${getUserName(sale.userId)}"`
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    downloadFile(blob, `sales-${new Date().toISOString().split('T')[0]}.csv`)
  }
  
  showExportConfirmation.value = false
}

const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
