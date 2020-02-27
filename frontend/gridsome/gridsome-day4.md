---
tags: ['gridsome','templates','day4','g-image']
date: 2020-02-25
description: 載入資料夾的md文章,g-image,templates。
cover_image: ../img/gridsome.png
---
#  (實戰) gridsome 建部落格day4-- 載入資料夾的md文章,g-image,templates
## 教學的重點
1. 從 graphQL query出需要的資料並在畫面做顯示
2. 介紹g-image
3. 路徑前往 templates 的檔案

* 需要安裝幾個套件:
1. <code>source-filesystem</code>: 將文件轉換為可以使用GraphQL在組件中獲取的內容
2. <code>transformer-remark</code>: 把md文件轉換成html。
3. <code>github-markdown-css</code>: 把md檔案的內容加上css。
## source-filesystem 套件
將文件轉換為可以使用GraphQL在組件中獲取的內容。
### 安裝
* <code>yarn add @gridsome/source-filesystem</code>
* <code>npm install @gridsome/source-filesystem</code>

## transformer-remark 套件
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
        path: 'frontend/**/*.md',
        typeName: 'mdPost',
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
<code>path</code>：md檔的位置。

<code>typeName</code>: 表示會在graphQL裡面建立一個以<code>mdPost</code>為主的架構樹。
### 使用
在整個資料夾底下第一層建立<code>frontend</code>資料夾放置<code>.md</code>的檔案。
在.md檔案裡面的開頭用<code>- - -</code>包含的屬性，會變成graphQL中的node其中的屬性，可以在node中取得<code>tags</code>,<code>date</code>,<code>description</code>,<code>cover_image</code>。

```typescript=
// .md
---
tags: ['frontend work','css','flexbox']
date: 2020-02-05
description: 在css中，可以使用flex來做一維布局的排版...
cover_image: ../img/flexbox.png
---
```
這時候在終端機按下<code>ctrl+c</code>終止，輸入<code>gridsome develop</code>，點下grapgQL data的網址<code>http://localhost:8082/___explore</code>。

![](https://i.imgur.com/y3nEhVJ.png)

到達這個地方，按下旁邊docs展開，會看到網站的資料被載入graphQL data，包含了剛剛設定的<code>mdPost</code>還有所有<code>mdPost</code>的集合<code>allMdPost</code>。

![](https://i.imgur.com/9MHBbmT.png)

在左邊我們練習載入所有的<code>mdPost</code>graphQL語法，利用一個query包住，就可以把結果列出來在右邊的部分，表示我們下的搜尋語法，會得到右邊的結果。


![](https://i.imgur.com/nqDOgvU.png)
```typescript=
query{
  allMdPost{
    edges{
      node{
        path
        tags
        date
        description
        title
        content
        cover_image
      }
    }
  }
}
```
將這一段query複製到<code>Frontend.vue</code>裡面，並加上<code>page-query</code>的標籤，表示這一page下的query內容
![](https://i.imgur.com/b5jRxtG.png)

可以在下面script使用<code>this.$ page.allMdPost.edges</code>或是在html的部分使用<code>{{$page.allMdPost.edges}}</code>列出來。
```typescript=
// 列出所有文章標題
ul 
    li(v-for="{node} in $page.allMdPost.edges")
      p {{node.title}}
```
![](https://i.imgur.com/7laMzF2.png)
這樣就成功載入了！

然後做一下排版和css調整，就可以得到下方的樣子。
![](https://i.imgur.com/ZLjLl0r.png)
```typescript=
//
ul 
    li(v-for="{node} in $page.allMdPost.edges")
      .post
        .img_box
          g-image(:src="node.cover_image" fit="contain")
          time {{getDate(node.date)}} 
          .dark_cover
        .tags
          span(v-for="tag in tags") {{tag}}
        h2(v-html="node.title")
        hr
        div.short-text(v-html="node.excerpt || node.description")
        g-link.more-link(:to="node.path") MORE
```
這段有一些幾個需要解釋的地方，
* <code>g-image</code>: gridsome有一個內置的<code>g-image</code>組建，可以輸出優化的漸進圖像，還可以調整大小來裁切。
預設情況是<code>base64</code>的模糊圖像，使得模糊圖像位於與真實圖像尺寸相同的容器中，因此在加載圖像時不會跳躍。
當圖像在視口中時，一個Intersection Observer會將基本圖像交換為較大的圖像。（延遲加載）
可以設定屬性來裁剪，更多屬性可以參考[文件](https://gridsome.org/docs/images/#images)。

```typescript=
<g-image src="./image.png" width="500" height="500" fit="contain"/>
```

* <code>getDate</code>: 是底下的methods方法，寫在這裡。
```typescript=
// Frontend.vue
export default {
  methods:{
  getDate(dateStr){
    let date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()},${date.getFullYear()}`;
  }
  }
};

```
* <code>g-link(:to="node.path")</code>：最後的這個連結前往這篇文章的path，點下之後卻出現not found。
還記得嗎?我們在<code>gridsome.config.js</code>有設定如下：

```typescript=
// gridsome.config.js
{
      use: '@gridsome/source-filesystem',
      options: {
        path: 'frontend/**/*.md',
        typeName: 'mdPost',
        remark: {
          // remark options
        }
      }
    }
```
表示我們需要在<code>templates</code>裡面建立一個<code>mdPost.vue</code>來裝該篇.md文章，找不到<code>mdPost.vue</code>作為該路竟要前往的地方，所以才出現not found。
* <code>Templates</code>在collections 被用來為nodes創造單一page，nodes需要一個相對應的page來展現在他相對應的url上。

## templates/mdPost.vue
所以我們單篇的文章套用的page就會變成這個檔案: <code>mdPost.vue</code>。
graphQL必須動態載入單篇文章，我們用<code>$ path</code>作為參數傳入，設定方法為在query後面定義的參數類型<code>$ path:String!</code>，驚嘆號表示<code>required</code>，在篩選的屬性再用<code>$path</code>傳入。
* 這裡要注意，不是所有的屬性都可以作為參數傳入，要打開schema來看，可以看到作為query的屬性只有<code>id</code>和<code>path</code>，用其他屬性例如title會報錯。

![](https://i.imgur.com/PF6Z5yS.png)

主要的內容如下：
```typescript=
<template lang="pug">
  div
    p this is md custom post
    p {{$page}}
    .time
      time  更新日期: {{formatDate($page.mdPost.date)}}
      .markdown-body(v-html="$page.mdPost.content")
</template>
<page-query>
query ($path:String!){
  mdPost(path:$path){
    id
    path
    content
    date
    title
  }
}
</page-query>
```
文章內容利用<code>$page.mdPost.content</code>來取得。此時我們的版面還沒加上css，使用一個套件<code>github-markdown-css</code>讓版面有美化過。

## github-markdown-css 套件
### 安裝方法有兩種
#### 1.  在需要的檔案中引用
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

這樣就完成<code>Frontend.vue</code>以及<code>mdPost.vue</code>的主要畫面了。