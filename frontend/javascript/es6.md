---
tags: ['frontend work','javascript']
date: 2020-02-04
cover_image: ../img/es6.png
description: 將程式碼模組化，表示讓這些東西可以被各個檔案所使用。1. 假設<code>index.js</code>要使用模組，在html檔引入<code>index.js</code>時，加上<code>type='module'</code>。
---

# es6 後的新概念

es: ESMAScript , 是ECMA制訂的標準化指令。
## es6 重要特性

### 1. 模組化
將程式碼模組化，表示讓這些東西可以被各個檔案所使用。
1. 假設<code>index.js</code>要使用模組，在html檔引入<code>index.js</code>時，加上<code>type='module'</code>。
```typescript=
// index.html
<script type="module" src="./index.js"></script>
```

2. 建立一個<code>module</code>資料夾，放模組化的檔案<code>module.js</code>。
有兩種方法可以匯出：<code>export</code> ,<code>export default</code>。

--<code>export</code> : 公開使用名稱，所以加上<code>{}</code>,在import時也要加上<code>{}</code>
```typescript=
// module.js
let name = 'jane'
export {name}

// 也可以寫成
export let name = 'jane'
```
```typescript=
// index.js
import {name} from 'module/module.js'
```

-- <code>export default</code>: 一個值，所以不必加上<code>{}</code>。
```typescript=
// module.js
let name = 'jane'
export default name
```
```typescript=
// index.js
import name from 'module/module.js'
// 如果加上{}也可以寫成
import {default as name} from 'module/module.js'
```
### 2. 箭頭函數
箭頭函數裡面<code>this</code>指的是宣告此函數的區域，在setTimeout裡面如果使用<code>=></code>,表示往外一層宣告函式的地方，如下表示，宣告func2的地方是object，因此回傳object。
```typescript=
let object = {
  func1: function () {
    setTimeout(function () {
    // this表示這個函式宣告的地方，setTimeout是在window下宣告的
      console.log(this)
    }, 1000)
  },
  func2: function () {
    setTimeout(() => {
    // this往外一層 產生func2的地方
      console.log(this)
    }, 1000)
  }
}

object.func1()
object.func2()
```
### 3. 函式引數預設值
使用
```typescript=
function foo(height=100){
// 不給直的時候會有預設值
}
```
取代
```typescript=
function foo(height){
// 當height 是falsy 的時候 0 或空字串 還是會回傳50
let h = height || 50
} 

```
### 4. 模板字串
```typescript=
let name = 'jane'
console.log(`hello, I am ${name}`)
```
### 5. 解構賦值
可以方便從<code>陣列</code>或<code>物件</code>提取值給定義的變數

-- 陣列
```typescript=
let foo = ['one','two','three']
let [first,,third] = foo
console.log(third)
```
也可以達到交換（解構交換），要記得加分號。
```typescript=
let a =1
// Cannot create property 'undefined' on number '3'
// need to add ; 因為後面會自動沒有換行 let b = 2[a,b] = [b,a]
let b = 2;
[a,b] = [b,a]
console.log(a,b)
```

-- 物件 

記得裡面的名稱要和屬性一樣 否則會出現undefined 
```typescript=
const student = {
  name2: 'Ming',
  age: '18',
  city: 'Shanghai'
};

const { name3, age, city } = student;
console.log(name3); // undefined
console.log(age); // "18"
console.log(city); // "Shanghai"
```

### 6. 延展操作符
可以延展陣列或物件 
-- 用來複製
```typescript=
let arr = [1,2,3]
let arr2 = [...arr]
arr2[0] = 5
// arr2 = [5,2,3]
```
### 7. 物件key簡寫
若key的名稱和變數名稱相同，簡寫如下：
```typescript=
const name = 'jane',age = 22
const worker = {name,age}
// 省了：name
```
### 8. let, const
作用域限制在<code>block</code>，而<code>var</code>被限制<code>function</code>。
### 9. Promise
一種非同步設計的解決方式，包含三種狀態：
<code>pending</code>,<code>resolve</code>,<code>reject</code>。
```typescript=
const promise = new Promise(function(res,rej){
    // true 表示非同步成功
    if(true){
        res()
    }else{
        rej()
    }
})
```
promise 建構函式接收一個函式做引數，該函式兩個引數第一個會將狀態從<code>pending->resolve</code>，第二個將狀態從<code>pending->reject</code>。
生成後可以用<code>then()</code>回撥結果。
```typescript=
promise.then(function(value){
// success
},function(error){
// failed
})
```
實際用法：
```typescript=
const logAsync = (msg,time)=>{
    return new Promise((res,rej)=>{
        if(msg && time){
            setTimeout(()=>{
                console.log(msg)
                res()
            },time)
        }else{
            rej()
        }
    })
}
// 因為回傳的事Promise結果，所以可以使用then 回撥
logAsync('show after 1s',1000)
.then(()=>{return logAsync('show after 1.5s',1500)})
.then(()=>{return logAsync('show after 2s',2000)})
```
## es7 重要特性
### 1. includes
回傳boolean 值是否包含在陣列。
```typescript=
let arr = ['a','b','c']
arr.includes('c') // true
```
### 2. 指數操作符 **
```typescript=
2**10
```

## es8 特性
### 1. padStart padEnd 
來在字串前/後補足一定的字串數量,所帶的參數為（字串的目標長度,用來補足的字串）,如果沒有第二個參數的話則是用 " " 代替。

```typescript=
let str = 'test' // len  =4

str.padStart(5,'10000')// 用'10000' 來補足 'test'--> '10000test',但其長度超過5
// ,所以只取補足字串左邊起算起---> '10000'

str.padEnd(6,'10000') // 加在字串後面並補足到六位： 'test10'

'0.0'.padEnd(20) // "0.0                 "
```
### 2. async / await 
async是Promise的語法糖(後方可以用then連接)，function標記成async，裡面就可以寫await 同步語法(一定要寫在async的function內才可以)，表示有結果後再執行下一步。
```typescript=
// async await 搭配 axios 實作

async function getFakeData() {
  await axios.get('https://my-json-server.typicode.com/typicode/demo/posts').then(res => {
    console.log(res)
  })
  // 接收到之後才會執行下一行
  console.log('after axios')
}
getFakeData().then(() => {
  console.log('after async')
})
// res-> after axios -> after async
// 如果把 await 刪除，就沒有同步的效果出現順序：
// after axios -> after async -> res
```
### 3. Object.value(obj),Object.key(obj),Object.entries(obj)
這些會回傳value陣列, key陣列, 以[key,value] 為元素的陣列。
## es9 重要特性
### 1. rest 引數/spread 屬性
```typescript=
const myObject = {
  a1: 1,
  b: 2,
  c: 3
};

const { a1, ...x } = myObject;
console.log(a1, x) // 1, {b:2,c:3}
```
