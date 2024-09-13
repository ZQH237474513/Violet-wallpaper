<template>
	<navigator v-if="item.href" :url="item.href" open-type="navigate">
		<view class="userItem">
			<view class="left">
				<uni-icons :type="item.iconType" size="20" color="#28B389" />
				<view class="text">{{ item.name }}</view>
				<!-- <slot v-if="item.isShowSlot" class="text" name="text"></slot> -->
			</view>
			<view class="right">
				<view class="text" v-if="item.count !== -1">{{ item.count }}</view>
				<uni-icons type="right" size="15" color="#aaa"></uni-icons>
			</view>
		</view>
	</navigator>
	<view v-else :url="item.href" open-type="navigate" class="userItem">
		<view class="left">
			<uni-icons :type="item.iconType" size="20" color="#28B389" />
			<view v-if="!item.isShowSlot" class="text">{{ item.name }}</view>
			<slot v-if="item.isShowSlot" class="text" name="text"></slot>
		</view>
		<view class="right">
			<view class="text" v-if="item.count !== -1">{{ item.count }}</view>
			<uni-icons type="right" size="15" color="#aaa"></uni-icons>
		</view>
	</view>
</template>

<script setup lang="ts">
defineProps({
	item: {
		type: Object,
		default() {
			return {
				iconType: 'color',
				name: '默认名称',
				count: 0,
				href: '',
				isShowSlot: false
			};
		}
	}
});
</script>

<style lang="scss" scoped>
.userItem {
	display: flex;
	justify-content: space-between;
	border: 1px solid #eee;
	height: 100rpx;
	align-items: center;
	padding: 0 30rpx;
	background: #fff;

	.left {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			padding-left: 20rpx;
			color: #666;
		}
	}

	.right {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			font-size: 28rpx;
			color: #aaa;

			padding-right: 20rpx;
		}
	}
}
</style>
