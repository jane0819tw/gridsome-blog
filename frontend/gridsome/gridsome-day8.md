---
tags: ['gridsome','collections','day8','refs']
date: 2020-02-27
description: 還記得我們在mdPost的時候嗎？當我們在產生與該typeName相關schema的時候，我們還可以產生根據其他屬性的集合，我們稱為collection，會在該套件寫一個refs如下：
cover_image: ../img/gridsome.png
---
# (實戰) gridsome 建部落格day8-- refs 建立新的collections
還記得我們在<code>mdPost</code>的時候嗎？當我們在產生與該typeName相關schema的時候，我們還可以產生根據其他屬性的集合，我們稱為collection，會在該套件寫一個<code>refs</code>如下：
```typescript=
// gridsome.config.js
{
      use: '@gridsome/source-filesystem',
      options: {
        path: 'frontend/**/*.md',
        typeName: 'mdPost',
        refs: {
          // 根據 mdPost 的tags 屬性 建立 mdCategory template
          tags:
          {
            typeName: 'mdCategory',
            create: true
          }
        },
        remark: {
          // remark options
        }
      }
    }
```
原來的部分會產生<code>mdPost</code>,<code>allMdPost</code>,加上refs，表示產生根據<code>mdPost</code>的<code>tags</code>屬性，建立<code>tags</code>的集合，相對應的page放在命名的相同名稱.vue檔<code>templates/mdCategory.vue</code>。
並在templates裡面加上對應的路徑。
```typescript=
 templates: {
    mdCategory: '/frontend/:id',
  },
```
重新打開localhost後，就可以看到docs裡面多了<code>mdCategory</code>的部分。
![](https://i.imgur.com/qX2Qqug.png)

```typescript=
// templates/mdCategory.vue
<template lang="pug">
  Layout
    h1 {{$page.mdCategory.id.toUpperCase()}}
    Search(@changeSearch="getSearch")
    p.alert(v-if="nowSearch" v-html="getSubTitle()") 
    main
      ul.post-list
        li.post(v-for="{node} in filterPost") 
          Post(:post="node")

</template>
<page-query>
query ($id: ID!){
     mdCategory(id:$id){
        id
        path
        belongsTo{
          edges{
            node{
              ... on mdPost{
                title
                id
                content
                path
                excerpt
                description
                cover_image(width: 400, height: 200, quality: 90)
                tags{
                  title
                }
                date
              }
            }
          }
        }
     }
  
}
</page-query>
```
在這一頁想要把屬於那種類的文章列出來，query的部分，node後使用<code>... on mdPost </code>找出該文章。
用相同的方法列出相同種類的<code>WordPressPost</code>。