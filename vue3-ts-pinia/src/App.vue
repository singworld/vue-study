<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const exercises = [
  { path: '/exercises/pinia-counter', name: '练习1: Pinia Counter' },
  { path: '/exercises/pinia-channel', name: '练习2: Pinia 异步' },
  { path: '/exercises/props-emits', name: '练习3: Props/Emits' },
  { path: '/exercises/ref-type', name: '练习4: Ref 类型' }
]
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Vue3 + TypeScript + Pinia 练习</h1>
      <nav class="nav-links">
        <RouterLink
          v-for="ex in exercises"
          :key="ex.path"
          :to="ex.path"
          class="nav-link"
        >
          {{ ex.name }}
        </RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 20px;
  text-align: center;
}

.app-header h1 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.3);
}

.nav-link.router-link-active {
  background: white;
  color: #42b883;
}

.main-content {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
