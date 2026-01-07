import './style.css'
import { validateExercise1 } from './exercises/exercise1-basic-types'
import { validateExercise2 } from './exercises/exercise2-array-union'
import { validateExercise3 } from './exercises/exercise3-functions'
import { validateExercise4 } from './exercises/exercise4-interface-type'
import { validateExercise5 } from './exercises/exercise5-generics'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>📝 TypeScript 核心练习</h1>
    <p class="intro">完成每个练习文件中的 TODO(human)，然后点击验证按钮检查结果</p>

    <div class="exercises">
      <div class="exercise-card">
        <h2>练习 1: 基础类型注解</h2>
        <p class="desc">掌握 number, string, boolean 等基础类型</p>
        <div class="tags">
          <span>简单类型</span>
          <span>类型推断</span>
        </div>
        <button id="validate1">验证练习 1</button>
        <div id="result1" class="result"></div>
      </div>

      <div class="exercise-card">
        <h2>练习 2: 数组与联合类型</h2>
        <p class="desc">掌握数组类型注解和联合类型 |</p>
        <div class="tags">
          <span>数组类型</span>
          <span>联合类型</span>
          <span>类型别名</span>
        </div>
        <button id="validate2">验证练习 2</button>
        <div id="result2" class="result"></div>
      </div>

      <div class="exercise-card">
        <h2>练习 3: 函数类型</h2>
        <p class="desc">掌握函数参数和返回值的类型注解</p>
        <div class="tags">
          <span>参数类型</span>
          <span>返回类型</span>
          <span>可选参数</span>
          <span>void</span>
        </div>
        <button id="validate3">验证练习 3</button>
        <div id="result3" class="result"></div>
      </div>

      <div class="exercise-card">
        <h2>练习 4: Interface 和 Type</h2>
        <p class="desc">掌握对象类型的定义和继承</p>
        <div class="tags">
          <span>interface</span>
          <span>type</span>
          <span>继承</span>
          <span>交叉类型</span>
        </div>
        <button id="validate4">验证练习 4</button>
        <div id="result4" class="result"></div>
      </div>

      <div class="exercise-card">
        <h2>练习 5: 泛型</h2>
        <p class="desc">掌握泛型让类型更加灵活可复用</p>
        <div class="tags">
          <span>泛型接口</span>
          <span>泛型函数</span>
          <span>泛型约束</span>
        </div>
        <button id="validate5">验证练习 5</button>
        <div id="result5" class="result"></div>
      </div>
    </div>

    <div class="summary">
      <h2>🎯 知识点总结</h2>
      <table>
        <thead>
          <tr>
            <th>知识点</th>
            <th>语法</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>基础类型</td>
            <td>: 类型</td>
            <td>let age: number = 18</td>
          </tr>
          <tr>
            <td>数组类型</td>
            <td>类型[] 或 Array&lt;类型&gt;</td>
            <td>let arr: string[] = []</td>
          </tr>
          <tr>
            <td>联合类型</td>
            <td>类型1 | 类型2</td>
            <td>let id: number | string</td>
          </tr>
          <tr>
            <td>类型别名</td>
            <td>type Name = 类型</td>
            <td>type ID = number | string</td>
          </tr>
          <tr>
            <td>接口</td>
            <td>interface Name { }</td>
            <td>interface User { id: number }</td>
          </tr>
          <tr>
            <td>泛型</td>
            <td>&lt;T&gt;</td>
            <td>function foo&lt;T&gt;(x: T): T</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`

// 绑定验证按钮事件
document.getElementById('validate1')?.addEventListener('click', () => {
  const results = validateExercise1()
  showResults('result1', results)
})

document.getElementById('validate2')?.addEventListener('click', () => {
  const results = validateExercise2()
  showResults('result2', results)
})

document.getElementById('validate3')?.addEventListener('click', () => {
  const results = validateExercise3()
  showResults('result3', results)
})

document.getElementById('validate4')?.addEventListener('click', () => {
  const results = validateExercise4()
  showResults('result4', results)
})

document.getElementById('validate5')?.addEventListener('click', () => {
  const results = validateExercise5()
  showResults('result5', results)
})

function showResults(elementId: string, results: string[]) {
  const el = document.getElementById(elementId)
  if (el) {
    el.innerHTML = results.join('<br>')
    el.style.display = 'block'
  }
}
