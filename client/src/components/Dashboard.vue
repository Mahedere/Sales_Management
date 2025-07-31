<template>
  <div>
    <AppHeader />
    <div class="p-4 space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Sales"
          :value="`$${todaysSales}`"
          icon="DollarSign"
          color="green"
        />
        <StatsCard
          title="Overdue Lenders"
          :value="overdueLenders"
          icon="AlertTriangle"
          color="red"
        />
        <StatsCard
          title="Total Lenders"
          :value="totalLenders"
          icon="Users"
          color="blue"
        />
        <StatsCard
          title="Items Sold"
          :value="itemsSoldToday"
          icon="Package"
          color="purple"
        />
      </div>

      <!-- Main Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard
          title="Sales Input"
          description="Record daily sales"
          icon="ShoppingCart"
          color="blue"
          @click="$router.push('/sales')"
        />
        <ActionCard
          title="Lender Management"
          description="Track loans & payments"
          icon="CreditCard"
          color="green"
          @click="$router.push('/lenders')"
        />
      </div>

      <!-- Admin Panel -->
      <AdminPanel v-if="isAdmin" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import StatsCard from './StatsCard.vue'
import ActionCard from './ActionCard.vue'
import AdminPanel from './AdminPanel.vue'
import { useAuth } from '@/composables/useAuth'
import { useData } from '@/composables/useData'

const { isAdmin } = useAuth()
const { todaysSales, overdueLenders, totalLenders, itemsSoldToday, loadData } = useData()

onMounted(() => {
  loadData()
})
</script>
