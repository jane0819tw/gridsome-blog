---
tags: ['gridsome']
date: 2020-02-13
description: collections 是一群nodes節點的集合，很適合用來製作<code>posts</code>,<code>tags</code>,<code>products</code>列表的資料。可以讓graphQL裡面新增集合節點。有兩種方法可以新增collections：<code>source plugin</code>以及<code>data store API</code>。
cover_image: ../img/gridsome.png
---
# gridsome collections 介紹
collections 是一群nodes節點的集合，很適合用來製作<code>posts</code>,<code>tags</code>,<code>products</code>列表的資料。可以讓graphQL裡面新增集合節點。有兩種方法可以新增collections：<code>source plugin</code>以及<code>data store API</code>。
## data store API
在<code>gridsome.server.js</code>檔案裡面的<code>api.loadSource</code>，
* 利用<code>actions.addCollection('Post')</code>新增集合。
* 利用<code>collection.addNode(obj)</code>新增node節點。

```typescript=
// gridsome.server.js
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {
    const collection = actions.addCollection('Post')

    const { data } = await axios.get('https://api.example.com/posts')

    for (const item of data) {
      collection.addNode({
        id: item.id,
        title: item.title,
        content: item.content
      })
    }
  })
}
```
## source plugin
使用<code>source-wordpress</code>或是<code>source-filesystem</code>等套件載入，這裡使用<code>source-filesystem</code>舉例。

<code>source-filesystem</code>將本地文件轉換為可以使用GraphQL在組件中獲取的內容，一般會配合<code>transformer-remark</code>套件(把md文件轉換成html)的安裝。

### 安裝
-- source-filesystem
* <code>yarn add @gridsome/source-filesystem</code>
* <code>npm install @gridsome/source-filesystem</code>

-- transformer-remark
* <code>yarn add @gridsome/transformer-remark</code>
* <code>npm install @gridsome/transformer-remark</code>
### 用法
一般來說這兩個套件會一起用，用法如下：
```typescript=
// gridsome.config.js
module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        remark: {
          // remark options
        }
      }
    }
  ],
  transformers: {
    remark: {
      // global remark options
    }
  }
}
```
### 使用
根據<code>path</code>在底下建立<code>blog</code>資料夾放置<code>.md</code>的檔案。

## Collections in GraphQL
每一個collections會出現兩個root在schema裡面，根據collection名稱<code>actions.addCollection('Post')</code>或是<code>typeName: 'Post'</code>的名稱建立兩種節點。
* node 節點: <code>Post</code>
* a list of nodes 節點集合: <code>allPost</code>

而<code>template</code>用於為集合中的節點創建單個頁面。節點需要相應的頁面才能顯示在其自己的URL上。
