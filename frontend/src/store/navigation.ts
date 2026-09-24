import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchNavItems, type NavItem } from '@/services/navigation'

export const useNavigationStore = defineStore('navigation', () => {
  const items = ref<NavItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      items.value = await fetchNavItems()
    } catch (e) {
      items.value = []
      error.value = e instanceof Error ? e.message : '导航加载失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  function retry() {
    return load()
  }

  return { items, loading, error, load, retry }
})
