<template lang="pug">
  Block(:title="title")
    ul.social-list
      a(href="https://www.facebook.com/thaiskrthai/" target="_blank")
        li 
          .icon-box    
            font-awesome(:icon="['fab','facebook-square']")
          .followers
            span 1858 fans
      a(href="https://medium.com/%E5%B0%8F%E9%83%AD-%E0%B9%80%E0%B8%88%E0%B8%99" target="_blank")
        li   
          .icon-box   
            font-awesome(:icon="['fab','medium']") 
          .followers
            span 2 followers
      a(href="https://www.instagram.com/thaiskrthai/" target="_blank")
        li   
          .icon-box   
            font-awesome(:icon="['fab','instagram-square']") 
          .followers
            span 263 followers
      a(href="https://www.youtube.com/channel/UC-BjLbOY4VnYD3nouWYzs9w" target="_blank")
        li  
          .icon-box    
            font-awesome(:icon="['fab','youtube']") 
          .followers
            span 245 subscribers
</template>
<script>
import Block from "~/templates/Block.vue";
export default {
  data() {
    return {
      title: "SOCIAL"
    };
  },
  components: {
    Block
  }
};
</script>
<style lang="sass">

ul.social-list
  width: 80%
  li
    display: flex
    margin: .5em
    cursor: pointer
    &:hover
      .icon-box
        background-color: #000
        svg
          color: #fff
      .followers
        background-color: $color_green
        span
          color: #fff
  .icon-box
    background-color: $color_dark_gray
    flex: 1
    padding: .5em

    svg
      font-size: 1.5em
      color: #888
   
  .followers
    background-color: $color_light_gray
    flex: 3
    +flexCenter
    span
      color: #888
      font-weight: 300
</style>