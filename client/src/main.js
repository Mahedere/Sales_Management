import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./style.css"

// Import components
import LoginPage from "./components/LoginPage.vue"
import Dashboard from "./components/Dashboard.vue"
import SalesInput from "./components/SalesInput.vue"
import LenderManagement from "./components/LenderManagement.vue"

const routes = [
  { path: "/", name: "login", component: LoginPage },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
  { path: "/sales", name: "sales", component: SalesInput },
  { path: "/lenders", name: "lenders", component: LenderManagement },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount("#app")
