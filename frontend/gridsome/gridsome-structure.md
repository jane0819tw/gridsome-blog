---
tags: ['gridsome']
date: 2020-02-06
description: 安裝好gridsome之後，架構如下。
cover_image: ../img/gridsome.png
---
# gridsome 檔案架構
安裝好gridsome之後，架構如下。

![](https://i.imgur.com/4WtmQQ2.png)
* <code>gridsome.config.js</code>
gridsome需要這個檔案來運作，套件設定都在這裡設定，一些gridsome套件引入在這裡。
```typescript=
// gridsome.config.js
module.exports = {
  
  siteName: 'Gridsome', // 網站名稱
  siteDescription: '一個gridsome的練習網站。',
  siteUrl: 'https://www.gridsome.org', 
  metadata: {},// 一般要設定什麼嗎
  icon: {
    favicon: {
      src: './src/my-favicon.png',
      sizes: [16, 32, 96]
    },// 可以設定icon在這裏
  plugins: [] // gridsome 套件引入
  
}
```
* <code>girdsome.server.js</code>
通常<code>Data Store API</code> 寫在這個檔案。<code>Data Store API</code>讓你可以在你的graphQL裡面插入你自己的資料節點。
使用<code>api.loadSource()</code>作為接口，這裡以<code>addMetadata</code>舉例，會發現在graphQL的metadata裡面多了<code>message</code>。

```typescript=

module.exports = function (api) {

  api.loadSource(async actions => {

    // addMetadata
    actions.addMetadata('message', 'This is a global text')


  })
}
```
![](https://i.imgur.com/wwijbt2.png)


