---
tags: ['frontend work','css']
date: 2020-02-04
description: scalable and modular architecture for css中文意思為：css可擴展以及可模組化的架構。在撰寫css時，有一定的規範，讓我們可以符合某種規則。
cover_image: ../img/sass-smacss.jpg
---
# SMACSS 與css優先權
scalable and modular architecture for css
中文意思為：css可擴展以及可模組化的架構。
在撰寫css時，有一定的規範，讓我們可以符合某種規則。
## 五大特性
* base bule
最基本的設定，例如一些<code>padding</code>或是<code>margin</code>，一般寫成<code>reset.css</code>，適用於畫面中的每個情形，在這部分不應該使用<code>！important</code>。
```typescript=

html, body, form { margin: 0; padding: 0; }
input[type=text] { border: 1px solid #999; }
a { color: #039; }
a:hover { color: #03C; }
```
* layout rule
將畫面分成幾個section，而每個layout由多個module組成，通常這裡會用id來表示layout，而次要的則用class來表示。
```typescript=
.l-grid,#article {
    width: 80%;
    float: left;
}
```
* module rule
設計中可重複使用的模塊化部件。可以是標註，側邊欄部分，產品列表等。通常使用class來命名，並使用階層式寫裡面的元素(盡量最小化深度)，如果遇到tag，則盡量控制在一層就好。

```typescript=
// folder 方式寫法
.fld{
    span {
        padding: 1em;
    }
}
```
如果多了一個新的元素，可以加上具有語意且可讀性高的class name。
```typescript=
<div class="fld">
    <span class="fld-name">Folder Name</span>
    <span class="fld-items">(32 items)</span>
</div>
```
* state rule
用來表示目前狀態的css：
hide/show, small/big, is-danger/is-safe...
* theme rule
和狀態規則很像，描述模組或是排版看起來的樣子，可能你的網站可以讓使用者設定主題(夜間模式/白天模式)，或是依據地區不同有不同的排版，一般在專案開發中不常使用。

為了要區分上述五種，會加上一些前綴字，命名的方式可以利用
<code>l-</code>表示layout(<code>l-inline</code>)，
而狀態可以使用<code>is-</code>表示狀態(<code>is-danger</code>)，
模組則加上<code>module-</code>。

## 選擇器的效能
要讓css在讀檔案的時候直接找到該類然後進行渲染，所以在非必要的時候(較細節的部份或是模組化裡面)，盡量減少css的階層。
```typescript=
#sidebar
  width: 300px
    .box
      border-radius: 10px
      background-color: #EEE
      h2
        font-size: 14px
        font-weight: bold
      ul
        margin: 0
        padding: 0
        a
          display: block
```
下面這個方式較可以提高效能，在必要的時候再加上階層。

```typescript=
#sidebar 
  width: 300px

.box 
  border-radius: 10px
  background-color: #EEE

.box-header 
  font-size: 14px
  font-weight: bold

.box-body 
  margin: 0
  padding: 0
  a
    display: block
```
## css 優先權
1. 元素內樣式> 
頁面樣式(index.html 的style部分) > 
外部載入(link 或是@import )
2. 後設定>前設定
3. id>class
4. ！important 為最高優先權

如何避免衝突：
* 不要使用寫在元素上的style
* 不要使用過多的class
