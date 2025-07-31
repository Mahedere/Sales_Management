<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-600">{{ title }}</p>
        <p class="text-2xl font-bold" :class="valueColor">{{ value }}</p>
      </div>
      <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="iconBg">
        <component :is="iconComponent" class="w-6 h-6" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { DollarSign, AlertTriangle, Users, Package } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  color: String
})

const iconComponent = computed(() => {
  const icons = {
    DollarSign,
    AlertTriangle,
    Users,
    Package
  }
  return icons[props.icon]
})

const colorClasses = computed(() => {
  const colors = {
    green: {
      value: 'text-gray-800',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    red: {
      value: 'text-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    blue: {
      value: 'text-gray-800',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    purple: {
      value: 'text-gray-800',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  }
  return colors[props.color] || colors.blue
})

const valueColor = computed(() => colorClasses.value.value)
const iconBg = computed(() => colorClasses.value.iconBg)
const iconColor = computed(() => colorClasses.value.iconColor)
</script>
