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
        : this.post.tags.map(tag => tag.title.toUpperCase());
    }
  }
};
</script>
<style lang="sass">
.post
  display: flex
  flex-direction: column
  align-items: center
  padding: 1.5em .5em
  
  position: relative
  background-color: #fff
  .img_box
    position: relative
    display: inline-block
    overflow: hidden
    .img
      +size(400px,200px)
    time
      z-index: 1
      text-align: right
      font-weight: 600
      padding: 1px
      color: #fff
      margin: 1em 0
      position: absolute
      bottom: -30px
      left: -50px
      opacity: 0
    .dark_cover
      +size(400px,100%)
      position: absolute
      top: 0
      opacity: 0
      background-color: rgba(0,0,0,0.5)
    
  h2
    text-align: center
    word-wrap: break-word
  hr
    width: 25%
    border-color: #999
  .short-text
    letter-spacing: 1px
    p
      margin: 0
  &:hover
    time
      bottom: 0
      left: 5px
      opacity: 1
    .dark_cover
      opacity: 1
    hr
      width: 30%
      border-color: $color_green
      
  
  .tags
    margin: 1em 0 .5em 0
    +flexCenter
    flex-wrap: wrap

    span
      margin: 0 0 .5em .5em
      padding: 5px
      border: solid 1px 
      color: $color_green
      border: solid 1px $color_green
      letter-spacing: 1px

  .more-link
    align-self: center
    margin: 0 auto
    border: solid 3px rgba(0,0,0,0.2)
    padding: .5em 1em
    text-decoration: none
    margin: 10px
    color: #000
    font-weight: 900
    cursor: pointer
    width: 30%
    letter-spacing: .5em
    text-align: center
    white-space: nowrap
    &:hover
      background-color: #000
      color: #fff
  
  
</style>
