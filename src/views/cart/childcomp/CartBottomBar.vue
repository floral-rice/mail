<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkedClick">
      </check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计({{totalPrice}})
    </div>
    <div class="calculate">
      去计算({{changeLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/contest/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => item.checked).reduce(
          (preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
      },
      changeLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false
        //1.方法1：使用高阶函数filter
        // return !(this.cartList.filter(item => item.checked === false).length)
        // return !(this.cartList.filter(item => !item.checked).length)
        //2.方法2：使用高阶函数find
        // return !(this.cartList.find(item => item.checked === false))
        // return !(this.cartList.find(item => !item.checked ))
        //3.方法3：for循环遍历
        for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkedClick() {
        if (!this.isSelectAll) {
        //  this.isSelectAll如果为false则！this.isSelectAll为true代表未全选
        //  则全选按钮需要全选
           this.cartList.forEach(item => item.checked = true)
        }else{
          this.cartList.forEach(item => item.checked = false)
        }

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    flex: 1;
    margin-left: 20px;
  }
  .calculate {
    width: 99px;
    background-color: red;
    text-align: center;
    color: #fff;
  }
</style>
