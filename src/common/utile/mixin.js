import {debounce} from "./utile";

export const itemImgListerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //调用防抖函数防止refresh频繁使用
    let newRefresh =debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    //监听图片加载完成
    this.$bus.$on('itemLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    //返回顶部方法
    backClick() {
      this.$refs.scroll.ScrollTo(0, 0)
    },
  }
}
