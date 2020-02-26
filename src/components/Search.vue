<template lang="pug">
  .search
    input(v-model="search" @input="deliverSearch" placeholder="輸入關鍵字...")
    font-awesome(:icon="['fab','searchengin']" )
</template>
<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    deliverSearch() {
      this.$emit("changeSearch", this.search);
    }
  }
};
</script>
<style lang="sass">
.search
  display: flex
  justify-content: center
  align-items: flex-end
  margin: 1em
  input
    line-height: 1.5em
    font-size: 1.5em
    padding: .5em
    outline: none
    border: none
    border-bottom: solid 1px
    &:focus
      border-bottom: solid 2px $color_green
  svg
    font-size: 40px

</style>