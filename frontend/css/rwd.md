---
tags: ['frontend work','css','rwd']
date: 2020-02-05
cover_image: ../img/rwd.png
description: 加上<code><meta name="viewport" content="device-width,initial-scale=1"></code>點擊的目標要夠大才符合裝置視覺效果，加上<code>min-width</code>,<code>min-height</code>遵循mobile-first設計規則，先設計好手機板草稿，決定哪些是重要的東西後,再增加內容。
---
# RWD notes
響應式網頁設計。


## meta
加上<code><meta name="viewport" content="device-width,initial-scale=1"></code>
點擊的目標要夠大才符合裝置視覺效果，加上<code>min-width</code>,<code>min-height</code>
遵循mobile-first設計規則，先設計好手機板草稿，決定哪些是重要的東西後,再增加內容。

## media queries
在不同情況給css表現的方式，寬度限制或是device限制。
使用方法
1. 利用link 加入設定的樣式
```typescript=
<link rel="stylesheet" media="screen and (min-width:500px)" href="over500.css">
```
* 優點： 很多檔案 請求較多
* 缺點： css檔案不會太大
2. 使用＠media 直接寫在相同css file裡面
```typescript=
// base.css
@media screen and (min-width:500px){
    body{
        background-color: #f24
    }
}
```
* 優點： 很少檔案 較少的請求
* 缺點： css很長
3. 使用＠import 直接寫在相同css file裡面(比較消耗效能，不建議)
```typescript=
// base.css
@import url('over500.css') only screen and (min-width: 500px)
```
4. 多條件寬度限制
```typescript=
// base.css
// 只有在500~600px時 會套用
@media screen and (min-width:500px) and (max-width: 600px){
    body{
        background-color: #f24
    }
}
```
## min-width, max-width 用法
為了符合mobile-first ，基本的css是由mobile的情況下去撰寫，而＠media的部分，應該要選擇<code>min-width</code> 去寫，更大的裝置情況，才能符合mobile first的規則。
## grid 排版設計
配合良好的<code>display: flex</code>相關語法，可以讓排版更靈活。
[之前寫的 display flex 文章](https://medium.com/%E5%B0%8F%E9%83%AD-%E0%B9%80%E0%B8%88%E0%B8%99/%E8%8F%9C%E9%B3%A5%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%AD%86%E8%A8%98-css-flexbox-%E4%B8%80%E7%B6%AD%E6%8E%92%E5%88%97%E6%95%99%E5%AD%B8-dd646feb682b)

## 佈局模式
一般開發分成四種佈局模式，會混合使用。

1. column drop
在小螢幕時，以垂直堆疊而成;當螢幕遇到下一個節點，會擴大並讓第一個板塊和第二個板塊並排;第二個節點時，會全部並排在一起，撐滿整個版面。
由左至右，由上而下的佈局。
![](https://i.imgur.com/wZbqGfH.png)

2. mostly fluid
和cloumn fluid 相似，但比較複雜多區塊的排版，在小螢幕時以堆疊呈現，隨著螢幕越來越大，呈現grid的佈局方式。最重要的是，到超過區塊寬度的時候，置中並在兩側留有空白。
![](https://i.imgur.com/bcluUVq.png)

3. layout shifter
隨著寬度增加，變更裡面的排版順序 <code>order</code> 來達到更靈活的排列。
![](https://i.imgur.com/H55DHRr.png)

5. off canvas
可用於側邊sider <code>transform</code> 到畫面之外，在設定一個class表示出現到畫面之中。
![](https://i.imgur.com/Hbbn9qz.png)
## 開發建議
* 適當的大小
人的手指大約 48*48 px，因此設定按鈕的時候，盡量大於這個大小。
```typescript=
button {
    min-width: 48px;
    min-height: 48px; 
}
```
* 字體大小
在手機版的部分，字體如果只有14px會顯得太小，會依據需求設置較大些。
```typescript=
// base
p {
    font-size: 16px / 1.2em
}
// 較大裝置
p{
font-size: 18px / 1.25em
}
```

