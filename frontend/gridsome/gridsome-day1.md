---
tags: ['gridsome','blog','day1']
date: 2020-02-23
description: 這裡要來帶大家利用我學習gridsome的技能來實作一個部落格網站，目前學習gridsome的資源沒有很多，可以參考以下資源...
cover_image: ../img/gridsome.png
---

# (實戰) gridsome 建部落格day1-- 安裝gridsome
這裡要來帶大家利用我學習gridsome的技能來實作一個部落格網站，目前學習gridsome的資源沒有很多，可以參考以下資源:
* [Gridsome - Static Site Generator for Vue](https://www.youtube.com/watch?v=uF3K3IpRfhE&t=1683s)
* [Blazing-Fast Vue and GraphQL with Gridsome](https://www.udemy.com/course/blazing-fast-vue-and-graphql-with-gridsome/)
## 安裝

* <code>yarn global add @gridsome/cli</code>
在終端機輸入<code>gridsome</code>來創建專案，需要先安裝gridsome。
 
* <code>/usr/bin/ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”</code>
如果yarn語法無法使用的話，要先安裝<code>homebrew</code>。

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


* 2. <code>gridsome build</code>(先不要做)
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



依照步驟做到<code>gridsome develop</code>，可以在<code>localhost:8080</code>這個頁面，正常顯示就表示成功了！
![](https://i.imgur.com/9ZfYhBp.png)

在gridsome官網的[starters頁籤](https://gridsome.org/starters/)，有許多開發的作品範例，可以抓下來做研究。
![](https://i.imgur.com/vZAwBqS.jpg)




## 輔助開發套件
1. 在visual studio安裝<code>vetur</code>套件，可以讀vue的語法，讓他有顏色。
2. 在google擴充套件下搜尋**vue.js devtools**套件，
方便開發。
![](https://i.imgur.com/MbZQ3Co.png)

3. 使用sass 和 pug 做撰寫
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
