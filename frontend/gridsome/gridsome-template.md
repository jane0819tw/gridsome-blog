---
tags: ['gridsome']
date: 2020-02-07
description: 是為了<code>collections</code>裡面的<code>node</code>產生頁面，因此<code>template</code>資料夾裡面的檔案命名是<code>{collection}</code>的名稱。<code>src/templates/{Collection}.vue</code>，以redditPost為例，新增<code>template/redditPost.vue</code>。
cover_image: ../img/gridsome.png
---
# gridsome template 介紹
是為了<code>collections</code>裡面的<code>node</code>產生頁面，因此<code>template</code>資料夾裡面的檔案命名是<code>{collection}</code>的名稱。
<code>src/templates/{Collection}.vue</code>，以redditPost為例，新增<code>template/redditPost.vue</code>。



```typescript=
// template/redditPost.vue

<template lang="pug">
  BlogLayout
    h1 {{$page.redditPost.title}}
    //- components
    h2 {{$page.metadata.message}}
    img.reddit-img(:src="$page.redditPost.fields.img")
</template>

<page-query>
query redditPost ($path: String!){
  redditPost: redditPost (path: $path){
      title
    	path
      fields{
        img
      }
  },
  metadata: metadata {
    message
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.redditPost.title
    };
  }
};
</script>
<style lang="sass">
.reddit-img
  width: 100%
</style>

```