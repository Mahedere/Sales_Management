<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800">Today's Sales</h3>
      <div class="flex space-x-2">
        <button
          @click="exportSales('pdf')"
          class="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
        >
          PDF
        </button>
        <button
          @click="exportSales('csv')"
          class="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
        >
          CSV
        </button>
        <button
          @click="exportSales('json')"
          class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
        >
          JSON
        </button>
      </div>
    </div>
    
    <div class="space-y-3">
      <div
        v-for="sale in todaysSalesData"
        :key="sale.id"
        class="p-4 border border-gray-200 rounded-lg"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-medium text-gray-800">{{ sale.itemName }}</h4>
            <p class="text-sm text-gray-600">
              Qty: {{ sale.quantity }} × ${{ sale.pricePerUnit }} = ${{ sale.total }}
            </p>
            <p class="text-sm text-gray-500">
              Customer: {{ sale.customerName }} | {{ formatTime(sale.timestamp) }}
            </p>
          </div>
          <span
            :class="sale.customerType === 'lender' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'"
            class="px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ sale.customerType === 'lender' ? 'Lender' : 'Walk-in' }}
          </span>
        </div>
      </div>
      
      <div v-if="todaysSalesData.length === 0" class="text-center py-8 text-gray-500">
        No sales recorded today
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from '@/composables/useData'

const { todaysSalesData } = useData()

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}

const exportSales = (format) => {
  const data = todaysSalesData.value
  
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    downloadFile(blob, `sales-${new Date().toISOString().split('T')[0]}.json`)
  } else if (format === 'csv') {
    const csv = [
      'Item,Quantity,Price,Total,Customer,Type,Time',
      ...data.map(sale => 
        `"${sale.itemName}",${sale.quantity},${sale.pricePerUnit},${sale.total},"${sale.customerName}",${sale.customerType},${new Date(sale.timestamp).toLocaleString()}`
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    downloadFile(blob, `sales-${new Date().toISOString().split('T')[0]}.csv`)
  } else if (format === 'pdf') {
    alert('PDF export would be implemented with a PDF library like jsPDF')
  }
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
