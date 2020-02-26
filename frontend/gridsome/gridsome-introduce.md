---
tags: ['frontend work','gridsome']
date: 2020-02-08
description: 什麼是堆疊呢？ 當談論到堆疊的時候，不談論後端語言或資料庫，是一種建構網站的新方法，可提供較好的效能。而什麼不是JAMstack的網站呢？客戶端和伺服器之間緊密耦合的任何專案都不是使用JAMstack構建的。
cover_image: ../img/gridsome.png
---
# gridsome 使用
## gridsome 基本概念
### 什麼是gridsome
：是現代的網站開發框架，用於**構建默認情況下快速運行的網站和應用**，利用vue.js建構超快網站的JAMstack(javascript, api, markup) 建構的技術堆疊。

什麼是堆疊呢？ 
當談論到堆疊的時候，不談論後端語言或資料庫，是一種建構網站的新方法，可提供較好的效能。

而什麼不是JAMstack的網站呢？
客戶端和伺服器之間緊密耦合的任何專案都不是使用JAMstack構建的。
* **使用伺服器端CMS構建的站點**，如WordPress，Drupal，Joomla。
* 一個單片伺服器執行的Web應用程式，它依賴於Ruby，Node或其他後端語言。
* 單頁應用程式，使用同構呈現在執行時在伺服器上構建檢視。

生成靜態HTML文件以創建SEO友好的標記，一旦將其加載到瀏覽器中，該標記就會合併到由Vue.js驅動的SPA中。

從本地文件或外部API獲取內容，將數據存在本地數據庫，graphQL讓你從數據庫提取只需要的數據，並在vue.js組建使用，數據在建構時生成並存成靜態的json。

JAM 是數據驅動的，使用graphQL層從不同源獲取數據，以便動態產生頁面。

![](https://i.imgur.com/RIDnZ2J.png)
### gridsome 特色
使用vue.js, graphQL,webpack來建構網站。
### 為什麼快速
* 1. 預渲染的HTML
gridsome 在建構時預先渲染HTML生成靜態文件。網格站點(Gridsome sites)可以託管在任何地方，也可以放在cdn上面(?)，不需要node.js。
* 2. 自動代碼拆分
聲明的內容將捆綁在一起並隨每個頁面一起提供，意味著頁面永遠不會在瀏覽時加載不必要的代碼。(?)
* 3. PRPL 模式
是一種用來建構和服務漸進式web應用程序(PWA)的模式，重點在應用程序交付和啟動的性能。
-- 將關鍵資源推送到初始URL路由。
-- 渲染初始路徑。
-- 預緩存剩餘的路由。
-- 延遲加載並根據需要創建其餘路由。
## girdsome 安裝使用
* <code>yarn global add @gridsome/cli</code>
使用yarn語法之前，要先安裝homebrew，在終端機輸入
* <code>/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code>

如果command line te (CLT)無法安裝(Xcode的新版本不自动安装Command Line Tools了)出現這個錯誤的話，參考[這篇文章](https://leflacon.github.io/5f155707/)解決。
```typescript=
xcode-select: error: invalid developer directory '/Library/Developer/CommandLineTools'
Failed during: /usr/bin/sudo /usr/bin/xcode-select --switch /Library/Developer/CommandLineTools
```
* <code>brew update</code>
  安裝過brew的話就更新一下，保持最新版本。
  
* <code>brew install yarn</code>
  透過brew來安裝yarn。
  
* <code>brew upgrade yarn</code>
  如果有更新yarn可以下這段語法。
  
* <code>gridsome create my-gridsome-site</code>
  創建一個新項目。
  
* <code>cd my-gridsome-site</code> 

部署方法： 

* 1. <code>gridsome develop </code>
  在以下位置啟動本地開發服務器  <code>http://localhost:8080</code>，可以在 <code>http://localhost:8080/___explore</code> 看到graphQL 的資料。
  
![](https://i.imgur.com/cRCsqZU.png)


* 2. <code>gridsome build</code>
初始化 -讀取項目配置並初始化已安裝的插件等。
加載源 -源插件獲取其數據並更新內部存儲。
創建GraphQL模式 -根據商店中的節點類型生成GraphQL模式。
生成代碼 -生成運行時代碼，例如路由，插件等。
引導完成 -創建包含所有頁面和模板的渲染隊列。
運行GraphQL-執行所有page-query查詢並將結果存儲在json文件中。
編譯資產 -運行webpack來編譯可投入生產的資產。
渲染 HTML-將所有頁面和模板渲染為靜態html文件。
處理文件 -本地文件被複製到dist文件夾中。
處理圖像 -處理本地圖像並將其複製到dist文件夾中。

安裝<code>vetur</code>套件，可以讀vue的語法，讓他有顏色。

## 開始寫 girdsome 
### 使用sass 和 pug 做撰寫
* 安裝SASS
<code>npm install -D sass-loader@7.1.0 node-sass</code> 
(7.1.0比較沒有問題)

* 安裝pug ([參考 gridsome-plugin-pug](https://github.com/gluons/gridsome-plugin-pug))
windows: <code>npm install -D pug gridsome- plugin-pug</code>
mac: <code>yarn add -D pug gridsome-plugin-pug</code>
```typescript=
// gridsome.config.js 加上這段
module.exports = {
	plugins: [
		{
			use: 'gridsome-plugin-pug',
			options: {
				pug: { /* Options for `pug-plain-loader` */ },
				pugLoader: { /* Options for `pug-loader` */ }
			}
		}
	]
};
```

### 新增檔案
在pages底下建立<code>blogHtml</code> folder，然後建立<code>blogPostOne.vue</code>的檔案，新增和<code>About.vue</code>幾乎一樣的內容。
```typescript=
// blogPostOne.vue
<template>
  <Layout>
    <h1>blog post one</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "blog post one"
  }
};
</script>

```
此時輸入資料夾對應的網址，就可以看到畫面。
http://localhost:8080/blog-html/blog-post-one

### 新增不同Layout
如果我們使用的Layout不同該怎麼辦呢？
首先先在Layouts資料夾裡面新增一個Blog.vue的layout，把Default.vue的內容複製過去，假設上面舉的例子<code>blogPostOne.vue</code>，把layout改成新的Blog Layout，
```typescript=
// blogPostOne.vue
<template>
  // 改成新的 BlogLayout
  <BlogLayout>
    <h1>blog post one</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
  </BlogLayout>
</template>

<script>
export default {
  metaInfo: {
    title: "blog post one"
  }
};
</script>

```
這裡的<code>BlogLayout</code>怎麼使用來的呢? 有兩種做法：區域註冊以及全域註冊。
1. 全域註冊
做法和Layout相同，先到<code>main.js</code>，註冊<code>import</code>元件，接著再export的時候宣告該元件的使用，不必在區域中再宣告，可以直接使用。
```typescript=
// main.js
import BlogLayout from '~/layouts/Blog.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // use Blog component in global
  Vue.component('BlogLayout', BlogLayout)
}
```

2. 區域註冊
直接在要使用該元件的頁面上import進來，並且在export的時候加上<code>components</code>，表示元件的使用。
```typescript=
// blogPostOne.vue
<script>
// ~ 表示src資料夾
import BlogLayout from "~/layouts/Blog.vue";

export default {
  components: { BlogLayout },
  metaInfo: {
    title: "blog layout us"
  }
};
</script>
```
如果沒有重新整理的話，按下<code>ctrl+c</code>終止終端機的程序，再執行一次<code>gridsome develop</code>。
### graphQL 查詢
前方提到，我們可以拜訪<code>http://localhost:8080/___explore</code> 來看grapgQL的部分，輸入該網址後，可以到playground的地方，右邊 <code>docs</code> 的部分可以點開看提示。
![](https://i.imgur.com/0q4JPmP.png)

在左側輸入
```typescript=
query {
 metadata {
   // siteName 在 gridsome.config.js 裡面
   siteName
 }
}
// result 
{
  "data": {
    "metadata": {
      "siteName": "my Gridsome site"
    }
  }
}
```
或是
```typescript=
query {
  allPage{
  	path
  }
}
// result 
{
  "data": {
    "allPage": [
      {
        "path": "/404/"
      },
      {
        "path": "/about/"
      },
      {
        "path": "/"
      },
      {
        "path": "/team/"
      },
      {
        "path": "/blog-html/blog-post-one/"
      }
    ]
  }
}
```
可以看到結果。
