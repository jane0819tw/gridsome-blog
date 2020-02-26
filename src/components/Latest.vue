<template lang="pug">
  Block(:title="title")
    ul.latest-list
      li(v-for="{node} in latestPosts")
        g-link(:to="node.path")
          .img_box(:style="imgCss(type==='thailand'?node.featuredMedia.sourceUrl:node.cover_image.src)")
          
        .content
          g-link(:to="node.path") {{`${node.title.slice(0,15)}...`}}
          br
          br
          time {{getDate(node.date)}}

</template>
<script>
import Block from "~/templates/Block.vue";
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: "LATEST"
    };
  },
  computed: {
    latestPosts() {
      return this.type === "thailand"
        ? this.$static.allWordPressPost.edges
        : this.$static.allMdPost.edges;
    }
  },

  components: {
    Block
  },
  methods: {
    getDate(str) {
      // 符號不同
      let date = new Date(str);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
};
// - graphQL 找出最新的三筆資料
</script>
<static-query>
query LatestArticles {
  allWordPressPost(sortBy: "date",limit:3){
    edges {
      node {
        id
        title
        path
        excerpt
        date
        featuredMedia{
          sourceUrl
         }
        categories{
          title
        }
      }
    }
  },

  allMdPost(sortBy: "date",limit:3){
    edges{
      node{
        id
        path
        content
        title
        date
        description
        cover_image(width: 400, height: 200, quality: 90)
        tags{
          title
        }
      }
    }
    
    
  }
}
</static-query>
<style lang="sass">

ul.latest-list
  padding: 0 1em
  li
    display: flex
    margin-bottom: 1em
    padding-bottom: 1em
    border-bottom: solid 3px $color_light_gray
    .img_box
      flex-shrink: 0
      margin: .5em .5em 0 .5em
      cursor: pointer
      +size(80px)
    .content
      padding: 5px
      a 
        color: $color_word
        cursor: pointer
        &:hover
          color: $color_green
      time
        padding: 10px
        background-color: $color_dark_gray
        color: $color_word
        font-size: 12px
        display: inline-block
    &:hover
      time
        background-color: $color_green
        color: #fff
          
</style>