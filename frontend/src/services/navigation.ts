import { appRoutes } from '@/router/routes'

export interface NavItem {
  path: string
  title: string
}

/**
 * 异步加载侧边导航入口。
 * 入口派生自路由表：新增带 meta.title 的路由后会自动出现在结果中；
 * 后续若改为接口下发，只需替换这里的取数逻辑。
 * 数据异常（为空、缺字段、地址无效或重复）会抛出错误，交由调用方展示重试。
 */
export async function fetchNavItems(): Promise<NavItem[]> {
  const raw: NavItem[] = []
  for (const route of appRoutes) {
    const title = route.meta?.title
    if (route.meta?.nav === false || !title) continue
    raw.push({ path: route.path, title })
  }
  return validateNavItems(raw)
}

export function validateNavItems(data: unknown): NavItem[] {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('导航数据异常：返回内容为空或格式不正确')
  }
  const seen = new Set<string>()
  return data.map((item, index) => {
    const it = item as Partial<NavItem> | null
    if (!it || typeof it.path !== 'string' || !it.path.startsWith('/')) {
      throw new Error(`导航数据异常：第 ${index + 1} 项地址无效`)
    }
    if (typeof it.title !== 'string' || !it.title.trim()) {
      throw new Error(`导航数据异常：第 ${index + 1} 项缺少名称`)
    }
    if (seen.has(it.path)) {
      throw new Error(`导航数据异常：地址 ${it.path} 重复`)
    }
    seen.add(it.path)
    return { path: it.path, title: it.title.trim() }
  })
}
