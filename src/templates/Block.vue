<template lang="pug">
  .block
    h1 {{title}}
    hr 
    slot
    
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="sass">

.block
  margin: 1em
  display: flex
  flex-direction: column
  align-items: center
  border: solid 2px $color_gray
  h1
    letter-spacing: 2px
    font-weight: 400
    color: $color_green
  hr
    width: 20%
    border: solid 2px $color_gray
  &:hover
    border: solid 2px $color_green
    
    // about me 的pic
    .img_box
      background-size: 90%
      
    hr
      border: solid 2px $color_green
      width: 25%


</style>