---
tags: ['gridsome','gridsome disqus','comments']
date: 2020-02-20
description: 如果想要在網站加上留言的功能，可以使用這個套件isqus。disqus是一個網站的外部服務，可以塗供給你留言的客製化元件。
cover_image: ../img/disqus.png
---
# 加上留言套件vue-disqus
[gridsome disqus 留言套件 文件](https://gridsome.org/docs/guide-comments/#disqus)
如果想要在網站加上留言的功能，可以使用這個套件<code>disqus</code>。
<code>disqus</code>是一個網站的外部服務，可以塗供給你留言的客製化元件。
## 註冊disqus
* 先到[disqus 網站](https://disqus.com/)申請一個帳號。
* 選擇**I want to install Disqus on my site**這個選項(下面)。
![](https://i.imgur.com/Vt3O0fF.png)

* 填入網站資訊按下create site，此時要記住你的<code>website name</code>。

![](https://i.imgur.com/41z60wj.png)

* 當頁面到**What platform is your site on?** ，在底部選擇<code>Universal Code</code>這個選項按鈕。
![](https://i.imgur.com/cJ5jo0L.png)

## 安裝vue-disqus
回到你的專案，打開終端機輸入
```typescript=
yarn add vue-disqus 
// or
npm npm install vue-disqus
```
並檢查<code>package.json</code>是否有這個套件。
接著進到<code>main.js</code>在全域引入。
```typescript=
// main.js
import VueDisqus from 'vue-disqus'
export default function (Vue, { head })  {
  Vue.use(VueDisqus)
}
```
然後到你的文章要加入留言套件的地方。
<code>shortname</code>屬性表示剛剛設定的<code>website name</code>。
<code>:identifier</code>屬性為單一值識別。
```typescript=
// Post.vue
vue-disqus(shortname="jane-blog" :identifier="$page.mdPost.title")
```
接著就出現了！
![](https://i.imgur.com/AYSemls.png)
