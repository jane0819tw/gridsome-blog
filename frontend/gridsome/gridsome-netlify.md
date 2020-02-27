---
tags: ['gridsome','ssr','deploy','netlify']
date: 2020-02-27
description: Netlify是用於部署和託管Gridsome網站的出色解決方案。Netlify是一個統一的平台，可自動執行您的代碼以創建高性能，易於維護的網站和Web應用程序。
cover_image: ../img/netlify.jpg
---
# deploy on Netlify

Netlify是用於部署和託管Gridsome網站的出色解決方案。Netlify是一個統一的平台，可自動執行您的代碼以創建高性能，易於維護的網站和Web應用程序。它們提供了連續的部署（由Git觸發的構建），智能的全局CDN，完整的DNS（包括自定義域），自動化的HTTPS，資產加速等。

### 1. 到[netify官網](https://www.netlify.com/)註冊
### 2. 點選**new site for git**
### 3. 選擇你用git的地方，選擇你的專案
填上<code>gridsome build</code>
<code>dist</code>
![](https://i.imgur.com/sOyo68X.png)

按下**deploy site**
出現這個網址連結就成功囉
![](https://i.imgur.com/keosq05.png)

如果出現問題會顯示failed，建議在本地端可以先build一次。

![](https://i.imgur.com/LLTgMdF.png)

如果錯誤訊息顯示<code>window is not defined</code>或是<code>document is not defined</code>，表示<code>ssr(server side rendering)</code>問題，要把有使用到第三方套件的東西移除或是改其他方式進行。
gridsome ssr問題[文件參考](https://gridsome.org/docs/assets-scripts/#without-ssr-support)