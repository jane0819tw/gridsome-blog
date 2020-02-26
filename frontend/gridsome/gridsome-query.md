---
tags: ['gridsome']
date: 2020-02-11
description: 可以在每一個.vue的檔案裡面使用查詢。
cover_image: ../img/gridsome.png
---
# gridsome query 介紹
可以在每一個.vue的檔案裡面使用查詢。
* Use <code> <page-query> </code>in Pages & Templates.

* Use <code> <static-query> </code>in Components.

如果在script裡面就是用下面方式來取得。
```typescript=
this.$page.post
this.$static.post
```
```typescript=
<script>
export default {
  metaInfo() {
    return {
      title: this.$page.redditPost.title
    };
  }
};
</script>
```
如果是在template裡面的話，則不用加上this。
```typescript=
h1 {{$page.redditPost.title}}
```
### graphQL query all nodes 多個節點
而在寫query的時候
```typescript=
<page-query>
query allPost{
  posts: allWordPressPost (sortBy: "title", order: DESC,filter: { id:{in:["f2gb0l","f2mpka"]}}){
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>
```
* <code>allPost</code>是query的名稱，可以省略
* <code>allWordPressPost</code>是取得 graphQL 的節點
* <code>posts:</code>是該節點的結果，可自定義，可以從<code>$ page.posts</code>獲得該節點，如果沒有寫的話，則依據graphQL 的節點名稱搜尋<code>$ page.allWordPressPost</code>。
* <code>sortBy</code>,<code>order</code>可以做為排序依據。
* <code>filters</code> 可以依照條件篩選，可以參考[這一頁](https://gridsome.org/docs/filtering-data/)介紹。
### graphQL query a node 搜尋特定節點
利用()指定裡面的內容。
#### 靜態搜尋
```typescript=
// 在post()利用括號搜尋 
query {
  post(id: "1") {
    title
  }
}
```
#### 動態搜尋
配合動態產生特定頁面的時候，替換原本的query([資料來源](https://graphql.org/learn/queries/#variables))，適合用於template裡面顯示某一篇文章時候。
* <code>($id: ID!)</code>表示宣告query的類型
* 利用<code>$ variableName</code>替代靜態值
* 宣告 <code>$variableName</code> 作為query的接受值

```typescript=
// template/User.vue
query  ($id: ID!){
  user (id: $id){
    path
    id
    name
    username
  }
}
```