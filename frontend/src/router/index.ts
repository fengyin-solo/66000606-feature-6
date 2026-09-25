import { createRouter, createWebHistory } from 'vue-router'
import AuditView from '@/views/AuditView.vue'
import PatternsView from '@/views/PatternsView.vue'
import HistoryView from '@/views/HistoryView.vue'
import GasView from '@/views/GasView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const APP_NAME = 'Solo Project'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "audit", component: AuditView, meta: { title: "合约审计" } },
    { path: "/patterns", name: "patterns", component: PatternsView, meta: { title: "漏洞模式库" } },
    { path: "/history", name: "history", component: HistoryView, meta: { title: "审计历史" } },
    { path: "/gas", name: "gas", component: GasView, meta: { title: "Gas分析" } },
    // 兜底：地址格式错误或入口不存在时进入说明页，而不是空白
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView, meta: { title: "页面不存在" } }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    // 浏览器前进/后退时恢复窗口滚动位置
    return savedPosition ?? { top: 0 }
  }
})

// 浏览器标题随路由更新，从其它入口直接进入时同样生效
router.afterEach((to) => {
  const title = to.meta?.title as string | undefined
  document.title = title ? `${title} - ${APP_NAME}` : APP_NAME
})

export default router
