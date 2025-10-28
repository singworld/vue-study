# Vue3 学习项目

这是一个Vue3学习仓库，包含Vue3 Composition API的教育材料和实践例子。

## 项目结构

- `01-counter-example.html` - 计数器基础示例
- `02-reactive-ref.html` - 响应式数据示例  
- `03-lifecycle-components.html` - 生命周期和组件示例
- `serve.py` - Python静态服务器脚本

## 如何运行

### 启动静态服务器

使用Python内置的HTTP服务器来访问HTML页面：

```bash
# 方法1: 使用自定义服务器脚本（推荐）
python3 serve.py
# 或者
python serve.py

# 方法2: 直接使用Python内置服务器
python3 -m http.server 8080

# 方法3: 如果系统中只有python2
python -m SimpleHTTPServer 8080
```

### 访问页面

服务器启动后，在浏览器中访问：

- **主页**: http://localhost:8080
- **计数器示例**: http://localhost:8080/01-counter-example.html
- **响应式数据**: http://localhost:8080/02-reactive-ref.html
- **生命周期**: http://localhost:8080/03-lifecycle-components.html

### 停止服务器

在终端中按 `Ctrl + C` 停止服务器。

## 学习路径

建议按以下顺序学习Vue3 Composition API：

1. **基础概念** - 了解Composition API的优势
2. **项目结构** - 熟悉Vue3项目结构
3. **`<script setup>`** - 掌握语法糖的使用
4. **`reactive` vs `ref`** - 理解两种响应式数据的使用模式
5. **`computed`** - 学习计算属性的实现
6. **`watch`** - 掌握数据监听的使用
7. **生命周期钩子** - 了解Composition API中的生命周期
8. **组件通信** - 掌握父子组件间的通信
9. **模板引用** - 学习template refs和defineExpose
10. **依赖注入** - 掌握provide/inject的跨层通信

## 开发哲学

- 增量学习优于全面覆盖
- 代码清晰优于技巧性实现  
- 实践练习与理论学习并重
- 理解概念存在的原因，而不仅仅是如何使用