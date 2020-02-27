---
tags: ['gridsome','google analytics']
date: 2020-02-27
description: 當我們已經使用netify發布了網址之後，如果我們想要追蹤裡面的行為，可以使用google analytics來做，很幸運的，gridsome裡面也有這個套件可以使用。
cover_image: ../img/google-analytics.png
---

# google analytics
當我們已經使用netify發布了網址之後，如果我們想要追蹤裡面的行為，可以使用google analytics來做，很幸運的，gridsome裡面也有這個套件可以使用。
首先我們先進入到google analytics，

選擇左下角的**管理**，點下**建立帳戶**，填寫帳戶名稱。
![](https://i.imgur.com/PbM61oQ.png)

接著把剛剛netify的網址貼上。

![](https://i.imgur.com/wD5bsFF.png)

按下取得追蹤ID，就會獲得一串UA開頭的數字，先留起來。

回到程式碼，安裝<code>plugin-google-analytics</code>，使用
```typescript=
yarn add @gridsome/plugin-google-analytics
// or
npm install @gridsome/plugin-google-analytics
```
將剛剛的UA開頭數字貼在id。
```typescript=
// gridsome.config.js
module.exports = {
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-XXXXXXXXX-X'
      }
    }
  ]
}
```
這樣就完成了！