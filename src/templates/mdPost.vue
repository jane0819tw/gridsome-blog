<template lang="pug">
  PostLayout(:type="type")
    .time
      time  更新日期: {{formatDate($page.mdPost.date)}}
    .markdown-body(v-html="$page.mdPost.content")
    CategoryInPost(:tags="$page.mdPost.tags")
    vue-disqus(shortname="jane-blog" :identifier="$page.mdPost.title")
</template>
<page-query>
query ($path:String!){
  mdPost(path:$path){
    id
    path
    content
    title
    date
    tags{
      title
    }
  }
}
</page-query>
<script>
import CategoryInPost from "~/components/CategoryInPost.vue";
export default {
  data() {
    return {
      type: "frontend"
    };
  },
  components: {
    CategoryInPost
  },
  methods: {
    formatDate(str) {
      let date = new Date(str);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
  }
};
</script>
<style lang="sass">
.time
  padding: 1em
  text-align: right
  time
    font-size: 12px
    background-color: $color_green
    padding: 1em
    color: #fff
    letter-spacing: 1px

.markdown-body 
  box-sizing: border-box
  margin: 1em
  // max-width: 100%
  *
    word-break: break-all
    color: $color_word

  h1 
    letter-spacing: .5px
  h2 
    background-color: transparent

@media (max-width: 768px) 
  .markdown-body 
    // padding: 15px
    
  

</style>