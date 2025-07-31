<template>
  <button
    @click="$emit('click')"
    class="p-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 text-white"
    :class="gradientClass"
  >
    <div class="flex items-center space-x-4">
      <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>
      <div class="text-left">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="opacity-90">{{ description }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingCart, CreditCard } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  description: String,
  icon: String,
  color: String
})

defineEmits(['click'])

const iconComponent = computed(() => {
  const icons = {
    ShoppingCart,
    CreditCard
  }
  return icons[props.icon]
})

const gradientClass = computed(() => {
  const gradients = {
    blue: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
    green: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
  }
  return gradients[props.color] || gradients.blue
})
</script>
