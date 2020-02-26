<template lang="pug">
  .cover
    .cover-img
    .cover-info
      h1 JANE'S BLOG
      hr
</template>
<script>
export default {};
</script>
<style lang="sass">

.cover-img
  +size(100%,100vh)
  +bgCenter('../assets/img/cover.png')
  +flexCenter
  filter: blur(2px) contrast(2)
  position: relative

.cover-info
  +size(300px)
  +posCenter
  +flexCenter
  flex-direction: column
  filter: initial
  background-color: #fff
  
  h1
    letter-spacing: .8em
    text-align: center
    color: $color_word
  hr
    width: 30%
    border: solid 3px $color_green
  &:hover
    hr
      width: 70%
      border: solid 3px $color_green
</style>