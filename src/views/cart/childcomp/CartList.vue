<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content">
        <cart-list-item v-for="item in cartList"
                        :item-info="item"
                        :key="item.iid">
        </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "CartList",
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      CartListItem,
      Scroll
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 49px - 44px - 40px);
    /*overflow: hidden;*/
  }
  .content {
    overflow: hidden;
    height: 100%;
  }
</style>
