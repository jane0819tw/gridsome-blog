---
tags: ['gridsome','templates','day5','wordpress']
date: 2020-02-26
description: 上一篇載入本地端的md檔案，接下來要來介紹載入外部來源wordpress的方式。
cover_image: ../img/gridsome.png
---
#  (實戰) gridsome 建部落格day5-- 載入資料夾的wordpress文章
上一篇載入本地端的md檔案，接下來要來介紹載入外部來源<code>wordpress</code>的方式。
[參考文件](https://gridsome.org/plugins/@gridsome/source-wordpress)
## 安裝套件
* <code>yarn add @gridsome/source-wordpress</code>

```typescript=
// gridsome.config.js
module.exports = {
  plugins: [
    {
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: 'WEBSITE_URL', // required
        apiBase: 'wp-json',
        typeName: 'WordPress',
        perPage: 100,
        concurrent: 10
      }
    }
  ],
  templates: {
    WordPressPost: '/:year/:month/:day/:slug'
  }
}
```
將<code>baseUrl</code>換成wordpress的網站，他會抓取<code>baseUrl/wp-json/wp/v2/posts</code>這個網址的資料。
而裡面的文章會根據<code>typeName</code>產生<code>WordPress</code>相關schema。
打開<code>graphQL</code>查看。
![](https://i.imgur.com/B5PE4xH.png)

將要寫入的東西寫在<code>templates</code>中，先用post就好，可以設定客製化路徑。
：後面的值為<code>node</code>底下的屬性。

前面有提及我的資料主要是以泰國為主，
所以有一個分頁為<code>pages/Thailand.vue</code>，這裡和剛剛的<code>Frontend.vue</code>一樣，列出所有的文章。
方式和<code>Frontend.vue</code>列出文章差不多，這裡就不贅述。

![](https://i.imgur.com/idiCRVu.jpg)

同樣地，我們在templates資料夾底下建立一個<code>WordPressPost.vue</code>來放單一文章資料。
```typescript=
// WordPressPost.vue

<template lang="pug">
Layout
  h1(v-html="$page.wordPressPost.title")
  div(v-html="$page.wordPressPost.content")
</template>

<page-query>
query WordPressPost ($id: ID!) {
  wordPressPost(id: $id) {
    title
    content
    date
    featuredMedia {
      sourceUrl
      altText
      mediaDetails {
        width
      }
    }
    categories {
      id
      title
      path
    }
    tags {
      id
      title
      
    }
  }
}
</page-query>
```
這樣就完成了wordpress的部分了！
另外我也做了首頁，主要方的內容就是載入md和wordpress的文章，取出最新的六篇文章來做展示，可以自己實做看看，這裡就不多贅述了。

完成這幾頁後，我們列出所有文章的單篇架構程式碼是不是重複很高呢？
這時候我們可以使用vue的特色-->元件化，把單篇文章提出來放到<code>components</code>的資料夾底下，供給各個頁面做使用。
接下來我們就來把文章元件化吧！