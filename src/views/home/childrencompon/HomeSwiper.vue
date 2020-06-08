<template>
    <swiper>
      <swiper-item v-for="item in banners" class="banner-item">
        <a :href="item.link">
          <img :src="item.image" alt=""  @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isload: false
      }
    },
    methods: {
      imgLoad() {
        if (!this.isload) {
          this.$emit('swiperLoad')
        }
        this.isload = true
      }
    }
  }
</script>

<style scoped>

</style>
