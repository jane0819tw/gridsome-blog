<template lang="pug">
  Block(:title="title")
    ul.instagram-list
      li(v-for="{node} in $static.allInstagramPhoto.edges")
        a(:href="postLink(node.shortcode)" target="_blank")
          .ig_img(:style="imgCss(node.display_url)")

</template>
<static-query>
query Instagram{
  allInstagramPhoto(limit:6){
    edges{
      node{
        display_url
        shortcode
      }
    }
  }
}
</static-query>
<script>
import Block from "~/templates/Block.vue";
export default {
  components: { Block },
  data() {
    return {
      title: "INSTAGRAM"
    };
  },
  methods: {
    postLink(shortcode) {
      return `https://www.instagram.com/p/${shortcode}/`;
    }
  }
};
</script>
<style lang="sass">
ul.instagram-list
  width: 100%
  display: flex
  flex-wrap: wrap
  justify-content: center

.ig_img
  cursor: pointer
  +size(80px)
  max-width: 100%
  margin: .2em

</style>