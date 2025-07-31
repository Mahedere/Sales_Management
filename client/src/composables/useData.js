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

// Borrowers data (renamed from lenders)
const borrowers = ref([
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
    return todaysSalesData.value.reduce((total, sale) => total + (sale.total || 0), 0).toFixed(2)
  })

  const overdueBorrowers = computed(() => {
    return borrowers.value.filter((borrower) => {
      const balance = borrower.totalOwed - borrower.totalPaid
      const lastPaymentDate = borrower.lastPayment ? new Date(borrower.lastPayment) : null
      const daysSincePayment = lastPaymentDate
        ? (new Date() - lastPaymentDate) / (1000 * 60 * 60 * 24)
        : Number.POSITIVE_INFINITY
      return balance > 0 && daysSincePayment > 30
    }).length
  })

  const totalBorrowers = computed(() => {
    return borrowers.value.filter((borrower) => borrower.totalOwed - borrower.totalPaid > 0).length
  })

  const itemsSoldToday = computed(() => {
    return todaysSalesData.value.reduce((total, sale) => total + (sale.quantity || 0), 0)
  })

  // Methods
  const saveData = () => {
    localStorage.setItem(
      "businessData",
      JSON.stringify({
        sales: sales.value,
        borrowers: borrowers.value,
      }),
    )
  }

  const loadData = () => {
    const saved = localStorage.getItem("businessData")
    if (saved) {
      try {
        const data = JSON.parse(saved)
        sales.value = data.sales || []
        // Handle both old 'lenders' and new 'borrowers' data
        borrowers.value = data.borrowers || data.lenders || borrowers.value
      } catch (error) {
        console.error("Error loading data:", error)
        // Keep default data if parsing fails
      }
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

    // Update borrower debt if applicable
    if (saleData.customerType === "borrower" && saleData.borrowerId) {
      const borrower = borrowers.value.find((b) => b.id == saleData.borrowerId)
      if (borrower) {
        borrower.totalOwed += sale.total
      }
    }

    saveData()
    return sale
  }

  const addBorrower = (borrowerData) => {
    const borrower = {
      id: Date.now(),
      name: borrowerData.name,
      totalOwed: borrowerData.totalOwed || 0,
      totalPaid: 0,
      lastPayment: null,
    }

    borrowers.value.push(borrower)
    saveData()
    return borrower
  }

  const addPayment = (borrowerId, amount) => {
    const borrower = borrowers.value.find((b) => b.id === borrowerId)
    if (borrower) {
      borrower.totalPaid += Number.parseFloat(amount)
      borrower.lastPayment = new Date().toISOString().split("T")[0]
      saveData()
      return true
    }
    return false
  }

  return {
    items,
    sales,
    borrowers,
    // Keep lenders as alias for backward compatibility
    lenders: borrowers,
    todaysSalesData,
    todaysSales,
    overdueBorrowers,
    totalBorrowers,
    itemsSoldToday,
    saveData,
    loadData,
    addSale,
    addBorrower,
    // Keep addLender as alias for backward compatibility
    addLender: addBorrower,
    addPayment,
  }
}
