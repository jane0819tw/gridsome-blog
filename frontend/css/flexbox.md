---
tags: ['frontend work','css','flexbox']
date: 2020-02-05
description: 在css中，可以使用flex來做一維布局的排版。Flex可以說是css的一個盒子模型，利用外面那一層來控制盒子裡面的排列狀況，假設我們的盒子叫做.wrapper，而裡面的物件叫做.item。在.wrapper包覆的盒子和flex有關的屬性如下:display、flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content。
cover_image: ../img/flexbox.png
             

---
# flexbox
在css中，可以使用flex來做一維布局的排版。
Flex可以說是css的一個盒子模型，利用外面那一層來控制盒子裡面的排列狀況，假設我們的盒子叫做.wrapper，而裡面的物件叫做.item。在.wrapper包覆的盒子和flex有關的屬性如下: display、flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content。

而關於裡面被排列的元素有order、align-self、flex-basis、flex-grow、flex-shrink這些屬性。首先先來介紹設定在外層盒子.wrapper的屬性。
寫一個<code>#container</code> 包含了七個<code>.box</code>，裡面別用數字1~7來表示裡面的內容，垂直排列並稱滿。
![](https://i.imgur.com/g8QS1i5.png)

## display: flex
加上了flex排列，變成水平排列，並且依據<code>內容大小</code>撐滿空間。
這裡測試了如果給一個固定的寬度，呈現畫面相同。
```typescript=
#container {
    // 加上固定寬度
    // width:1000px;
    display: flex;
    height: 500px;
}
```

![](https://i.imgur.com/spOKovh.png)

如果<code>.box</code>加上一個固定寬度呢？
```typescript=
#container {
    display: flex;
    height: 500px;
}
.box {
    width: 50px
}
```
會發現還是依據元素大小下去分配空間。
![](https://i.imgur.com/EKJdk7g.png)
那麼如果元素特別大會發生什麼事情呢？
```typescript=
#container {
    display: flex;
    height: 500px;
}
.box {
    // 給超大的寬度
    width: 500px
}
```
會發現居然稱滿空間了！
![](https://i.imgur.com/YLyiGqQ.png)
所以第二個重要屬性叫做<code>flex-shrink</code>。
## flex-shrink

<code>flex-shrink</code>屬性總共有兩個數值：0,1，這個屬性決定
在flexbox(外層設定為flex)時候，內部的元素是否參與被壓所空間的比例分配，在display: flex底下，預設的情況是1(要參與被壓縮的空間比例分配)，因此，一個元素500px，早就超過外層的實際大小，預設值1讓元素可以被壓縮來符合外層的大小。

假設我們把上述情形改成<code>.box2</code>不要來參與空間分配<code>flex-shrink: 0</code>: 
```typescript=
#container {
    display: flex;
    height: 500px;
}
.box {
    // 給超大的寬度
    width: 500px
}
// 讓box2不要參與空間分配，保持原來的大小
.box2{
    flex-shrink: 0
}
```
剩下的元素則是依照剩餘空間下去做分配。
![](https://i.imgur.com/NFC5xaF.png)
了解了flex-shrink之後，接著要來理解和他很像的<code>flex-grow</code>膨脹分配。
## flex-grow
可想而知，flex-grow就是將剩餘空間撐滿。和<code>flex-shrink</code>類似，也有兩個數值：0,1，預設為0，不參與剩餘空間的非配，所以還記得我們前面的例子嗎，內部元素只會根據元素大小做分配，沒有撐滿。
如果要把空間撐滿，設定其中幾個box參與膨脹分配：
```typescript=
#container {
    display: flex;
    height: 500px;
}
.box {
    width: 50px
}
.box1,.box2,.box3{
    flex-grow: 1
}
```
發現4,5,6,7維持原來的大小50px，而1,2,3則把剩餘的空間去分配。
![](https://i.imgur.com/Iv3NCIx.png)
## order 
更動排列的順序，預設值為0，承接上面的例子，將第一個和最後一個加上order，數值越大表示排序在後面，而-1可以表示排在最前面。

```typescript=
#container {
    display: flex;
    height: 500px;
}
.box {
    width: 50px
}
.box1,.box2,.box3{
    flex-grow: 1
}
// 將第一個和最後一個加上order
.box1{
    // 因為其他0 只要設定比0大就可以
    order:1
}
.box7{
    // 排在最前面
    order: -1
}
```
順序就受到調整了。
![](https://i.imgur.com/wTke9FN.png)
## flex-direction
調整排列的方向：<code>row</code>,<code>column</code>,<code>row-reverse</code>,<code>column-reverse</code>。
這裡要注意row-reverse，包覆item的class如果是撐滿的情況，會從最右邊開始，如果外層有設定高度的話，也會從底部開始排列喔!
```typescript=
// row-reverse
#container{
  display: flex;
  height: 500px;
  flex-direction: row-reverse;
 }
  /* box 給了固定大小後，如果超過總寬度 會自動shrink: 1 做壓縮*/
.box {
  width: 50px;
}
```
![](https://i.imgur.com/wPIM8lP.png)

```typescript=
// column-reverse
#container{
  display: flex;
  height: 500px;
  flex-direction: column-reverse;
 }
  /* box 給了固定大小後，如果超過總寬度 會自動shrink: 1 做壓縮*/
.box {
  width: 50px;
}
```
![](https://i.imgur.com/KgK2Sn9.png)

## flex-wrap
定義你所使用的容器類型。依據item在超過容器寬度的時候會不會換行，分成single-line單行以及multi-line多行。
<code>flex-wrap: no-wrap(預設)</code>: 不希望東西溢出，強迫不換行。定義下的flex容器是single-line。
<code>flex-wrap: wrap</code>: 不希望東西溢出，強迫換行。定義下的flex容器是multi-line。
<code>flex-wrap: wrap-reverse</code>: 將wrap後的順序顛倒，定義下的flex容器是multi-line。
```typescript=
#container{
  display: flex;
  height: 500px;
  flex-wrap:wrap;
}
.box {
  width: 200px;
}
```
![](https://i.imgur.com/1v7w2qF.png)

## flex-flow
可以把flex-direction和flex-wrap寫在一起，例如flex-flow: column wrap

## justify-content
決定水平排列的規則。
<code>flex-start(預設值)</code>: 對齊起點。
<code>center</code>: 對齊中間。
<code>flex-end</code>: 對齊最後面。
<code>space-around</code>:把剩下的空間平均分配，邊邊空間是一般空間的一半。
<code>space-between</code>: 最邊邊不會留空間，剩下空間平均分配。
<code>space-evenly</code>: 最邊邊會留空間，把剩下的空間平均分配。
## align-items(single-line)
決定垂直排列時的規則。
aligh-items 表示垂直排列的情況，配合單行(single line)的排列下所使用的垂直排列(多行的垂直排列為align-content)，數值和justify-content有些不同，共有<code>flex-start</code>、 <code>center</code> 、<code>flex-end </code>、<code>baseline(根據line-height設定高度來對齊)</code>、<code>stretch(作為預設值，稱滿全部的高度)</code>。
## align-content (multi-line)
和align-items很像，只能在flex屬性為multi-line(wrap或是wrap-reverse)的情況下產生作用。數值和justify-content相同，預設值為stretch。
## align-self
用於排列裡面的物件做客製化的排列，如果該item不同於其他的對齊方式，就可以再設定align-self，表示自己的對齊方式。數值和align-items的種類一樣。
## flex-basis (flex)
在參與排列之前給定它的大小，為子元素基本大小，預設為auto，也可以直接給數值。
