<template>
  <div class="not-found">
    <div class="nf-code">404</div>
    <h2 class="nf-title">页面不存在</h2>
    <p class="nf-reason">
      无法访问 <code>{{ route.fullPath }}</code> ：地址格式不正确，或该入口不存在、已被移除。
    </p>
    <router-link to="/" class="nf-home">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.not-found {
  max-width: 480px;
  margin: 4rem auto;
  text-align: center;
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
}
.nf-code {
  font-size: 4rem;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
  margin-bottom: 1rem;
}
.nf-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.nf-reason {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  word-break: break-all;
}
.nf-reason code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: monospace;
  color: #dc2626;
}
.nf-home {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
}
.nf-home:hover {
  background: #5a67d8;
}
</style>
