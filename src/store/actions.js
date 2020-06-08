import {addCounter, addToCart} from './mutation-types'
export default {
  addCart(context,payload) {
    return new Promise((resolve, reject) => {
      //  1.首先查找在数组中是否已有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //  2.判断oldProduct
      if(oldProduct){
        context.commit(addCounter, oldProduct)
        resolve('商品数量加1')
      }else {
        payload.count = 1
        context.commit(addToCart, payload)
        resolve('已添加至购物车')
      }
    })
  }
}

