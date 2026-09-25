import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { ApiResponse, NavItem } from '@/types'

export interface AuditResult {
  id: string
  filename: string
  score: number
  vulnerabilities: Vulnerability[]
  gasIssues: GasIssue[]
  timestamp: string
}

export interface Vulnerability {
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  line: number
  description: string
  suggestion: string
}

export interface GasIssue {
  functionName: string
  currentGas: number
  optimizedGas: number
  suggestion: string
}

export const useAuditStore = defineStore('audit', () => {
  const results = ref<AuditResult[]>([])
  const currentResult = ref<AuditResult | null>(null)
  const patterns = ref<any[]>([])

  async function uploadAndAudit(code: string, filename: string) {
    const res = await axios.post<ApiResponse<AuditResult>>('/api/audit', { code, filename })
    currentResult.value = res.data.data
    results.value.unshift(res.data.data)
    return res.data.data
  }

  async function fetchPatterns() {
    const res = await axios.get<ApiResponse<any[]>>('/api/patterns')
    patterns.value = res.data.data
  }

  return { results, currentResult, patterns, uploadAndAudit, fetchPatterns }
})

export const useNavStore = defineStore('nav', () => {
  const items = ref<NavItem[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchNav() {
    loading.value = true
    error.value = ''
    try {
      const res = await axios.get<ApiResponse<NavItem[]>>('/api/nav')
      const payload = res.data
      if (!payload || payload.code !== 0 || !Array.isArray(payload.data)) {
        throw new Error(payload?.message || '导航数据返回异常')
      }
      const valid = payload.data.filter(
        (i): i is NavItem => !!i && typeof i.path === 'string' && typeof i.title === 'string'
      )
      if (valid.length === 0) {
        throw new Error('导航数据为空')
      }
      items.value = valid
    } catch (e: any) {
      items.value = []
      const msg = e?.response?.data?.message || e?.message
      error.value = msg ? `导航加载失败：${msg}` : '导航加载失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchNav }
})