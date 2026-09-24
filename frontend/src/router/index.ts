import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes'

export const APP_NAME = '智能合约安全审计工具'

// 记录各地址上次停留的滚动位置，切走再切回时恢复
const scrollPositions = new Map<string, number>()

const router = createRouter({
  history: createWebHistory(),
  routes: appRoutes,
  scrollBehavior(to, _from, savedPosition) {
    // 浏览器前进/后退时优先恢复浏览器记录的位置
    if (savedPosition) {
      return savedPosition
    }
    const top = scrollPositions.get(to.fullPath)
    if (top != null) {
      return { top }
    }
    return { top: 0 }
  }
})

// 离开页面前记住停留位置
router.beforeEach((to, from) => {
  scrollPositions.set(from.fullPath, window.scrollY)
})

// 标题跟随路由更新
router.afterEach((to) => {
  document.title = to.meta.title || APP_NAME
})

export default router
