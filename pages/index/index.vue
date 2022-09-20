<template>
  <view>
    <view class="res" @click="lookRes">查看测试效果</view>
  </view>
</template>

<script setup>
function lookRes(){
  uni.navigateTo({
    url: '/pages/submit/submit'
  });
}
</script>

<style lang="less">
.res {
  margin: 0 auto;
  margin-top: 50vw;
  width: 90%;
  height: 15vw;
  line-height: 15vw;
  text-align: center;
  font-size: 5vw;
  color: #fff;
  background-color: green;
  
}
</style>