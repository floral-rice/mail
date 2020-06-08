<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list :cart-list="cartList"></cart-list>
    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childcomp/CartList'
  import CartBottomBar from  './childcomp/CartBottomBar'
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartCount', 'cartList'])
    }
  }
</script>

<style scoped>
  .cart {
    /*position: relative;*/
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
