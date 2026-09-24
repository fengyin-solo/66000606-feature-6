import type { RouteRecordRaw } from 'vue-router'
import AuditView from '@/views/AuditView.vue'
import PatternsView from '@/views/PatternsView.vue'
import HistoryView from '@/views/HistoryView.vue'
import GasView from '@/views/GasView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题：用于顶部标题与 document.title */
    title?: string
    /** 设为 false 时不作为侧边导航入口（默认展示所有带 title 的路由） */
    nav?: boolean
  }
}

/**
 * 应用路由表，侧边导航入口由此派生：
 * 新增带 meta.title 的路由后会自动出现在侧边栏。
 * 注意：前四个入口的名称与顺序保持不变。
 */
export const appRoutes: RouteRecordRaw[] = [
  { path: '/', component: AuditView, meta: { title: '合约审计' } },
  { path: '/patterns', component: PatternsView, meta: { title: '漏洞模式库' } },
  { path: '/history', component: HistoryView, meta: { title: '审计历史' } },
  { path: '/gas', component: GasView, meta: { title: 'Gas分析' } },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
    meta: { title: '页面不存在', nav: false }
  }
]
