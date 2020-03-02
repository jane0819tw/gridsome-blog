<template lang="pug">
  header.header(data-500="background-color:rgb(255,0,0)")
    nav.nav
      ul.dropdown
        li
          g-link(to="/") 首頁
          
        li
          g-link(to="/frontend") 前端筆記
          ul
            li(v-for="{node} in $static.allMdCategory.edges" v-if="frontendCate.find(fCate=>fCate==node.id)")
              g-link(:to="node.path") {{node.id}}
        li
          g-link(to="/thailand") 泰國文章

          ul
            li(v-for="{node} in $static.allWordPressCategory.edges" v-if="node.count!=0")
              g-link(:to="node.path")  {{toChiCategory(node.title)}}

      


      .nav-icon(@click="toggleMenu") MENU

      ul.mobile-dropdown
        li
          g-link(to="/") 首頁
          
        li
          g-link(to="/frontend") 前端筆記
          ul
            li(v-for="{node} in $static.allMdCategory.edges" v-if="frontendCate.find(fCate=>fCate==node.id)")
              g-link(:to="node.path") {{node.id}}
        li
          g-link(to="/thailand") 泰國文章

          ul
            li(v-for="{node} in $static.allWordPressCategory.edges" v-if="node.count!=0")
              g-link(:to="node.path")  {{toChiCategory(node.title)}}



</template>

<static-query>
query navbar{
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
// inline component with template string 👍
import Post from "~/components/Post.vue";
// import skrollr from "skrollr";

// skrollr.init();

// require(["skrollr"], function(skrollr) {
//   var s = skrollr.init();
// });

// npm install --save skrollr
// require(["skrollr"], function(skrollr) {
//   var s = skrollr.init();
// });
export default {
  data() {
    return {
      menu: false,
      frontendCate: ["javascript", "css", "gridsome"]
    };
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
      if (this.menu) {
        document.querySelector(".mobile-dropdown").style.display = "block";
      } else {
        document.querySelector(".mobile-dropdown").style.display = "none";
      }
    },
    getMainStringCategory(str) {
      str = str.split("&")[0];
      // 找出 【.... 】
      let regex = new RegExp("^【.*】$");
      let result = str.match(regex)[0];
      return result;
    },
    toEngCategory(str) {
      let result = this.getMainStringCategory(str);
      // 取得英文 [a-zA-Z]+
      let engString = result
        .match(new RegExp("[a-zA-Z ]+"))[0]
        .toLowerCase()
        .trim();

      let res = engString
        .split(" ")
        .find(letter => letter.indexOf("thai") == -1);

      return res;
    },
    toChiCategory(str) {
      let result = this.getMainStringCategory(str);
      // ----------------- 顯示中文
      let res = result.match(new RegExp("[^a-zA-Z【】]+"))[0];
      return res;
    }
  },
  components: {
    Post
  }
};
</script>
<style lang="sass">

.header 
  display: flex
  justify-content: space-between
  position: fixed
  top: 0
  width: 100%
  z-index: 3
  background-color: rgba(255,255,255,0.9)

.nav
  display: flex
  width: 100%
  justify-content: center
  position: relative
  width: 100%
  border: solid 1px #888
  border-left: none
  border-right: none
  flex-direction: column
  
.mobile-dropdown,.dropdown
  li
    text-align: center
    padding: 1.5em
    a
      color: #000
    &:hover
      >a
        color: $color_green

ul.mobile-dropdown
  display: none
  li
    &:hover
      background-color: rgba(255,255,255,1)
      ul
        display: block
    ul
      display: none
      li
        padding: .5em
        a 
          font-size: 10px
          
          

ul.dropdown
  flex-grow: 1
  position: absolute
  top: 100%
  width: 100%
  display: none
  flex-direction: column
  list-style: none
  margin: 0
  padding: 0
  justify-content: space-between

  li
    display: flex
    justify-content: center
    z-index: 1
    
    a 
      width: 100%
    
      
  > li
    margin: 0
    flex: 1
    position: relative
    a
      vertical-align: middle
      text-decoration: none
      font-weight: 900
      letter-spacing: 1px
      color: #000
      letter-spacing: 2px
  
      
    &:hover
      ul
        display: block
        
    
    ul
      display: none
      position: absolute
      top: 100%
      margin: 0
      padding: 0
      list-style: none
      background-color: #fff
      box-shadow: 0px -5px 2px rgba(0,0,0,0.1)
      li
        min-width: 100px
        border-bottom: 1px solid #888
        &:hover
          a 
            color: $color_green
          
.nav-icon 
  min-width: 200px
  text-align: center
  display: block
  padding: 1em
  margin: 1em
  letter-spacing: 1em
  background-color: $color_green
  color: #fff
.open-navbar
  display: flex !important


@media screen and (min-width:768px)
  nav
    position: static
    flex-direction: row
  .dropdown
    display: flex !important
    flex-direction: row !important
    position: relative !important
    top: 0 !important
    width: initial


  .mobile-dropdown
    display: none !important

  .nav-icon
    display: none
  
</style>


