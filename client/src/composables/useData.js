import { ref, computed } from "vue"

// Items data
const items = ref([
  "Glass filter kene medeb",
  "Feren motor piston",
  "Maskeriya",
  "Parawlet",
  "Ber",
  "Parawel sporto",
  "Ye mebrat",
  "Fog lamp",
  "Bearing 30311",
  "Motor Chinga",
  "Dinamo belt",
  "Kortelo",
  "Yehoala karakino",
  "Chinga meweterya",
  "Yemoter masnesha",
  "Push buttun",
  "Ye marsh cabo",
])

// Sales data
const sales = ref([])

// Lenders data
const lenders = ref([
  { id: 1, name: "Abel Mekonnen", totalOwed: 1500, totalPaid: 800, lastPayment: "2024-01-15" },
  { id: 2, name: "Muluwork Abebe", totalOwed: 2200, totalPaid: 2200, lastPayment: "2024-01-20" },
  { id: 3, name: "Yared Tadesse", totalOwed: 800, totalPaid: 300, lastPayment: "2024-01-10" },
  { id: 4, name: "Hana Kebede", totalOwed: 1200, totalPaid: 600, lastPayment: "2024-01-18" },
  { id: 5, name: "Biniam Tsegaye", totalOwed: 950, totalPaid: 0, lastPayment: null },
])

export function useData() {
  // Computed properties
  const todaysSalesData = computed(() => {
    const today = new Date().toDateString()
    return sales.value.filter((sale) => new Date(sale.timestamp).toDateString() === today)
  })

  const todaysSales = computed(() => {
    return todaysSalesData.value.reduce((total, sale) => total + sale.total, 0).toFixed(2)
  })

  const overdueLenders = computed(() => {
    return lenders.value.filter((lender) => {
      const balance = lender.totalOwed - lender.totalPaid
      const lastPaymentDate = lender.lastPayment ? new Date(lender.lastPayment) : null
      const daysSincePayment = lastPaymentDate
        ? (new Date() - lastPaymentDate) / (1000 * 60 * 60 * 24)
        : Number.POSITIVE_INFINITY
      return balance > 0 && daysSincePayment > 30
    }).length
  })

  const totalLenders = computed(() => {
    return lenders.value.filter((lender) => lender.totalOwed - lender.totalPaid > 0).length
  })

  const itemsSoldToday = computed(() => {
    return todaysSalesData.value.reduce((total, sale) => total + sale.quantity, 0)
  })

  // Methods
  const saveData = () => {
    localStorage.setItem(
      "businessData",
      JSON.stringify({
        sales: sales.value,
        lenders: lenders.value,
      }),
    )
  }

  const loadData = () => {
    const saved = localStorage.getItem("businessData")
    if (saved) {
      const data = JSON.parse(saved)
      sales.value = data.sales || []
      lenders.value = data.lenders || lenders.value
    }
  }

  const addSale = (saleData, currentUserId) => {
    const sale = {
      id: Date.now(),
      ...saleData,
      timestamp: new Date().toISOString(),
      userId: currentUserId,
    }

    sales.value.push(sale)

    // Update lender debt if applicable
    if (saleData.customerType === "lender" && saleData.lenderId) {
      const lender = lenders.value.find((l) => l.id == saleData.lenderId)
      if (lender) {
        lender.totalOwed += sale.total
      }
    }

    saveData()
    return sale
  }

  const addLender = (lenderData) => {
    const lender = {
      id: Date.now(),
      ...lenderData,
      totalPaid: 0,
      lastPayment: null,
    }

    lenders.value.push(lender)
    saveData()
    return lender
  }

  const addPayment = (lenderId, amount) => {
    const lender = lenders.value.find((l) => l.id === lenderId)
    if (lender) {
      lender.totalPaid += Number.parseFloat(amount)
      lender.lastPayment = new Date().toISOString().split("T")[0]
      saveData()
      return true
    }
    return false
  }

  return {
    items,
    sales,
    lenders,
    todaysSalesData,
    todaysSales,
    overdueLenders,
    totalLenders,
    itemsSoldToday,
    saveData,
    loadData,
    addSale,
    addLender,
    addPayment,
  }
}
