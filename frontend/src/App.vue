<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">Solo Project</h1>
      <span v-if="currentTitle" class="page-title">{{ currentTitle }}</span>
    </header>
    <div class="app-body">
      <aside class="sidebar">
        <nav class="nav-menu">
          <p v-if="navStore.loading" class="nav-status">导航加载中…</p>
          <div v-else-if="navStore.error" class="nav-error">
            <p class="nav-error-text">{{ navStore.error }}</p>
            <button type="button" class="nav-retry" @click="navStore.fetchNav()">重试</button>
          </div>
          <template v-else>
            <router-link
              v-for="item in navStore.items"
              :key="item.path"
              :to="item.path"
              class="nav-item"
              :class="{ 'nav-item-active': route.path === item.path }"
            >
              {{ item.title }}
            </router-link>
          </template>
        </nav>
      </aside>
      <main ref="mainRef" class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNavStore } from '@/store'

const route = useRoute()
const navStore = useNavStore()

// 顶部标题随当前页面更新：优先取导航数据中的名称，其次路由 meta
const currentTitle = computed(() => {
  const item = navStore.items.find(i => i.path === route.path)
  return item?.title ?? (route.meta.title as string | undefined) ?? ''
})

// 记录各页面滚动位置：切走时保存，切回时恢复到上一次停留的地方
const mainRef = ref<HTMLElement | null>(null)
const scrollPositions = new Map<string, number>()

watch(
  () => route.fullPath,
  (to, from) => {
    if (from && mainRef.value) {
      scrollPositions.set(from, mainRef.value.scrollTop)
    }
    nextTick(() => {
      if (mainRef.value) {
        mainRef.value.scrollTop = scrollPositions.get(to) ?? 0
      }
    })
  }
)

onMounted(() => {
  navStore.fetchNav()
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-shrink: 0;
}
.app-title {
  font-size: 1.5rem;
  font-weight: 600;
}
.page-title {
  font-size: 1rem;
  opacity: 0.85;
}
.page-title::before {
  content: '/';
  margin-right: 0.75rem;
  opacity: 0.6;
}
.app-body {
  display: flex;
  flex: 1;
  min-height: 0;
}
/* 侧边栏宽度随内容自适应并限制范围，入口增多时列表独立滚动，不挤压内容区 */
.sidebar {
  flex: 0 0 auto;
  min-width: 160px;
  max-width: 260px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1rem 0;
  overflow-y: auto;
}
.nav-menu {
  display: flex;
  flex-direction: column;
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
.nav-item-active {
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
.nav-error {
  padding: 0.75rem 1.5rem;
}
.nav-error-text {
  color: #dc2626;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}
.nav-retry {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.375rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
}
.nav-retry:hover {
  background: #5a67d8;
}
.main-content {
  flex: 1;
  min-width: 0;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
