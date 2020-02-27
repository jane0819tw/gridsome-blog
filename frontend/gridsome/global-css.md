---
tags: ['gridsome','global css','style-resources-loader']
date: 2020-02-21
description: 當我們在開發的時候，總是會需要一些共通的設定來避免程式碼重複，我們可以在每一個.vue檔裡面import進來，但是會顯得很累贅，所以接下來要教大家幾種全域引入的方式。
cover_image: ../img/gridsome.png
---

# 如何使用全局css sass/scss

[gridsome使用全局sass/scss文件](https://gridsome.org/docs/assets-css/)

當我們在開發的時候，總是會需要一些共通的設定來避免程式碼重複，
我們可以在每一個.vue檔裡面import進來，但是會顯得很累贅，所以接下來要教大家幾種全域引入的方式。
## 全域引入css
和引入元件components的方式相似，在<code>src/main.js</code>裡面直接運import引入所在位置的css檔，就是這麼簡單，路徑不要寫錯就好。

```typescript=
// src/main.js
import '~/assets/styles.css'
```
如果用head.link.push的方式在main.js裡面引入的話，會有問題。
## 全域引入sass/scss
當專案開發越來越大的時候，如果使用sass/scss這種模組化或定義的變數(mixin,varables)，
就會希望每一個.vue都可以使用。
### 安裝 style-resources-loader 套件
```typescript=
npm i -D style-resources-loader
```
在<code>gridsome.config.js</code>的<code>module.exports</code>前加上下面這一段：
並將path裡面的路徑改成你檔案的路徑，也可以使用<code>*</code>表示該資料夾下的所有檔案。

```typescript=
// gridsome.config.js
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/_globals.sass'),
        // or if you use scss
        // path.resolve(__dirname, './src/assets/sass/_globals.scss'),
        // you can also use a glob if you'd prefer
        // path.resolve(__dirname, './src/assets/sass/*.sass'),
        // or scss
        // path.resolve(__dirname, './src/assets/sass/*.scss'),
      ],
    })
}

module.exports = {
	// existing config
}
```
接著修改<code>module.exports</code>區塊：
```typescript=
module.exports = {
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    
    types.forEach(type => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    // or if you use scss
	// types.forEach(type => {
	// addStyleResource(config.module.rule('scss').oneOf(type))
	// })
	// }
}
```
假設在.sass檔案定義這些變數，則在所有的.vue 檔就可以直接使用了！讚。

```typescript=
// _globals.sass
$color_light_gray: #F9F9F9
$color_dark_gray: #eee
$color_green: #627A59
$color_word: #707070
$color_gray: #d1caca
```