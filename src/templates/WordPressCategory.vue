<template lang="pug">
Layout
  //h1 {{`${toChiCategory($page.wordPressCategory.title)} ${toEngCategory($page.wordPressCategory.title)}`}}
  Search(@changeSearch="getSearch")
  p.alert(v-if="nowSearch" v-html="getSubTitle()") 
  main
    ul.post-list
      li(v-for="{node} in filterPost" :key="node.id")
        //-p {{node}}
        Post(:post="node")
</template>

<page-query>

query WordPressCategory ($id: ID!) {
  wordPressCategory(id: $id) {
    title
    belongsTo{
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on WordPressPost {
            id
            title
            path
            excerpt
            date
            content
            featuredMedia{
              sourceUrl
            }
            categories{
              title
            }
        	}
        }
      }
    }
  }
}
</page-query>

<script>
//
import { Pager } from "gridsome";
import Post from "~/components/Post.vue";
import Search from "~/components/Search.vue";

export default {
  data() {
    return {
      nowSearch: ""
    };
  },
  computed: {
    filterPost() {
      console.log(this.$page.wordPressCategory);
      let filterPost = this.$page.wordPressCategory.belongsTo.edges;
      if (this.nowSearch) {
        return filterPost.filter(
          ({ node }) => node.content.indexOf(this.nowSearch) > -1
        );
      }

      return filterPost;
    }
  },
  methods: {
    getSearch(str) {
      this.nowSearch = str;
    },
    getSubTitle() {
      return `在<span>${this.toChiCategory(
        this.$page.wordPressCategory.title
      )}類別</span>搜尋內容<span>${this.nowSearch}</span>，共有<span>${
        this.filterPost.length
      }</span>筆文章`;
    }
  },
  components: {
    Pager,
    Post,
    Search
  },
  metaInfo() {
    return {
      // title: this.$page.wordPressCategory.title
    };
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
