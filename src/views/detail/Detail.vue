<template>
<div class="detail">
  <detail-nav-bar @titleClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contextScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <!--商品信息-->
    <detail-base-info :goods="goods"></detail-base-info>
    <!--店铺信息-->
    <detail-shop-info :shop="shop"></detail-shop-info>
    <!--商品详情-->
    <detail-goods-info :detail-info="detailInfo" @imageLoad="ImagesLoad"/>
    <detail-param-info ref="paramInfo" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="commentInfo" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
  </scroll>
  <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  <back-top v-if="isShow" @click.native="backClick"></back-top>
</div>
</template>

<script>

  import DetailNavBar from './childrencom/DetailNavBar'
  import DetailSwiper from './childrencom/DetailSwiper'
  import DetailBaseInfo from './childrencom/DetailBaseInfo'
  import DetailShopInfo from './childrencom/DetailShopInfo'
  import DetailGoodsInfo from './childrencom/DetailGoodsInfo'
  import DetailParamInfo from './childrencom/DetailParamInfo'
  import DetailCommentInfo from './childrencom/DetailCommentIfno'
  import DetailBottomBar from './childrencom/DetailBottomBar'

  import GoodsList from 'components/contest/goods/GoodsList'
  import BackTop from 'components/contest/backTop/BackTop'

  import Scroll from 'components/common/scroll/Scroll'
  import {itemImgListerMixin, backTopMixin} from 'common/utile/mixin'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from "common/utile/utile";
  export default {
    name: "Detail",
    mixins: [itemImgListerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      BackTop,
      Scroll
    },
    created() {
    //  1.组件创建获取传过来的iid并保存
    //   this.iid = this.$route.params.iid
      this.iid = this.$route.query.iid

    //  2.发送数据请求
      this.getDetail()
    //  3.请求推荐数据
      this.getRecommend()

    },
    mounted() {
      //  获取详情页中对应高度的值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop - 49)
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop -49)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -49)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 200)
    },
    destroyed() {
      this.$bus.$off('itemLoad', this.itemImgListener)
    },
    methods: {
      /*
      * 1.事件监听的方法
      * */
      ImagesLoad() {
        //在没有加载完成时还未进入刷新，在刷新之前下可能还会有个卡顿
        this.$refs.scroll.refresh()
        //图片加载完成，调用getThemeTopY()获取对应的高度
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(this.themeTopYs[index]);
        // console.log(this.themeTopYs[4]);
        //注：由于获取的值是正值，而滚动的值是负值，所以要加负号
        this.$refs.scroll.ScrollTo(0, -this.themeTopYs[index])
      },
      contextScroll(position) {
      //  1.获取Y值
        const positionY = -position.y
        // console.log(positionY);
      //  2.positionY与详情页中的主题高度对比
      //   index=0  0 <= positionY <= this.$refs.paramInfo.$el.offsetTop
      //   index=1  this.$refs.paramInfo.$el.offsetTop <= positionY <= commentInfo.$el.offsetTop
      //   index=2  commentInfo.$el.offsetTop <= $refs.recommend.$el.offsetTop
      //   index=3   positionY >= $refs.recommend.$el.offsetTop
      //  判断
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i]
          && positionY < this.themeTopYs[i+1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            // console.log(this.currentIndex);
          }
        }

      //  返回顶部按钮的出现与隐藏
        this.isShow = -position.y > 1000
      },
      addCart() {
      //  1.获取需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
      //  发送到vuex
        this.$store.dispatch('addCart', product).then(res => {
          // console.log(res);
          this.$toast.show(res)
        })
      },

      /*
      * 2.发送数据请求
      * */
      getDetail() {
        getDetail(this.iid).then(res => {
          // console.log(res);
          const data = res.result
        //  1.获取顶部轮播图
          this.topImages = data.itemInfo.topImages
        //  2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //  3.获取店铺信息
          this.shop = new Shop(data.shopInfo)
        //  4.保存商品的详情数据
          this.detailInfo = data.detailInfo
        //  5.获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //  6.获取评论信息
          if (data.rate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      getRecommend(){
        getRecommend().then(res => {
          // console.log(res);
          this.recommends = res.data.list
        })
      }
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    height: calc(100% - 44px - 49px);
  }
</style>
