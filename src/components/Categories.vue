<template lang="pug">
  Block(:title="title")
    ul.category-list
      li(v-for="{node} in filterCategories") 
        g-link(:to="node.path") {{ dispatchCate(node) }}
       
</template>
<static-query>
query categories{
    allWordPressCategory{
      edges{
        node{
          title
          path
          count
        }
      }
  },
  allMdCategory{
    edges{
      node{
        id
        path
      }
    }
  }
}
</static-query>
<script>
import Block from "~/templates/Block.vue";
export default {
  data() {
    return {
      title: "CATEGORIES",
      frontend: ["css", "javascript", "gridsome"]
    };
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  components: {
    Block
  },
  computed: {
    filterCategories() {
      console.log("--------");
      console.log(this.type);
      if (this.type === "thailand") {
        return this.$static.allWordPressCategory.edges;
      } else {
        return this.filterFrontendResult(this.$static.allMdCategory.edges);
      }
    }
  },
  methods: {
    filterFrontendResult(arr) {
      return arr.filter(({ node }) =>
        this.frontend.find(type => type === node.id)
      );
    },
    dispatchCate(node) {
      return node.title
        ? this.toEngCategory(node.title)
        : node.id.toUpperCase();
    }
  }
};
</script>
<style lang="sass">


ul.category-list
  width: 100%
  li
    padding: 1em
    margin: 1em
    background-color: $color_light_gray
    text-align: center
    a 
      color: $color_word
      letter-spacing: 1.5px
      padding: 1em 
    &:hover
      background-color: $color_green
      a
        color: #fff

</style>