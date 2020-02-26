<template lang="pug">
  div
    b KEYWORDS
    .categories  
      .tag(v-for="tag in tags") {{tag.title}}
</template>
<script>
export default {
  props: {
    tags: {
      required: true
    }
  }
};
</script>
<style lang="sass">
.categories
  border: solid 1px
  border-left: none
  border-right: none
  margin: 2em
  display: flex
  flex-wrap: wrap
  .tag
    padding: 1em
    border-radius: 10px
    background-color: $color_green
    margin: 1em 3px
    color: #fff
    font-size: 12px
</style>