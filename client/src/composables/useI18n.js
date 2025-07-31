import { ref } from "vue"

const currentLanguage = ref("en")

const translations = {
  en: {
    // Dashboard
    selectAction: "Select Action",
    salesInput: "Sales Input",
    borrowerManagement: "Borrower Management",
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
    borrower: "Borrower",
    selectBorrower: "Select Borrower",
    chooseABorrower: "Choose a borrower",
    typeOrSelectBorrower: "Type or select borrower",
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
    export: "Export",
    addNew: "Add New",
    saleAddedSuccessfully: "Sale added successfully!",
    todaysSales: "Today's Sales",
    exportCSV: "Export CSV",
    madeBy: "Made by",
    noSalesRecordedToday: "No sales recorded today",
    confirmExport: "Confirm Export",
    areYouSureExportTodaysSales: "Are you sure you want to export today's sales?",

    // Borrower Management
    searchBorrowerName: "Search borrower name...",
    addBorrower: "Add Borrower",
    addPayment: "Add Payment",
    totalOwed: "Total Borrowed",
    totalPaid: "Total Paid",
    lastPayment: "Last Payment",
    never: "Never",
    paid: "paid",
    noBorrowersFound: "No borrowers found",
    noBorrowersYet: "No borrowers yet",
    addNewBorrower: "Add New Borrower",
    name: "Name",
    initialLoanAmount: "Initial Loan Amount",
    enterBorrowerName: "Enter borrower name",
    enterInitialLoanAmount: "Enter initial loan amount",
    borrowerAddedSuccessfully: "Borrower added successfully!",
    addingPaymentFor: "Adding payment for",
    paymentAmount: "Payment Amount",
    enterPaymentAmount: "Enter payment amount",
    paymentRecordedSuccessfully: "Payment recorded successfully!",
  },
  am: {
    // Dashboard
    selectAction: "ተግባር ይምረጡ",
    salesInput: "የሽያጭ ግቤት",
    borrowerManagement: "የብድር ተቀባይ አስተዳደር",
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
    borrower: "ብድር ተቀባይ",
    selectBorrower: "ብድር ተቀባይ ይምረጡ",
    chooseABorrower: "ብድር ተቀባይ ይምረጡ",
    typeOrSelectBorrower: "ይተይቡ ወይም ብድር ተቀባይ ይምረጡ",
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
    export: "ወደ ውጭ ላክ",
    addNew: "አዲስ ይጨምሩ",
    saleAddedSuccessfully: "ሽያጭ በተሳካ ሁኔታ ታክሏል!",
    todaysSales: "የዛሬ ሽያጮች",
    exportCSV: "CSV ወደ ውጭ ላክ",
    madeBy: "የተሰራ በ",
    noSalesRecordedToday: "ዛሬ ምንም ሽያጭ አልተመዘገበም",
    confirmExport: "ወደ ውጭ መላክን ያረጋግጡ",
    areYouSureExportTodaysSales: "የዛሬን ሽያጮች ወደ ውጭ መላክ ይፈልጋሉ?",

    // Borrower Management
    searchBorrowerName: "የብድር ተቀባይ ስም ይፈልጉ...",
    addBorrower: "ብድር ተቀባይ ይጨምሩ",
    addPayment: "ክፍያ ይጨምሩ",
    totalOwed: "ጠቅላላ የተበደረ",
    totalPaid: "ጠቅላላ የተከፈለ",
    lastPayment: "የመጨረሻ ክፍያ",
    never: "በጭራሽ",
    paid: "ተከፍሏል",
    noBorrowersFound: "ምንም ብድር ተቀባዮች አልተገኙም",
    noBorrowersYet: "ገና ብድር ተቀባዮች የሉም",
    addNewBorrower: "አዲስ ብድር ተቀባይ ይጨምሩ",
    name: "ስም",
    initialLoanAmount: "የመጀመሪያ የብድር መጠን",
    enterBorrowerName: "የብድር ተቀባይ ስም ያስገቡ",
    enterInitialLoanAmount: "የመጀመሪያ የብድር መጠን ያስገቡ",
    borrowerAddedSuccessfully: "ብድር ተቀባይ በተሳካ ሁኔታ ታክሏል!",
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
