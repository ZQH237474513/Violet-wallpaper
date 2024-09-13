<template>
    <view class="previewLayout">
        <swiper circular @change="swiperChangeHandle" :current="currentImageIndex">
            <swiper-item v-for="item in classifyDetailList" :key="item._id">
                <image :src="item.picurl" @click="changeMaskStatusHandle" mode="aspectFill" />
            </swiper-item>
        </swiper>
        <view class="mask" v-if="maskStatus">
            <view class="backBtn" @click="goBack" :style="{ top: `${getSatusBarHeight() + 6}px` }">
                <uni-icons type="back" color="#fff" size="20"></uni-icons>
            </view>
            <view class="count"> {{ `${currentImageIndex + 1} / ${classifyDetailList.length}` }} </view>
            <view class="time">
                <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
            </view>
            <view class="date">
                <uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
            </view>
            <view class="footer">
                <view class="box" @click="() => openOrCloseInfoPopup('open')">
                    <uni-icons type="info" size="28"></uni-icons>
                    <view class="text">信息</view>
                </view>

                <view class="box" @click="() => openOrCloseScorePopup('open')">
                    <uni-icons type="star" size="28"></uni-icons>
                    <view class="text">{{ currentSingleImageInfo.score }}分</view>
                </view>

                <view class="box" @click="downloadCurImage">
                    <uni-icons type="download" size="23"></uni-icons>
                    <view class="text">下载</view>
                </view>



            </view>
        </view>

        <uni-popup ref="infoPopup" type="bottom">
            <view class="infoPopup">
                <view class="header">
                    <view />
                    <view class="title">壁纸信息</view>
                    <view class="close" @click="() => openOrCloseInfoPopup('close')">
                        <uni-icons type="closeempty" size="18" color="#999" />
                    </view>
                </view>
                <scroll-view scroll-y>
                    <view class="content">
                        <view class="row">
                            <view class="label">壁纸ID:</view>
                            <view class="vlaue">{{ currentSingleImageInfo._id }}</view>
                        </view>
                        <view class="row">
                            <view class="label">发布者:</view>
                            <view class="vlaue">{{ currentSingleImageInfo.nickname }}</view>
                        </view>

                        <view class="row">
                            <text class="label">评分：</text>
                            <view class='value roteBox'>
                                <uni-rate readonly touchable size="16" v-model="currentSingleImageInfo.score" />
                                <text class="score">{{ currentSingleImageInfo.score }}分</text>
                            </view>
                        </view>

                        <view class="row">
                            <text class="label">摘要：</text>
                            <view class='value'>
                                {{ currentSingleImageInfo.description }}

                            </view>
                        </view>

                        <view class="row">
                            <text class="label">标签：</text>
                            <view class='value tabs'>
                                <view class="tab" v-for="(tab, i) in currentSingleImageInfo.tabs" :key="`${tab}_${i}`">
                                    {{ tab }}
                                </view>
                            </view>
                        </view>

                    </view>
                </scroll-view>

                <view class="copyright">
                    声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
                </view>
            </view>
        </uni-popup>

        <uni-popup ref="scorePopup">
            <view class="scorePopup">
                <view class="header">
                    <view />
                    <view class="title">{{ isScore ? '评分过了~' : '壁纸评分' }}</view>
                    <view class="close" @click="() => openOrCloseScorePopup('close')">
                        <uni-icons type="closeempty" size="18" color="#999" />
                    </view>
                </view>
                <view class="center">
                    <uni-rate allowHalf :readonly="isScore" disabled-color="#FFCA3E" v-model="userScore" size="30" />
                    <text class="text">{{ userScore }}分</text>
                </view>
                <view class="footer">
                    <button size="mini" @click="confirmScorehandle" :disabled="!userScore || isScore">确定评分</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad, onShareTimeline, onShareAppMessage } from '@dcloudio/uni-app';
import { getSatusBarHeight, } from '@src/utils/system';
import { confirmUserScore, downloadImage } from '@api/apis';

const { VITE_APP_NAME } = import.meta.env;

const classifyDetailList: any = ref([]);
const currentImageIndex = ref(0);
const maskStatus = ref(true);
const isScore = ref(false);
const scorePopup: any = ref(null);
const infoPopup: any = ref(null);
const userScore: any = ref(0);
const currentImageInfoId = ref(null);
const currentSingleImageInfo: any = ref({});

onLoad((e: any) => {
    const { id = null } = e;

    if (id) {
        currentImageInfoId.value = id
    }

    const data = uni.getStorageSync('classifyDetailList') || [];
    classifyDetailList.value = data.map((item: any) => {
        return { ...item, picurl: item.smallPicurl.replace("_small.webp", ".jpg") }
    });
})



const findImageIndex = () => {
    const targetIndex = [...classifyDetailList.value].findIndex((item: any) => {
        return item._id === currentImageInfoId.value
    })

    if (targetIndex !== -1) {
        return targetIndex
    }
    return 0
}

onMounted(() => {

    const curtargetIndex = findImageIndex();

    if (curtargetIndex === 0) {
        currentSingleImageInfo.value = classifyDetailList.value[curtargetIndex]
    }
    currentImageIndex.value = curtargetIndex;

})



/** 关闭/开启评分窗口 */
const openOrCloseScorePopup = (type: 'open' | 'close' = 'open') => {
    if (!scorePopup.value || !scorePopup.value[type]) {
        return;
    }

    if (type === 'open') {
        if (currentSingleImageInfo.value.userScore) {
            isScore.value = true;
            userScore.value = currentSingleImageInfo.value.userScore;
        }
    } else if (type === 'close') {
        userScore.value = 0;
        isScore.value = false;
    }

    return scorePopup.value[type]()

}
/** 关闭/开启信息窗口 */
const openOrCloseInfoPopup = (type: 'open' | 'close' = 'open') => {
    if (!infoPopup.value || !infoPopup.value[type]) {
        return;
    }
    return infoPopup.value[type]()

}

/** 确认评分 */
const confirmScorehandle = async () => {

    try {
        uni.showLoading({
            title: "加载中..."
        })
        const { classid, _id } = currentSingleImageInfo.value;
        const res = await confirmUserScore({ classid, wallId: _id, userScore: userScore.value })
        if (res) {
            currentSingleImageInfo.value = { ...currentSingleImageInfo.value, userScore: userScore.value };
            uni.showToast({
                title: "评分成功",
                icon: "none"
            })
            openOrCloseScorePopup('close')

        }
        uni.hideLoading();
    } finally {
        uni.hideLoading();
    }

}

/** 轮播图图片变化事件 */
const swiperChangeHandle = (e: any) => {
    currentImageIndex.value = e.detail.current;
    currentSingleImageInfo.value = classifyDetailList.value[e.detail.current];
}

/** 修改遮罩层状态 */
const changeMaskStatusHandle = () => {
    maskStatus.value = !maskStatus.value
}

/** 路由返回 */
const goBack = () => {
    uni.navigateBack({
        success: () => {

        },
        fail: (err) => {
            uni.reLaunch({
                url: "/pages/index/index"
            })
        }
    })
}

const downloadCurImage = async () => {
    // #ifdef H5
    uni.showModal({
        content: "请长按保存壁纸",
        showCancel: false
    })
    // #endif

    // #ifndef H5
    try {

        uni.showLoading({
            title: "下载中...",
            mask: true
        })
        const {
            classid,
            _id: wallId
        } = currentSingleImageInfo.value;
        const res: any = await downloadImage({
            classid,
            wallId
        })
        if (res.errCode != 0) throw res;
        uni.getImageInfo({
            src: currentSingleImageInfo.value.picurl,
            success: (res) => {
                uni.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success: (res) => {
                        uni.showToast({
                            title: "保存成功，请到相册查看",
                            icon: "none"
                        })
                    },
                    fail: err => {
                        if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
                            uni.showToast({
                                title: '保存失败，请重新点击下载',
                                icon: "none"
                            })
                            return;
                        }
                        uni.showModal({
                            title: "授权提示",
                            content: "需要授权保存相册",
                            success: res => {
                                if (res.confirm) {
                                    uni.openSetting({
                                        success: (setting) => {
                                            console.log(
                                                setting);
                                            if (setting
                                                .authSetting[
                                                'scope.writePhotosAlbum'
                                            ]) {
                                                uni.showToast({
                                                    title: "获取授权成功",
                                                    icon: "none"
                                                })
                                            } else {
                                                uni.showToast({
                                                    title: "获取权限失败",
                                                    icon: "none"
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    },
                    complete: () => {
                        uni.hideLoading();
                    }
                })

            }
        })

    } catch (err) {
        console.log(err);
        uni.hideLoading();
    }
    // #endif
}

//分享给好友
onShareAppMessage((e) => {
    return {
        title: VITE_APP_NAME,
        path: "/pages/preview/preview?id=" + currentImageInfoId.value + "&type=share"
    }
})


//分享朋友圈
onShareTimeline(() => {
    return {
        title: VITE_APP_NAME,
        query: "id=" + currentImageInfoId.value + "&type=share"
    }
})

</script>


<style lang="scss" scoped>
.previewLayout {
    width: 100%;
    height: 100vh;
    position: relative;

    swiper {
        width: 100%;
        height: 100%;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .mask {
        &>view {
            position: absolute;
            left: 0;
            margin: auto;
            color: #fff;
            right: 0;
            width: fit-content;
        }

        .backBtn {
            width: 38px;
            height: 38px;
            background: rgba(0, 0, 0, 0.5);
            left: 30rpx;
            margin-left: 0;
            border-radius: 100px;
            top: 0;
            backdrop-filter: blur(10rpx);
            border: 1rpx solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .count {
            top: 10vh;
            background: rgba(0, 0, 0, 0.3);
            font-size: 28rpx;
            border-radius: 40rpx;
            padding: 8rpx 28rpx;
            backdrop-filter: blur(10rpx);
        }

        .time {
            font-size: 140rpx;
            top: calc(10vh + 80rpx);
            font-weight: 100;
            line-height: 1em;
            text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
        }

        .date {
            font-size: 34rpx;
            top: calc(10vh + 230rpx);
            text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
        }

        .footer {
            background: rgba(255, 255, 255, 0.8);
            bottom: 10vh;
            width: 65vw;
            height: 120rpx;
            border-radius: 120rpx;
            color: #000;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(20rpx);

            .box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 2rpx 12rpx;

                .text {
                    font-size: 26rpx;
                    color: $text-font-color-2;
                }
            }
        }
    }

    .infoPopup {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 30rpx 30rpx 0 0;
        overflow: hidden;
        padding: 30rpx;

        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                color: $text-font-color-2;
                font-size: 26rpx;
            }

            .close {
                padding: 6rpx;
            }
        }

        scroll-view {
            max-height: 60vh;

            .content {
                .row {
                    display: flex;
                    padding: 16rpx 0;
                    font-size: 32rpx;
                    line-height: 1.7em;

                    .label {
                        color: $text-font-color-3;
                        width: 140rpx;
                        text-align: right;
                        font-size: 30rpx;
                        position: relative;
                        padding-right: 20rpx;

                    }

                    .value {
                        flex: 1;
                        width: 0;
                    }

                    .roteBox {
                        display: flex;
                        align-items: center;

                        .score {
                            font-size: 26rpx;
                            color: $text-font-color-2;
                            padding-left: 10rpx;
                        }
                    }

                    .tabs {
                        display: flex;
                        flex-wrap: wrap;

                        .tab {
                            border: 1px solid $brand-theme-color;
                            color: $brand-theme-color;
                            font-size: 22rpx;
                            padding: 10rpx 30rpx;
                            border-radius: 40rpx;
                            line-height: 1em;
                            margin: 0 10rpx 10rpx 0;
                        }
                    }
                }
            }
        }

        .copyright {
            font-size: 28rpx;
            padding: 20rpx;
            background: #F6F6F6;
            color: #666;
            border-radius: 10rpx;
            margin: 20rpx 0;
            line-height: 1.6em;
        }
    }

    .scorePopup {
        width: 80vw;
        height: 350rpx;
        padding: 30rpx;
        border-radius: 5%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .center {
            display: flex;
            justify-content: center;
            align-items: center;

            .text {
                color: #FFCA3E;
                padding-left: 10rpx;
                width: 80rpx;
                line-height: 1em;
                text-align: right;
                font-size: 28rpx;
            }
        }

        .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: -5rpx;
        }
    }
}
</style>