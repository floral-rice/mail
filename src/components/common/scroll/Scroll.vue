<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType : {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      })
      //监听滚动事件
      if (this.probeType ===2 || this.probeType ===3){
        this.scroll.on('scroll', position => {
          //自定义事件，名字叫scroll，滚动位置实时监控
          this.$emit('scroll', position)
        })
      }

      //监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          //上拉加载更多
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      ScrollTo(x, y, time= 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      //refresh的执行，刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },

      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
