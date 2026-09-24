<template>
  <div class="not-found">
    <div class="not-found-code">404</div>
    <h2 class="not-found-title">页面不存在</h2>
    <p class="not-found-reason">
      您访问的地址 <code class="not-found-path">{{ route.fullPath }}</code>
      格式不正确，或对应的功能入口不存在。
    </p>
    <router-link to="/" class="home-link">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.not-found {
  max-width: 640px;
  margin: 4rem auto;
  text-align: center;
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
}
.not-found-code {
  font-size: 4rem;
  font-weight: 800;
  color: #8b5cf6;
  line-height: 1;
  margin-bottom: 1rem;
}
.not-found-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.not-found-reason {
  color: #6b7280;
  margin-bottom: 1.5rem;
}
.not-found-path {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: monospace;
  color: #dc2626;
  word-break: break-all;
}
.home-link {
  display: inline-block;
  background: #8b5cf6;
  color: white;
  text-decoration: none;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
}
.home-link:hover {
  background: #7c3aed;
}
</style>
