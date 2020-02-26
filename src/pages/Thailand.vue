<template lang="pug">
  Layout
    Articles(:articles="$page.allWordPressPost.edges" :info="$page.allWordPressPost.pageInfo")
</template>
<page-query>
query thailandArticles($page: Int){
  allWordPressPost(page: $page, perPage: 6) @paginate{
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
  }
}
</page-query>
<script>
import Articles from "~/components/Articles.vue";
export default {
  data() {
    return {
      fliter: "thailand"
    };
  },
  components: {
    Articles
  },
  metaInfo: {
    title: "thailand--JANE's BLOG"
  }
};
</script>