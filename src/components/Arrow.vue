<template lang="pug">
  .arrow-box(@click="goTop")
    
</template>
<script>
export default {
  methods: {
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style lang="sass">
.arrow-box
  +size(40px)
  +bgCenter('../assets/img/arrow-top.png')
  border: solid 5px $color_gray 
  background-color: $color_green
  position: fixed
  box-sizing: border-box
  right: 5px
  bottom: 10px
  cursor: pointer
</style>