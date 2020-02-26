<template lang="pug">
main
  .wrapper
    .box(v-for="{node} in popularPost") 
      Post(:post="node")
  Pager(v-if="info" :info="info")

</template>

<script>
// import Navbar from "./Navbar.vue";
import Post from "~/components/Post.vue";
import { Pager } from "gridsome";
export default {
  props: {
    articles: {
      type: Array,
      required: true
    },
    info: {
      type: Object,
      required: false
    }
  },
  components: {
    Post,
    Pager
  },

  computed: {
    popularPost() {
      return this.articles.sort(
        (a, b) => new Date(b.node.date) - new Date(a.node.date)
      );
    }
  }
};
</script>

<style lang="sass">

.wrapper
  column-count: 1
  column-gap: 0
  .box
    break-inside: avoid
    box-sizing: border-box


// page setting

nav[aria-label="Pagination Navigation"]
  width: 100%
  text-align: center
  padding: 1em
  a 
    margin: .5em
    padding: .5em
    border: solid 1px $color_green
    border-radius: 25%
    color: $color_green
    font-weight: 800
    &.active
      background-color: $color_green
      color: #fff
    &:hover
      background-color: lighten($color_green,20)
      color: #fff


@media screen and (min-width: 768px)
  .wrapper
    column-count: 2
    .box
      padding: 1em
@media screen and (min-width: 950px)
  .wrapper
    column-count: 3
</style>
