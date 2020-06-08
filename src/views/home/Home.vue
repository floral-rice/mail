<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行', '新款', '精选' ]"
                   class="tabContro2"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   v-show="isShowTab2">
      </tab-control>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScorll"
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners"
                     @swiperLoad="swiperLoad"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选' ]"
                     class="tab-control"
                     @tabClick="tabClick"
                     ref="tabControl1">
        </tab-control>
        <good-list :goods="showGoods"></good-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/common/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll'

  import GoodList from 'components/contest/goods/GoodsList'
  import BackTop from 'components/contest/backTop/BackTop'


  import HomeSwiper from './childrencompon/HomeSwiper'
  import HomeRecommend from './childrencompon/HomeRecommend'
  import FeatureView from './childrencompon/FeatureView'

  import {getHomeMultidata, getHomeGoods} from "network/home"

  import {itemImgListerMixin, backTopMixin} from 'common/utile/mixin'

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      Scroll,

      GoodList,
      BackTop,

      HomeSwiper,
      HomeRecommend,
      FeatureView
    },
    mixins: [itemImgListerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isShowTab2: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    created() {
      //涉及到具体的方法最好放在methods中
      // 所以将getHomeMultidata()放到methods在此组一个调用
      this.getHomeMultidata()

      //请求首页商品数据
      this.getHomeGood('pop')
      this.getHomeGood('new')
      this.getHomeGood('sell')
    },
    activated() {
      //回来首页保留原来的位置，最好做一次刷新，避免出现一些小问题的出现
      this.$refs.scroll.refresh()
      //最好刷新之后在跳转，否则先跳转再刷新容易回到顶部
      this.$refs.scroll.ScrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);
    //  离开页面取消事件总线中的图片加载监听
      this.$bus.$off('itemLoad', this.itemImgListener)
    },
    mounted() {

    },
    methods: {
      /*
      * 事件监听相关方法
      * */
      //点击这三个按钮（'流行', '上新', '精选'）中的一个，
      // 通过获取到的索引值给currentType附上文字信息
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      contentScorll(position) {
        // console.log(-position.y);
        //下拉一定到指定的高度出现返回顶部的按钮
        this.isShow = -position.y > 1000
      //到达高度吸顶效果
        this.isShowTab2 = -position.y > this.tabOffsetTop
      },

      //上拉加载更多
      loadMore() {
        this.getHomeGood(this.currentType)
      },

      //将tabControl1中得到的offsetTop值赋值给tabOffsetTop
      swiperLoad() {
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
      },


      /*
      * 网路请求相关方法
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGood(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*用原生滚动时有效*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  /*.
  使用better-scroll做滚动，该css样式的吸顶效果无效
  tab-control {*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*background-color: #fff;*/
    /*z-index: 9;*/
  /*}*/
  .tabContro2 {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
    /*overflow: hidden;*/
    /*height: calc(100% - 93px);*/
    /*margin-top: 44px;*/
  /*}*/
</style>
