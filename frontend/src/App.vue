<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">{{ pageTitle }}</h1>
      <span class="app-subtitle">{{ appName }}</span>
    </header>
    <div class="app-body">
      <aside class="sidebar" :style="{ width: sidebarWidth }">
        <div v-if="navStore.loading" class="nav-status">导航加载中…</div>
        <div v-else-if="navStore.error" class="nav-status nav-error">
          <p class="nav-error-text">{{ navStore.error }}</p>
          <button type="button" class="retry-btn" @click="navStore.retry()">重试</button>
        </div>
        <nav v-else class="nav-menu">
          <router-link
            v-for="item in navStore.items"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ 'nav-item-active': isActive(item.path) }"
          >
            {{ item.title }}
          </router-link>
        </nav>
      </aside>
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { APP_NAME } from '@/router'
import { useNavigationStore } from '@/store/navigation'

const appName = APP_NAME
const route = useRoute()
const navStore = useNavigationStore()

onMounted(() => {
  navStore.load()
})

// 顶部标题跟随当前路由更新
const pageTitle = computed(() => route.meta.title || appName)

// 高亮当前所在位置；从地址栏等其它入口进入时同样生效
const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`)

// 侧边栏宽度随入口数量自适应，内容区自动占据剩余空间
const sidebarWidth = computed(() => {
  const width = 160 + Math.min(navStore.items.length, 10) * 10
  return `${Math.min(width, 260)}px`
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.app-title {
  font-size: 1.5rem;
  font-weight: 600;
}
.app-subtitle {
  font-size: 0.875rem;
  opacity: 0.85;
}
.app-body {
  display: flex;
  flex: 1;
}
.sidebar {
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1rem 0;
  transition: width 0.2s ease;
}
.nav-menu {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 96px);
  overflow-y: auto;
}
.nav-item {
  padding: 0.75rem 1.5rem;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  white-space: nowrap;
}
.nav-item:hover {
  background: #f3f4f6;
  color: #667eea;
}
.nav-item.router-link-active,
.nav-item.nav-item-active {
  background: #eef2ff;
  color: #667eea;
  border-left-color: #667eea;
  font-weight: 500;
}
.nav-status {
  padding: 0.75rem 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}
.nav-error-text {
  color: #dc2626;
  margin-bottom: 0.75rem;
}
.retry-btn {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 0.375rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
}
.retry-btn:hover {
  background: #7c3aed;
}
.main-content {
  flex: 1;
  min-width: 0;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
