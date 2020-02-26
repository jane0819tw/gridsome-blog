<template lang="pug">
.layout
  Navbar
  Cover
  
  .boxer
    .left.article
      slot
    .right
      AboutMe
      Social
      Latest(:type="type")
      Categories(:type="type")
      Instagram
  Footer
  Arrow

</template>
<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import AboutMe from "~/components/AboutMe.vue";
import Social from "~/components/Social.vue";
import Latest from "~/components/Latest.vue";
import Categories from "~/components/Categories.vue";
import Instagram from "~/components/Instagram.vue";
import Cover from "~/components/Cover.vue";
import Arrow from "~/components/Arrow.vue";
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  components: {
    Navbar,
    Footer,
    AboutMe,
    Social,
    Latest,
    Categories,
    Instagram,
    Cover,
    Arrow
  }
};
</script>

<style lang="sass">

// 包覆全部的盒子
.boxer
  display: flex
  flex-direction: column
  padding: 0 40px
  .left
    flex: 1
    
  .right
    flex: 1
    padding-left: 0

@media screen and (min-width:768px)

  .boxer
    flex-direction: row
    padding: 0 100px
    .left
      flex: 7
      flex-shrink: 0
    .right
      flex: 3
      padding-left: 2em
</style>
