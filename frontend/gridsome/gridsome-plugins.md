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


## gridsome fontawesome
[gridsome fontawesome](https://gridsome.org/docs/assets-svg/)
[vue fontawesome](https://github.com/FortAwesome/vue-fontawesome#using-regular-icons)
Vue提供了一個套件，讓你不需要一次載入所有的樣式，只載入你會用到的icon樣式。
### 安裝
安裝
* <code>@fortawesome/vue-fontawesome</code>
* <code>@fortawesome/fontawesome-svg-core</code>
* <code>@fortawesome/free-brands-svg-icons</code>。
```typescript=
npm i -D @fortawesome/{vue-fontawesome,fontawesome-svg-core,free-brands-svg-icons}
```
這種寫法表示一次裝好幾個套件，等同於下面的寫法：
```typescript=
npm i -D @fortawesome/vue-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons
```
### 匯入套件
接下來需要在項目中打開（或創建）src/main.js文件並添加以下內容，並將該component新增至全域，在各頁面可以直接使用。
要使用的icon從<code>@fortawesome/free-brands-svg-icons</code>載入，
<code>faGithub</code>表示<code>fa-github</code>的圖示，需要各自引入，才可以在元件中做使用。
```typescript=
// src/main.js
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false;
library.add(faGithub, faTwitter)

export default function (Vue) {
  Vue.component('font-awesome', FontAwesomeIcon)
}
```
### 直接使用
在各個頁面就可以謢經用這個方式使用font awesome，陣列裡的值為class的名稱。
```typescript=
<font-awesome :icon="['fab', 'github']"/>
<font-awesome :icon="['fab', 'twitter']"/>
```
