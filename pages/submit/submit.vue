<template>
    <view id="submit-page">
        
      <!-- 素材类型 -->
      <view class="works-type">
        <view class="title">素材类型</view>
        <view>
          <radio-group class="works-type-radio" @change="worksTypeChange">
            <view 
              class="works-type-radio-item" 
              v-for="item in worksTypeList" 
              :key="item.id" 
            >
              <radio v-show="false" :id="item.id" :value="item.label" :checked="item.label == worksTypeValue"></radio>
              <label :for="item.id" class="works-type-radio-item-content">
                <view class="my-radio" :style="{backgroundColor: item.label == worksTypeValue ? 'rgb(108,92,217)' : '#fff'}"></view>
                <view>{{item.label}}</view>
              </label>
              
            </view>
          </radio-group>
        </view>
      </view>
      
      <!-- 上传素材-->
      <view class="works-upload">
        <view class="title">
          <view>上传素材</view>
          <view class="tips">今日限额80张，已上传0张</view>
        </view>
        <view class="works-upload-area">
          <view
            v-for="(img,imgIndex) in imgList"
            :key="imgIndex" 
          >
            <image :src="img" mode="widthFix" @click="previewImage(img)"></image>
          </view>
          <view v-if="imgList.length < 9" :style="{height: imgList.length == 0 ? '27vw' : '53vw'}">
              <image @click="chooseImage" src="@/static/upload.png" mode="widthFix"></image>
          </view>
        </view>
        <view class="works-upload-tips">
          <text>温馨提示:</text>
          <text>支持png/jpg格式，一次最多传9张，系统将通过AI识别/人工方式审核，禁止上传违规作品，请创作者自查后上传。</text>
        </view>
      </view>
      
      <!-- 填写标签 -->
      <view class="works-tag">
        <view class="works-tag-input">
          <input type="text" v-model="tagValue" :maxlength="16" placeholder="请填写标签名称">
          <view class="works-tag-add">
            <view>{{tagValue.length + '/16'}}</view>
            <view class="add-tag-button" @click="addTag">添加</view>
          </view>
        </view>
        <view class="works-tag-content">
          <view>{{`作品标签（${tagList.length}/10）`}}</view>
          <scroll-view class="scroll" scroll-y :scroll-top="0">
            <view v-for="(i,iIndex) in tagList">
              {{i}}
            </view>
            <view class="top-arrow"></view>
            <view class="bottom-arrow"></view>
          </scroll-view>
        </view>
      </view>
      
      <!-- 提交作品 -->
      <view class="works-submit">
        <view>提交作品</view>
        <view @click="agree = !agree">
          <view class="my-radio" :style="{backgroundColor: agree ? 'rgb(108,92,217)' : '#fff'}"></view>
          <lebel>我已同意并遵守《创作者服务协议》</lebel>
        </view>
        <view @click="agree = !agree">我承诺所上传的素材均属原创或已获得相关授权</view>
      </view>
    </view>
</template>

<script setup>
import {ref,reactive} from 'vue'

//选择素材类别的代码
let worksTypeList = reactive([
  {id: 'type1', label: '手机壁纸'},
  {id: 'type2', label: '头像'},
  {id: 'type3', label: '表情'},
  {id: 'type4', label: '背景'},
  {id: 'type5', label: '动态壁纸'},
  {id: 'type6', label: '文字模板'}
]);
let worksTypeValue = ref('手机壁纸');
function worksTypeChange(e){
  worksTypeValue.value = e.detail.value;
}

//图片上传的带am
let imgList = ref([]);
async function chooseImage(){
  if(imgList.value.length >= 9) return;
  let res = await uni.chooseImage({
    count: 9 - imgList.value.length
  });
  imgList.value = [...imgList.value, ...res.tempFilePaths];
}
function previewImage(current){
  uni.previewImage({
    current,
    urls: imgList.value,
    indicator: 'number'
  });
}

//素材标签的带am
let tagValue = ref('');
let tagList = reactive([]);
function addTag(){
  if(tagList.length >= 10){
    uni.showModal({
      title: '提示',
      showCancel: false,
      confirmText: '我知道了',
      content: `标签数量已达上限`
    });
    return;
  }
  if(tagValue.value == ''){
    uni.showModal({
      title: '提示',
      showCancel: false,
      confirmText: '我知道了',
      content: `您还未输入标签内容`
    });
    return;
  }
  tagList.push(tagValue.value);
  tagValue.value = '';
}

//提交的代码
let agree = ref(false);
</script>

<style lang="less">
#submit-page {
  margin: 0 7vw;
  font-size: 3.8vw;
}
.title {
  margin: 5vw 0;
}
.tips {
  color: gray;
  font-size: 3vw;
}
.my-radio {
  margin-right: 1.5vw;
  width: 3vw;
  height: 3vw;
  border-radius: 1.5vw;
  border: 0.3vw solid #000;
}

.works-type {
  margin: 2vw 0;
  .works-type-radio {
    display: flex;
    flex-wrap: wrap;
    .works-type-radio-item {
      margin: 2vw 0;
      width: 25%;
      height: 4vw;
      
      .works-type-radio-item-content {
        display: flex;
        align-items: center;
        
      }
    }
    .works-type-radio-item:nth-child(4) {
      width: 20%;
    }
    .works-type-radio-item:nth-child(1),
    .works-type-radio-item:nth-child(5) {
      width: 30%;
    }
  }
}

.works-upload {
  margin: 5vw 0;
  .title {
    display: flex;
    justify-content: space-between;
  }
  .works-upload-area {
    margin: 3vw 0;
    display: flex;
    flex-wrap: wrap;
    >view {
      margin: 3vw 0;
      width: 33%;
      height: 53vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    image {
      width: 100%;
    }
  }
  .works-upload-tips {
    margin: 5vw 0;
    font-size: 2.5vw;
    text:first-child {
      color: red;
    }
  }
}

.works-tag {
  margin: 5vw 0;
  margin: 3vw 0;
  .works-tag-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 12.8vw;
    font-size: 3vw;
    border-top: 0.3vw solid gray;
    border-bottom: 0.3vw solid gray;
    input {
      margin-left: 1vw;
    }
    .works-tag-add {
      display: flex;
      align-items: center;
      .add-tag-button {
        margin: 0 1vw 0 3vw;
        width: 12.6vw;
        height: 7.2vw;
        line-height: 7.2vw;
        text-align: center;
        border-radius: 2vw;
        border: 0.5vw solid #000;
      }
    }
  }
  .works-tag-content {
    margin: 2vw 0;
    height: 30vw;
    color: gray;
    >view {
      height: 7vw;
      line-height: 7vw;
    }
    .scroll {
      position: relative;
      width: 100%;
      height: 23vw;
      .top-arrow {
        position: absolute;
        top: 0vw;
        right: 2vw;
        width: 0;
        border: 2vw solid transparent;
        border-bottom-color: rgb(108,92,217);
      }
      .bottom-arrow {
        position: absolute;
        bottom: 0vw;
        right: 2vw;
        width: 0;
        height: 0;
        border: 2vw solid transparent; 
        border-top-color: rgb(108,92,217);
      }
      
    }
  }
}

.works-submit {
  margin: 5vw 0;
  >view:nth-child(1) {
    margin: 5vw auto;
    width: 72vw;
    height: 9.2vw;
    line-height: 9.2vw;
    text-align: center;
    font-size: 3vw;
    color: #fff;
    border-radius: 2.8vw;
    background-color: rgb(134,2,122);
  }
  >view:nth-child(2), >view:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1vw 0;
    color: grey;
    font-size: 3vw;
  }
}
</style>
