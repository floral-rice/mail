<template>
  <div>
    <!--详情页导航栏-->
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles"
               class="title-item"
               :class="{active: index === currentIndex}"
               @click="itemClick(index)">
            {{item}}
          </div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    props: {
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      itemClick(index) {
        // this.currentIndex = index
        this.$emit('titleClick',index)
      }
    }
  }
</script>

<style scoped>
  .back img{
    margin-top: 11px;
  }
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
