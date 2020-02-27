---
tags: ['gridsome','blog','day3','g-link']
date: 2020-02-24
description: 上一次提及的這個架構，先拆成一步一步來完成吧！
cover_image: ../img/structure.png
---
# (實戰) gridsome 建部落格day3-- g-link

![](https://i.imgur.com/h1pfabY.png)

上一次提及的這個架構，先拆成一步一步來完成吧！
## g-link 
```typescript=
<g-link to="/about/">About us</g-link>
```
g-link可以前往<code>pages</code>底下的同名.vue檔。
先建立<code>pages/Frontend.vue</code>還有<code>pages/Thailand.vue</code>兩個檔案，依照下面方式加入內容: <code>template</code>這頁的html內容,<code>script</code>這頁的javascript內容,<code>style</code>這頁的樣式內容,先簡單顯示該頁面的資訊即可。
```typescript=
// pages/Frontend.vue
<template lang="pug">
  h1 frontend page
</template>
<script>
export default {};
</script>
<style lang="sass">

</style>
```
在Index.vue裡面利用g-link做鏈結前往那些頁面，將template的部分改成：
```typescript=
// pages/在Index.vue
<template lang="pug">
  Layout
    h1 index page! 
    ul
      li
        g-link(to="/frontend") frontend
      li
        g-link(to="/thailand") thailand
</template>
```
<code>Index.vue</code>
![](https://i.imgur.com/TJz4iZu.png)
<code>Frontend.vue</code>
![](https://i.imgur.com/3zN1VlW.png)
這樣就成功連結這兩頁的互動了！ 

## 載入本地md檔
接下來，我們希望載入資料夾中的md文章，該如何做呢？
