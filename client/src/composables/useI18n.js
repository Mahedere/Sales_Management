import { ref } from "vue"

const currentLanguage = ref("en")

const translations = {
  en: {
    // Dashboard
    selectAction: "Select Action",
    salesInput: "Sales Input",
    lenderManagement: "Lender Management",
    recordDailySales: "Record daily sales",
    trackLoansPayments: "Track loans & payments",
    dashboard: "Dashboard",

    // Sales Input
    addNewSale: "Add New Sale",
    itemName: "Item Name",
    quantity: "Quantity",
    pricePerUnit: "Price per Unit",
    total: "Total",
    customerType: "Customer Type",
    walkInCustomer: "Walk-in Customer",
    lender: "Lender",
    selectLender: "Select Lender",
    chooseALender: "Choose a lender",
    customerNameOptional: "Customer Name (Optional)",
    typeOrSelectItem: "Type or select item",
    enterQuantity: "Enter quantity",
    enterPrice: "Enter price",
    enterCustomerNameOrLeaveBlank: 'Enter customer name or leave blank for "Walk-in"',
    reviewSale: "Review Sale",
    confirmSale: "Confirm Sale",
    item: "Item",
    customer: "Customer",
    yes: "Yes",
    save: "Save",
    cancel: "Cancel",
    saleAddedSuccessfully: "Sale added successfully!",
    todaysSales: "Today's Sales",
    exportCSV: "Export CSV",

    // Lender Management
    searchLenderName: "Search lender name...",
    addLender: "Add Lender",
    addPayment: "Add Payment",
    totalOwed: "Total Owed",
    totalPaid: "Total Paid",
    lastPayment: "Last Payment",
    never: "Never",
    paid: "paid",
    noLendersFound: "No lenders found",
    noLendersYet: "No lenders yet",
    addNewLender: "Add New Lender",
    name: "Name",
    initialLoanAmount: "Initial Loan Amount",
    enterLenderName: "Enter lender name",
    enterInitialLoanAmount: "Enter initial loan amount",
    lenderAddedSuccessfully: "Lender added successfully!",
    addingPaymentFor: "Adding payment for",
    paymentAmount: "Payment Amount",
    enterPaymentAmount: "Enter payment amount",
    paymentRecordedSuccessfully: "Payment recorded successfully!",
  },
  am: {
    // Dashboard
    selectAction: "ተግባር ይምረጡ",
    salesInput: "የሽያጭ ግቤት",
    lenderManagement: "የብድር አስተዳደር",
    recordDailySales: "የዕለት ሽያጭ መዝግብ",
    trackLoansPayments: "ብድሮችን እና ክፍያዎችን ይከታተሉ",
    dashboard: "ዳሽቦርድ",

    // Sales Input
    addNewSale: "አዲስ ሽያጭ ይጨምሩ",
    itemName: "የእቃ ስም",
    quantity: "ብዛት",
    pricePerUnit: "በአንድ ዋጋ",
    total: "ጠቅላላ",
    customerType: "የደንበኛ አይነት",
    walkInCustomer: "የእግር ደንበኛ",
    lender: "ብድር ሰጪ",
    selectLender: "ብድር ሰጪ ይምረጡ",
    chooseALender: "ብድር ሰጪ ይምረጡ",
    customerNameOptional: "የደንበኛ ስም (አማራጭ)",
    typeOrSelectItem: "ይተይቡ ወይም እቃ ይምረጡ",
    enterQuantity: "ብዛት ያስገቡ",
    enterPrice: "ዋጋ ያስገቡ",
    enterCustomerNameOrLeaveBlank: "የደንበኛ ስም ያስገቡ ወይም ባዶ ይተዉ",
    reviewSale: "ሽያጭ ይገምግሙ",
    confirmSale: "ሽያጭ ያረጋግጡ",
    item: "እቃ",
    customer: "ደንበኛ",
    yes: "አዎ",
    save: "አስቀምጥ",
    cancel: "ሰርዝ",
    saleAddedSuccessfully: "ሽያጭ በተሳካ ሁኔታ ታክሏል!",
    todaysSales: "የዛሬ ሽያጮች",
    exportCSV: "CSV ወደ ውጭ ላክ",

    // Lender Management
    searchLenderName: "የብድር ሰጪ ስም ይፈልጉ...",
    addLender: "ብድር ሰጪ ይጨምሩ",
    addPayment: "ክፍያ ይጨምሩ",
    totalOwed: "ጠቅላላ ዕዳ",
    totalPaid: "ጠቅላላ የተከፈለ",
    lastPayment: "የመጨረሻ ክፍያ",
    never: "በጭራሽ",
    paid: "ተከፍሏል",
    noLendersFound: "ምንም ብድር ሰጪዎች አልተገኙም",
    noLendersYet: "ገና ብድር ሰጪዎች የሉም",
    addNewLender: "አዲስ ብድር ሰጪ ይጨምሩ",
    name: "ስም",
    initialLoanAmount: "የመጀመሪያ የብድር መጠን",
    enterLenderName: "የብድር ሰጪ ስም ያስገቡ",
    enterInitialLoanAmount: "የመጀመሪያ የብድር መጠን ያስገቡ",
    lenderAddedSuccessfully: "ብድር ሰጪ በተሳካ ሁኔታ ታክሏል!",
    addingPaymentFor: "ክፍያ እየተጨመረ ነው ለ",
    paymentAmount: "የክፍያ መጠን",
    enterPaymentAmount: "የክፍያ መጠን ያስገቡ",
    paymentRecordedSuccessfully: "ክፍያ በተሳካ ሁኔታ ተመዝግቧል!",
  },
}

export function useI18n() {
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === "en" ? "am" : "en"
    localStorage.setItem("language", currentLanguage.value)
  }

  const $t = (key) => {
    return translations[currentLanguage.value][key] || key
  }

  // Load saved language
  const savedLanguage = localStorage.getItem("language")
  if (savedLanguage) {
    currentLanguage.value = savedLanguage
  }

  return {
    currentLanguage,
    toggleLanguage,
    $t,
  }
}
