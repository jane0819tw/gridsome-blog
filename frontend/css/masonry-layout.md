---
tags: ['css','frontend work','masonry']
date: 2020-02-16
description: 瀑布流佈局基於網格的佈局，每一行的網格高度是隨機的。
cover_image: ../img/masonry.jpg
---
# css 瀑布流佈局 Masonry Layouts
[瀑布流佈局](https://www.twblogs.net/a/5b8dc2c32b7177188340769b)
瀑布流佈局基於網格的佈局，每一行的網格高度是隨機的。

![](https://i.imgur.com/QXpoSmM.jpg)

### Multi-columns
假設外層<code>.masonry</code>是瀑布流的容器，包含內容物<code>.item</code>。
```typescript=
<div class="masonry"> 
    <div class="item"> 
        <div class="item__content"> </div> 
    </div> 
    <div class="item"> 
        <div class="item__content"> </div>  
    </div> 
    <!-- more items --> 
</div>

```
使用
```typescript=
.masonry
  column-count: 3 // 每一列有幾個
  column-gap: 0 // 每列間距多少
  .item
    break-inside: avoid
    box-sizing: border-box // 包含匡線寬度
```
這幾個主要的屬性，就可以達到瀑布佈局的效果。
[break-inside說明](https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-inside)