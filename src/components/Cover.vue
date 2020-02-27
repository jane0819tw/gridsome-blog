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
@keyframes chColor
  0%
    filter: blur(10px) contrast(2) grayscale(80%)
  100%
    filter: blur(2px) contrast(2) grayscale(0%)
.cover-img
  +size(100%,100vh)
  +bgCenter('../assets/img/cover.png')
  +flexCenter
  position: relative
  &:hover
    filter: blur(5px) contrast(2)
  animation: chColor 3s forwards

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