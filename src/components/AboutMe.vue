<template lang="pug">
  Block(:title="title")
    .profile-img
      //- g-image(src="~/assets/img/me.jpeg")
    h3 Jane
    p 屏東人，前端工程師，愛泰人。
</template>
<script>
import Block from "~/templates/Block.vue";
export default {
  data() {
    return {
      title: "ABOUT ME"
    };
  },
  components: {
    Block
  }
};
</script>
<style lang="sass">
.profile-img
    width: 200px
    height: 200px
    max-width: 100%
    background-image: url(../assets/img/me.jpeg)
    background-size: cover
    background-position: center
    transition: 0.5s
h3 
    font-size: 1.5em
    letter-spacing: 1.5px
  
</style>