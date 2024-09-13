<template>
	<view class="layout">
		<view class="navBar">
			<view class="statusBar" :style="{ height: `${satusBarHeight}px` }"></view>
			<view class="titleBar" :style="{ height: `${titleBarHeight}px` }">
				<view class="title">{{ title }}</view>

				<!-- <navigator url="" hover-class="none"> -->
				<navigator url="../../pages/search/search" hover-class="none">
					<view class="search">
						<uni-icons class="icon" type="search" color="#888" size="18" />
						<view class="text">搜索</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{ height: `${navBarHeight}px` }"></view>
	</view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { getTitleBarHeight, getNavBarHeight, getSatusBarHeight } from "@src/utils/system.js";

const titleBarHeight = computed(getTitleBarHeight);
const navBarHeight = computed(getNavBarHeight);
const satusBarHeight = computed(getSatusBarHeight);




defineProps({
	title: {
		type: String,
		default: "壁纸",
	},
});
</script>

<style lang="scss" scoped>
.layout {
	.navBar {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100%;
		background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);

		.titleBar {
			display: flex;
			align-items: center;
			padding: 0 30rpx;

			.title {
				font-size: 22px;
				font-weight: 700;
			}

			.search {
				margin-left: 30rpx;
				display: flex;
				align-items: center;
				width: 220rpx;
				height: 50rpx;
				border: 1px solid #fff;
				background: rgba(255, 255, 255, 0.4);
				border-radius: 60rpx;
				color: #999;
				font-size: 28rpx;

				.icon {
					margin: 0 10rpx 0 5rpx;
				}
			}
		}
	}
}
</style>
