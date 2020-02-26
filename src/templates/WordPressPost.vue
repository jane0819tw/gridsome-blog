<template lang="pug">
  PostLayout(:type="type")
    .left.article
      .time 
        time 更新日期: {{getDate($page.wordPressPost.date)}}
      h1(v-html="$page.wordPressPost.title")
      div(v-html="$page.wordPressPost.content")
      CategoryInPost(:tags="$page.wordPressPost.categories")
      //- add comments 
      vue-disqus(shortname="jane-blog" :identifier="$page.wordPressPost.title")
</template>

<page-query>
query WordPressPost ($id: ID!) {
  wordPressPost(id: $id) {
    title
    content
    date
    featuredMedia {
      sourceUrl
      altText
      mediaDetails {
        width
      }
    }
    categories {
      id
      title
      path
    }
    tags {
      id
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
      type: "thailand"
    };
  },
  components: { CategoryInPost },
  metaInfo() {
    return {
      title: this.$page.wordPressPost.title
    };
  },
  methods: {
    getDate(str) {
      let date = new Date(str);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    }
  }
};
</script>

<style lang="sass">
.categories
  border: solid 1px
  border-left: none
  border-right: none
  margin: 2em
  display: flex
  flex-wrap: wrap
  .tag
    padding: 1em
    border-radius: 10px
    background-color: $color_green
    margin: 1em 3px
    color: #fff
    font-size: 12px
.article
  *
    color: $color_word
    font-weight: 400
  .time
    padding: 1em
    text-align: right
    time
      font-size: 12px
      background-color: $color_green
      padding: 1em
      color: #fff
      letter-spacing: 1px
  h1
    letter-spacing: .5px
  h2
    background-color: $color_green
    padding: .2em
    border-radius: 10px
    span
      color: #fff
  img
    margin: auto 0
  img:nth-child(1)
    margin: auto 0
    width: 100% 
    height: auto !important
  iframe
    max-width: 100% !important

  a
    color: $color_green
    font-style: italic
    font-weight: 800
  p 
    display: flex
    flex-wrap: wrap
    justify-content: center
    img   
      width: 45% 
      margin: 5px
      

  
@media screen and (min-width: 768px)
  .article
    p  img
          width: 30%
    time
      float: right
</style>
