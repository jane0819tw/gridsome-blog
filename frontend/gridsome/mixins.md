---
tags: ['gridsome','mixins']
date: 2020-02-22
description: 如果有重複的方法需要共用，這時候我們可以使用mixins的方式載入，分為全域global的方法以及local的方法。
cover_image: ../img/gridsome.png
---

# mixins 共用的方法
如果有重複的方法需要共用，這時候我們可以使用mixins的方式載入，分為全域global的方法以及local的方法。
## global 方法
在src底下建立一個<code>mixins</code>資料夾。
```typescript=
// src/mixins/formatMixin.js
export const formatMixin = {
  methods: {
    //- date format
    getDate(dateStr) {
      let date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()},${date.getFullYear()}`;
    },
    // image format
    imgCss(url) {
      return {
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      };
    }    
  }

}
```
<code>{}</code>裡面放的是和元件裡面script的<code>{}</code>內容的東西。
建立好要共用的方法之後，在<code>main.js</code>裡面使用，利用<code>Vue.mixin(mixinName)</code>引入。
```typescript=
// main.js

// 加入mixins
import { formatMixin } from "~/mixins/formatMixin.js";

export default function (Vue, { head }) {
// add mixins 
  Vue.mixin(formatMixin)
}
```
這樣就可以在各個component裡面使用這些方法了。

## local 方法

```typescript=
// component.vue
import { formatMixin } from "~/mixins/formatMixin.js";

export default {
    mixins: [formatMixin]
}

```