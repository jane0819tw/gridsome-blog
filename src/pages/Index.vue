<template lang="pug">
  Layout
    Articles(:articles="popularPost")
</template>
<page-query>
query Articles {
  allWordPressPost{
    pageInfo{
      totalPages
      currentPage
    }
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

  allMdPost{
    pageInfo{
      totalPages
      currentPage
    }
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
</page-query>
<script>
// import Post from "~/components/Post.vue";
import Articles from "~/components/Articles.vue";

export default {
  components: {
    Articles
  },
  data() {
    return {};
  },
  metaInfo: {
    title: "JANE's BLOG"
  },
  computed: {
    allPost() {
      let result = this.$page.allWordPressPost.edges
        .concat(this.$page.allMdPost.edges)
        .sort((a, b) => new Date(b.node.date) - new Date(a.node.date));
      return result;
    },
    popularPost() {
      return this.allPost.slice(0, 9);
    }
  }
};
</script>
<style lang="sass">

    
    
</style>