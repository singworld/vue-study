<script setup lang="ts">
/**
 * 练习 4: Ref 类型标注和模板引用
 *
 * 知识点：
 * - ref<T>() 泛型标注
 * - 模板引用类型
 * - 非空值处理方式
 */
import RefDemo from '@/components/exercises/RefDemo.vue'
</script>

<template>
  <div class="ref-type">
    <h2>练习 4: Ref 类型标注</h2>

    <div class="info-box">
      <h4>知识点</h4>
      <ul>
        <li><code>ref&lt;T&gt;()</code> 泛型标注复杂类型</li>
        <li>简单类型自动推导，复杂类型需要泛型</li>
        <li>模板引用：<code>ref&lt;HTMLElement | null&gt;(null)</code></li>
        <li>非空处理：可选链 <code>?.</code>、逻辑判断、非空断言 <code>!</code></li>
      </ul>
    </div>

    <RefDemo />

    <div class="code-hint">
      <h4>关键代码</h4>
      <pre><code>// 简单类型 - 自动推导
const count = ref(0)        // Ref&lt;number&gt;
const msg = ref('hello')    // Ref&lt;string&gt;

// 复杂类型 - 泛型指定
interface User {
  id: number
  name: string
}
const user = ref&lt;User | null&gt;(null)
const list = ref&lt;User[]&gt;([])

// 模板引用
const inputRef = ref&lt;HTMLInputElement | null&gt;(null)

// 非空处理
inputRef.value?.focus()     // 可选链
if (inputRef.value) { ... } // 逻辑判断
inputRef.value!.focus()     // 非空断言（慎用）</code></pre>
    </div>
  </div>
</template>

<style scoped>
.ref-type {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.info-box {
  background: #fce4ec;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-box ul {
  margin: 10px 0 0;
  padding-left: 20px;
}

.code-hint {
  background: #263238;
  color: #aed581;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.code-hint h4 {
  color: #fff;
  margin: 0 0 10px;
}

.code-hint pre {
  margin: 0;
  overflow-x: auto;
}

code {
  font-family: 'Fira Code', monospace;
}
</style>
