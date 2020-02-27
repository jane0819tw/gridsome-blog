---
tags: ['gridsome','day7','pager']
date: 2020-02-27
description: 當文章太多滑不完的時候，我們會希望有page分頁的功能，gridsome提供了一個很好的套件叫做pager供大家使用，接下來就來教大家這個功能吧。
cover_image: ../img/gridsome.png
---
#  (實戰) gridsome 建部落格day7-- 區域引入 pager 分頁功能

當文章太多滑不完的時候，我們會希望有<code>page</code>分頁的功能，gridsome提供了一個很好的套件叫做<code>pager</code>供大家使用，接下來就來教大家這個功能吧！

當我們要使用套件或元件的時候，我們可以分成全域引入或是區域引入，這裡先介紹區域引入。<code>Pager</code>是gridsome自己的套件，所以不需要再安裝什麼。
以剛剛的<code>Thailand.vue</code>繼續，

```typescript=
// script 加入
import { Pager } from "gridsome"
components: {
    Pager,
    Post
  }
```
info將頁面資訊作為<code>props</code>傳給pager。
```typescript=
// template 加入
Pager(:info="$page.allWordPressPost.pageInfo") 
```
這裡傳入的參數<code>perPage</code>表示每頁有幾筆，使用分頁功能。
```typescript=
// query加上
<page-query>
query thailandArticles($page:Int){
  allWordPressPost(perPage:6,page: $page) @paginate{
    pageInfo{
      totalPages
      currentPage
    }
  }
}
```
看到這個表示成功囉！
![](https://i.imgur.com/DddnwmN.png)

完整如下：
```typescript=
// Thailand.vue
<template lang="pug">
Layout
  h1 thailand page
  ul
    li
      g-link(to="/") index
    li
      g-link(to="/frontend") frontend
    li
      g-link(to="/thailand") thailand
  ul 
    li(v-for="{node} in $page.allWordPressPost.edges")
      Post(:post="node")
  Pager(:info="$page.allWordPressPost.pageInfo") //加上這行
  
</template>
<page-query>
query thailandArticles($page:Int){
  allWordPressPost(perPage:6,page: $page) @paginate{
    pageInfo{
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        path
        excerpt
        date
        featuredMedia{
          sourceUrl
         }
        categories{
          title
        }
      }
    }
  }
}
</page-query>
<script>
import Post from "~/components/Post.vue";
import { Pager } from "gridsome";
export default {
  computed: {},
  components: {
    Pager,
    Post
  }
};
</script>
```