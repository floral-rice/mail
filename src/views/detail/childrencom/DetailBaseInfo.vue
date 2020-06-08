<template>
  <div class="base-info" v-if="Object.keys(goods).length !==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <!--v-if判断是否有促销或打折等活动，没有则不显示-->
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <!--72小时发货在goods.services数组中的最后一个index中的name里面-->
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <!--直接遍历索引（index)会从1开始-->
      <span class="info-service-item"
            v-for="index in goods.services.length-1"
            :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color: #222
  }
  .info-price {
    margin-top: 10px;
  }
  .info-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .info-price .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    /*使用相对定位进行位置的上浮*/
    position: relative;
    top: -8px;
    /*bottom: 8px;*/
  }
  .info-other {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-service-item img {
    width: 16px;
    height: 16px;
  }
  .info-service-item span {
    font-size: 13px;
    color: #333;;
  }
</style>
