---
tags: ['gridsome','components','day6','props']
date: 2020-02-26
description: 我們frontend.vue以及Thailand.vue裡面的文章很相似，所以我們把一篇文章的架構提出來，放到components裡面。
cover_image: ../img/gridsome.png
---
#  (實戰) gridsome 建部落格day6-- 文章元件化 components, 父傳子props
我們<code>frontend.vue</code>以及<code>Thailand.vue</code>裡面的文章很相似，所以我們把一篇文章的架構提出來，放到components裡面。
* <code>import Post from "~/components/Post.vue";</code>
引入元件並加入：
```typescript=
components: {
    Post
  },
```
* <code>Post(:post="node")</code>
表示父<code>Frontend.vue</code>傳子<code>Post.vue</code>所戴的資料用<code>:</code>傳遞。
```typescript=
// Frontend.vue
<template lang="pug">
Layout
  h1 frontend page
  ul 
    li(v-for="{node} in $page.allMdPost.edges")
      Post(:post="node") // 引入元件
</template>

<script>

// Post 元件使用
import Post from "~/components/Post.vue";
export default {
  data() {
    return {};
  },
  components: {
    Post
  },
  computed: {
    latestPost() {
      this.$page.allMdPost.edge;
    }
  }
};
</script>
```
而在紫元件如何取用到父元素傳過來的東西呢？
我們使用<code>props</code>接收父元素<code>:</code>後面的名稱<code>post</code>所帶的值，在裡面使用。
```typescript=
// components/Post.vue
<template lang="pug">
.post
  .img_box
    g-image(v-if="post.cover_image" :src="post.cover_image" fit="contain")
    img.img(v-if="post.featuredMedia" :src="post.featuredMedia.sourceUrl")
    time {{getDate(post.date)}} 
    .dark_cover
  .tags
    span(v-for="tag in tags") {{tag}}
  h2(v-html="post.title")
  hr
  div.short-text(v-html="post.excerpt || post.description")
  
  //-g-image(v-if="post.featuredMedia" :src="post.featuredMedia.sourceUrl" fit="cover")
  //- g-image(src="~/assets/img/flexbox.png" width=500 height=500 fit="contain")
  g-link.more-link(:to="post.path") MORE
</template>

<script>
export default {
  // mixins: [charFormatMixin],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags() {
      return this.post.categories
        ? this.post.categories.map(cate => this.toEngCategory(cate.title))
        : this.post.tags.map(tag => tag.toUpperCase());
    }
  }
};
</script>
```
在<code>Thailand.vue</code>一樣，相同的道理。
```typescript=
// Frontend.vue
<template lang="pug">
Layout
  h1 frontend page

  ul
    li
      g-link(to="/") index
    li
      g-link(to="/frontend") frontend
    li
      g-link(to="/thailand") thailand
  ul 
    li(v-for="{node} in $page.allMdPost.edges")
      Post(:post="node")
</template>
```