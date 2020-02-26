---
tags: ['gridsome']
date: 2020-02-12
description: 將文件轉換為可以使用GraphQL在組件中獲取的內容。
cover_image: ../img/gridsome.png
---
# gridsome plugin
[gridsome plugin](https://gridsome.org/plugins/)
## source-filesystem
將文件轉換為可以使用GraphQL在組件中獲取的內容。
### 安裝
* <code>yarn add @gridsome/source-filesystem</code>
* <code>npm install @gridsome/source-filesystem</code>

## transformer-remark
Markdown transformer for Gridsome with Remark.
把md文件轉換成html。
### 安裝
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
在底下建立<code>blog</code>資料夾放置<code>.md</code>的檔案。

## github-markdown-css
### 安裝
#### 1.  在需要的檔案中 Blog.vue 引用
* 要在包覆<code>md</code>的div加上<code>markdown-body</code>的class。

```typescript=
// Blog.vue 引用
@import url("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css");
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

```
```typescript=
// Post.vue
div.markdown-body(v-html="$page.post.content")
```

#### 2. 在<code>src/main.js</code>中引用
[參考來源](https://gridsome.org/docs/head/#add-global-head-metadata)
```typescript=
// src/main.js
export default function (Vue, { router, head, isClient }) {
  // 從這裡加入外部css files 
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css'
  })
}
```

## axios
當你要使用[data store api](https://gridsome.org/docs/data-store-api/)
### 安裝
<code>npm install axios</code>

使用 <code>addCollection</code> 來做，新增的<code>typeName</code>會加到<code>graphQL</code>裡面。
```typescript=
// gridsome.server.js

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {

    const { data } = await axios.get('https://www.reddit.com/r/aww.json?raw_json=1')
    const collection = actions.addCollection({
      typeName: 'redditPost',
      route: '/reddit/:id'
    })
    
    // 根據資料的型態來新增需要節點
    for (const item of data.data.children) {
      collection.addNode({
        id: item.data.id,
        title: item.data.title,
        path: `/reddit/${item.data.id}`,
        fields: {
          thumbnail: item.data.thumbnail,
          img: item.data.preview.images[0].source.url
        }
      })
    }


  })
}

// graphQL -show all posts
query { 
  allRedditPost{
    edges{
      node {
        id
        title
        path
        fields{
          thumbnail
          img
        }
      }
    }
  }
}

// graphQL -filter spec post
query {
  redditPost(path: "/reddit/f24c2b") {
    title
    path
    fields{
      thumbnail
    }
  }
}
```
在template底下新增和 <code>typeName</code> 相同的.vue檔案。
