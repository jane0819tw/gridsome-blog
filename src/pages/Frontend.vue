<template lang="pug">
  Layout
    Articles(:articles="$page.allMdPost.edges" :info="$page.allMdPost.pageInfo")
</template>
<page-query>
query frontendArticles ($page:Int) {
  allMdPost(perPage:6,page: $page) @paginate{
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
import Articles from "~/components/Articles.vue";
export default {
  data() {
    return {
      fliter: "frontend"
    };
  },
  components: { Articles },
  metaInfo: {
    title: "frontend--JANE's BLOG"
  }
};
</script>
<style lang="sass">

  

</style>
