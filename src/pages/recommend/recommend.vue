<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="首页" />
		<view class="banner">
			<swiper autoplay circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
				<swiper-item v-for="(item, i) in bannerList" :key="item.id">
					<image :src="item.previewSrc" mode="aspectFill" />
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" color="#28b389" size="20" />
				<!-- <text class="text">公告</text> -->
			</view>
			<view class="center">
				<uni-notice-bar :speed="50" background-color="#f9f9f9" scrollable
					:text="`${oneWordDay.hitokoto} ${oneWordDay.from}`" />
				<!-- <swiper circular duration="300" interval="1500">
					<swiper-item v-for="(item) in oneWordDay">{{ item.hitokoto }} {{ item.from }}</swiper-item>
				</swiper> -->
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>

		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="currentDate">
						<uni-icons type="calendar" color="#28B389" size="18" />
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日" />
						</view>
					</view>
				</template>
			</common-title>
			<view class="center">
				<scroll-view scroll-x>
					<navigator :url="`/pages/preview/preview?id=${item.id}`" class="box" v-for="item in recommendList"
						:key="item.id">
						<image :src="item.img" mode="scaleToFill" />
					</navigator>
				</scroll-view>
			</view>
		</view>


		<view class="theme">
			<common-title>
				<template #name>精选专题</template>
				<template #custom>

					<navigator class="more" url="/pages/classify/classify" open-type="reLaunch">
						More+
					</navigator>

				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="(item, i) in themeList" :key="item.id" :item="item"></theme-item>
				<theme-item :isMore="true" v-if="themeList.length" />
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { onLoad, onUnload, onHide } from '@dcloudio/uni-app';
import { getBanner, getOneWordDay } from '@api/apis'
import { getRandomWall, getThemeList, searchKeyImages } from '@api/homeApis';
import { getRandomNumber } from '@utils/common'

const bannerList: any = ref([]);
const recommendList: any = ref([]);
const themeList: any = ref([]);
const oneWordDay: any = ref({});

onMounted(() => {
	searchKeyImages({ keyword: '4k', start: getRandomNumber(1, 60), count: 5 }).then((res: any) => {
		bannerList.value = res;
	})

	getRandomWall().then((res: any) => {
		recommendList.value = res
	})
	getThemeList().then((res: any) => {
		uni.setStorageSync('themeList', res)
		themeList.value = res.slice(0, 5)
	})
	getOneWordDay().then((res: any) => {
		oneWordDay.value = res
	})
})

onHide(() => {

	uni.setStorageSync("classifyDetailList", JSON.parse(JSON.stringify(recommendList.value)));

})





</script>

<style lang="scss" scoped >
.homeLayout {
	.banner {
		width: 750rpx;
		padding: 30rpx 0;

		swiper {
			width: 750rpx;
			height: 340rpx;

			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}

	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;


		.left {
			width: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				color: #28b389;
				font-weight: 600;
				font-size: 28rpx;
			}
		}

		.center {
			flex: 1;
			margin-left: -52rpx;

			swiper {
				height: 100%;

				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.right {
			width: 70rpx;
		}



	}

	.select {
		padding-top: 50rpx;

		.currentDate {
			display: flex;
			align-items: center;
			color: $brand-theme-color
		}

		.text {
			margin-left: 5rpx;
		}

		.center {
			width: 720rpx;
			margin: 30rpx 0 0 30rpx;

			scroll-view {
				white-space: nowrap;

				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}

	.theme {
		padding: 50rpx 0;

		.more {
			font-size: 32rpx;
			color: #888;

		}

		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 15rpx;
		}
	}
}
</style>
