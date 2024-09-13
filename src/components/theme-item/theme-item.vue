<template>
    <view class="themeItem">
        <navigator class="mainConent" :url="'/pages/classlist/classlist?id=' + item._id + '&name=' + item.name"
            v-if="!isMore">
            <image class="pic" :src="item.picurl" mode="aspectFill" />
            <view class="tab" v-if="compareTimestamp(item.updateTime)">{{ compareTimestamp(item.updateTime) }}</view>
            <view class="mask">{{ item.name }}</view>
        </navigator>
        <navigator url="/pages/classify/classify" open-type="reLaunch" class="mainConent more" v-else>
            <image class="pic" src="../../static/images/more.jpg" mode="aspectFill" />
            <view class="mask">
                <uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
                <view class="text">更多</view>
            </view>
        </navigator>

    </view>
</template>

<script lang="ts" setup>
import { compareTimestamp } from '@src/utils/common.js'

defineProps({
    isMore: {
        type: Boolean,
        default: false,
    }, item: {
        type: Object,
        default() {
            return {
                name: "默认名称",
                picurl: "../../static/images/test/preview2.jpg",
                updateTime: Date.now() - 1000 * 60 * 60 * 5
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.themeItem {
    height: 340rpx;
    position: relative;

    .mainConent {
        width: 100%;
        height: 100%;

        .pic {
            width: 100%;
            height: 100%;
            border-radius: 10rpx;

        }

        .tab {
            background: rgba(250, 129, 90, 0.7);
            backdrop-filter: blur(20rpx);
            font-size: 22rpx;
            padding: 6rpx 14rpx;
            border-radius: 0 0 20rpx 0;
            transform: scale(0.8);
            transform-origin: left top;
            color: #fff;
            position: absolute;
            left: 0;
            top: 0;
        }

        .mask {
            width: 100%;
            height: 70rpx;
            color: #fff;
            font-size: 30rpx;
            font-size: 600;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(20rpx);
        }
    }

    .mainConent.more {
        .mask {
            width: 100%;
            height: 100%;
            flex-direction: column;
        }

        .text {
            font-size: 28rpx;
        }
    }


}
</style>