export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface NavItem {
  path: string
  title: string
}
