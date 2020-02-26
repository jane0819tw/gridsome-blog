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
<script>
import Post from "~/components/Post.vue";
import Search from "~/components/Search.vue";
export default {
  components: {
    Post,
    Search
  },
  computed: {
    filterPost() {
      let filterPost = this.$page.mdCategory.belongsTo.edges;
      if (this.nowSearch) {
        return filterPost.filter(
          ({ node }) => node.content.indexOf(this.nowSearch) > -1
        );
      }

      return filterPost;
    }
  },
  data() {
    return {
      nowSearch: ""
    };
  },
  methods: {
    getSearch(str) {
      this.nowSearch = str;
    },
    getSubTitle() {
      return `在<span>${this.$page.mdCategory.id}類別</span>搜尋內容<span>${this.nowSearch}</span>，共有<span>${this.filterPost.length}</span>筆文章`;
    }
  }
};
</script>
<style lang="sass">
h1
  letter-spacing: 1em
  color: $color_green

.post-list
  column-count: 1
  column-gap: 0
  .post
    break-inside: avoid
    box-sizing: border-box

.alert
  text-align: center
  span
    font-weight: 900
    color: $color_green

@media screen and (min-width: 768px)
  .post-list
    column-count: 1
    .post
      padding: 1em

@media screen and (min-width: 950px)
  .post-list
    column-count: 2

</style>