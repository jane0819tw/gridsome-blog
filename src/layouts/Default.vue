<template lang="pug">
.layout
  Navbar
  Cover
  slot
  Instagram
  Footer
  Arrow

  transition(name="page" mode="out-in")
    router-view(:key="$route.path")

</template>
<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import Instagram from "~/components/Instagram.vue";
import Cover from "~/components/Cover.vue";
import Arrow from "~/components/Arrow.vue";
export default {
  components: {
    Navbar,
    Instagram,
    Cover,
    Footer,
    Arrow
  }
};
</script>

<style lang="sass">
.page-enter-active,.page-leave-active
  transition: 0.5s
.page-enter,.page-leave-to
  opacity: 0
  
</style>
