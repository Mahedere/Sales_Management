<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Login Page -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Business Manager</h1>
          <p class="text-gray-600">Sign in to your account</p>
        </div>
        
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              v-model="loginForm.username"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            Sign In
          </button>
        </form>
        
        <!-- <div class="mt-6 text-center text-sm text-gray-600">
          <p>Demo accounts:</p>
          <p><strong>admin/admin</strong> (Admin) | <strong>manager/manager</strong> (Sales Manager)</p>
        </div> -->
      </div>
    </div>

    <!-- Main App -->
    <div v-else class="min-h-screen">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 py-3 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <button
              v-if="currentView !== 'dashboard'"
              @click="goBack"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-gray-600" />
            </button>
            <h1 class="text-xl font-semibold text-gray-800">{{ getPageTitle() }}</h1>
          </div>
          
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600 hidden sm:block">{{ currentUser.name }}</span>
            <button
              @click="logout"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <!-- Dashboard -->
      <div v-if="currentView === 'dashboard'" class="p-4 space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Today's Sales</p>
                <p class="text-2xl font-bold text-gray-800">${{ todaysSales }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Overdue Lenders</p>
                <p class="text-2xl font-bold text-red-600">{{ overdueLenders }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle class="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Total Lenders</p>
                <p class="text-2xl font-bold text-gray-800">{{ totalLenders }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Items Sold</p>
                <p class="text-2xl font-bold text-gray-800">{{ itemsSoldToday }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Main Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            @click="currentView = 'sales'"
            class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <ShoppingCart class="w-6 h-6" />
              </div>
              <div class="text-left">
                <h3 class="text-lg font-semibold">Sales Input</h3>
                <p class="text-blue-100">Record daily sales</p>
              </div>
            </div>
          </button>
          
          <button
            @click="currentView = 'lenders'"
            class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <CreditCard class="w-6 h-6" />
              </div>
              <div class="text-left">
                <h3 class="text-lg font-semibold">Lender Management</h3>
                <p class="text-green-100">Track loans & payments</p>
              </div>
            </div>
          </button>
        </div>

        <!-- Admin Panel (Admin only) -->
        <div v-if="currentUser.role === 'admin'" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Admin Panel</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              @click="currentView = 'users'"
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users class="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p class="text-sm font-medium">Manage Users</p>
            </button>
            <button
              @click="currentView = 'reports'"
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText class="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p class="text-sm font-medium">Reports</p>
            </button>
            <button
              @click="currentView = 'settings'"
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings class="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p class="text-sm font-medium">Settings</p>
            </button>
          </div>
        </div>
      </div>

      <!-- Sales Input -->
      <div v-if="currentView === 'sales'" class="p-4 space-y-6">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">Add New Sale</h2>
          
          <form @submit.prevent="addSale" class="space-y-4">
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
                    class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
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
      </div>

      <!-- Lender Management -->
      <div v-if="currentView === 'lenders'" class="p-4 space-y-6">
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
                    @click="addPayment(lender.id)"
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

      <!-- User Management (Admin only) -->
      <div v-if="currentView === 'users' && currentUser.role === 'admin'" class="p-4 space-y-6">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-6">User Management</h2>
          
          <div class="space-y-4">
            <div
              v-for="user in users"
              :key="user.id"
              class="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 class="font-semibold text-gray-800">{{ user.name }}</h3>
                <p class="text-sm text-gray-600">{{ user.username }} | {{ user.role }}</p>
              </div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                  Edit Role
                </button>
                <button class="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition-colors">
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Lender Modal -->
      <div v-if="showAddLender" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Lender</h3>
          
          <form @submit.prevent="addLender" class="space-y-4">
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
                v-model.number="newLender.initialLoan"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Store, ArrowLeft, LogOut, DollarSign, AlertTriangle, Users, Package,
  ShoppingCart, CreditCard, FileText, Settings, Plus
} from 'lucide-vue-next'

// Authentication state
const isAuthenticated = ref(false)
const currentUser = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})

// Navigation state
const currentView = ref('dashboard')
const showItemSuggestions = ref(false)
const showAddLender = ref(false)

// Demo users
const users = ref([
  { id: 1, username: 'admin', password: 'admin', name: 'Admin User', role: 'admin' },
  { id: 2, username: 'manager', password: 'manager', name: 'Sales Manager', role: 'manager' },
  { id: 3, username: 'service', password: 'service', name: 'Customer Service', role: 'service' }
])

// Items data
const items = ref([
  'Glass filter kene medeb', 'Feren motor piston', 'Maskeriya', 'Parawlet',
  'Ber', 'Parawel sporto', 'Ye mebrat', 'Fog lamp', 'Bearing 30311',
  'Motor Chinga', 'Dinamo belt', 'Kortelo', 'Yehoala karakino',
  'Chinga meweterya', 'Yemoter masnesha', 'Push buttun', 'Ye marsh cabo'
])

const filteredItems = ref([])

// Sales data
const sales = ref([])
const saleForm = ref({
  itemName: '',
  quantity: 1,
  pricePerUnit: 0,
  customerType: 'walkin',
  customerName: '',
  lenderId: ''
})

// Lenders data
const lenders = ref([
  { id: 1, name: 'Abel Mekonnen', totalOwed: 1500, totalPaid: 800, lastPayment: '2024-01-15' },
  { id: 2, name: 'Muluwork Abebe', totalOwed: 2200, totalPaid: 2200, lastPayment: '2024-01-20' },
  { id: 3, name: 'Yared Tadesse', totalOwed: 800, totalPaid: 300, lastPayment: '2024-01-10' },
  { id: 4, name: 'Hana Kebede', totalOwed: 1200, totalPaid: 600, lastPayment: '2024-01-18' },
  { id: 5, name: 'Biniam Tsegaye', totalOwed: 950, totalPaid: 0, lastPayment: null }
])

const newLender = ref({
  name: '',
  initialLoan: 0
})

// Computed properties
const todaysSalesData = computed(() => {
  const today = new Date().toDateString()
  return sales.value.filter(sale => new Date(sale.timestamp).toDateString() === today)
})

const todaysSales = computed(() => {
  return todaysSalesData.value.reduce((total, sale) => total + sale.total, 0).toFixed(2)
})

const overdueLenders = computed(() => {
  return lenders.value.filter(lender => {
    const balance = lender.totalOwed - lender.totalPaid
    const lastPaymentDate = lender.lastPayment ? new Date(lender.lastPayment) : null
    const daysSincePayment = lastPaymentDate ? 
      (new Date() - lastPaymentDate) / (1000 * 60 * 60 * 24) : Infinity
    return balance > 0 && daysSincePayment > 30
  }).length
})

const totalLenders = computed(() => {
  return lenders.value.filter(lender => lender.totalOwed - lender.totalPaid > 0).length
})

const itemsSoldToday = computed(() => {
  return todaysSalesData.value.reduce((total, sale) => total + sale.quantity, 0)
})

// Methods
const login = () => {
  const user = users.value.find(u => 
    u.username === loginForm.value.username && u.password === loginForm.value.password
  )
  
  if (user) {
    currentUser.value = user
    isAuthenticated.value = true
    loginForm.value = { username: '', password: '' }
    loadData()
  } else {
    alert('Invalid credentials')
  }
}

const logout = () => {
  isAuthenticated.value = false
  currentUser.value = null
  currentView.value = 'dashboard'
  saveData()
}

const goBack = () => {
  currentView.value = 'dashboard'
}

const getPageTitle = () => {
  const titles = {
    dashboard: 'Dashboard',
    sales: 'Sales Input',
    lenders: 'Lender Management',
    users: 'User Management',
    reports: 'Reports',
    settings: 'Settings'
  }
  return titles[currentView.value] || 'Dashboard'
}

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

const addSale = () => {
  const customerName = saleForm.value.customerType === 'lender' 
    ? lenders.value.find(l => l.id == saleForm.value.lenderId)?.name
    : saleForm.value.customerName || 'Walk-in'
  
  const sale = {
    id: Date.now(),
    itemName: saleForm.value.itemName,
    quantity: saleForm.value.quantity,
    pricePerUnit: saleForm.value.pricePerUnit,
    total: saleForm.value.quantity * saleForm.value.pricePerUnit,
    customerType: saleForm.value.customerType,
    customerName,
    lenderId: saleForm.value.lenderId,
    timestamp: new Date().toISOString(),
    userId: currentUser.value.id
  }
  
  sales.value.push(sale)
  
  // Update lender debt if applicable
  if (saleForm.value.customerType === 'lender' && saleForm.value.lenderId) {
    const lender = lenders.value.find(l => l.id == saleForm.value.lenderId)
    if (lender) {
      lender.totalOwed += sale.total
    }
  }
  
  // Reset form
  saleForm.value = {
    itemName: '',
    quantity: 1,
    pricePerUnit: 0,
    customerType: 'walkin',
    customerName: '',
    lenderId: ''
  }
  
  saveData()
  alert('Sale added successfully!')
}

const addLender = () => {
  const lender = {
    id: Date.now(),
    name: newLender.value.name,
    totalOwed: newLender.value.initialLoan || 0,
    totalPaid: 0,
    lastPayment: null
  }
  
  lenders.value.push(lender)
  newLender.value = { name: '', initialLoan: 0 }
  showAddLender.value = false
  saveData()
  alert('Lender added successfully!')
}

const addPayment = (lenderId) => {
  const amount = prompt('Enter payment amount:')
  if (amount && !isNaN(amount)) {
    const lender = lenders.value.find(l => l.id === lenderId)
    if (lender) {
      lender.totalPaid += parseFloat(amount)
      lender.lastPayment = new Date().toISOString().split('T')[0]
      saveData()
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

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}

const saveData = () => {
  localStorage.setItem('businessData', JSON.stringify({
    sales: sales.value,
    lenders: lenders.value
  }))
}

const loadData = () => {
  const saved = localStorage.getItem('businessData')
  if (saved) {
    const data = JSON.parse(saved)
    sales.value = data.sales || []
    lenders.value = data.lenders || lenders.value
  }
}

// Click outside to close suggestions
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showItemSuggestions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  loadData()
})
</script>

<style scoped>
/* Custom scrollbar for suggestions */
.max-h-48::-webkit-scrollbar {
  width: 6px;
}

.max-h-48::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.max-h-48::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.max-h-48::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
