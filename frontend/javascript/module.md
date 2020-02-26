---
tags: ['notes','javascript','module']
date: 2020-02-03
description: 如果我們的檔案有重複的使用的class或是資料，我們可以利用模組化的方式載入資料。在你的html檔案裡面，要將執行這個頁面的js檔案加上<code>type="module"</code>，
cover_image: ../img/module.png
---
# how to use module in js file
如果我們的檔案有重複的使用的class或是資料，我們可以利用模組化的方式載入資料。
在你的html檔案裡面，要將執行這個頁面的js檔案加上<code>type="module"</code>，
```typescript=
<script type="module" src="./js/index.js"></script>
```
接著在專案底下建立<code>module</code>資料夾，放置被引入的檔案，而在該模組化的檔案裡面，利用<code>export</code>匯出。

## export
1. export 的東西表示公開使用變數 因此需要給名稱來使用 需要加上{}
```typescript=
let quotesData = [your data]
export {quotesData}
```

2. 第二種情況 直接匯出一個變數名稱和數值

```typescript=
export let quotesData = [your data]
```
引用方法為在你的<code>index.js</code>開頭裡面<code>import </code>進來。
```typescript=
import { quotesData } from '../module/quotesData.js'
```

## export default 
如果傳出的是default 表示數值
如果引用的資料是<code>class</code>的話，則是利用: 
```typescript=
export default class Vec2 {}
```
而在引用的時候則不需要{} 直接用名稱就好，或是加上{}
<code>{default as Vec2}</code>


```typescript=
import Vec2 from '/module/test.js'

import { default as Vec2 } from '/module/test.js'
```

