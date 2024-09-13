<template>
	<view class="userLayout pageBg">
		<view :style="{ height: getNavBarHeight() + 'px' }"></view>

		<view class="userInfo">
			<view class="avatar">
				<image src="../../static/images/logo/youyou.png" mode="aspectFill" />
			</view>
			<view class="ip">{{ myUserInfo.IP }}</view>
			<view class="address">来自于 : {{ myUserInfo.address?.city || myUserInfo.address?.province ||
				myUserInfo.address?.country }}</view>
		</view>

		<view class="section">
			<user-info-item v-for="(item, i) in userInfoListFistGround" :key="`${new Date().getTime()}_${i}`"
				:item="item"><template v-slot:text> <!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->
				</template></user-info-item>
		</view>

		<view class="section">
			<user-info-item v-for="(item, i) in userInfoListSecondGround" :key="`${new Date().getTime()}_${i}`"
				:item="item"></user-info-item>
		</view>

	</view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getNavBarHeight } from "@src/utils/system.js";
import { userInfo } from '@api/apis'

const myUserInfo: any = ref({});

const userInfoListFistGround = ref([{
	iconType: 'download-filled',
	name: '我的下载',
	count: myUserInfo.value.downloadSize || 0,
	href: '/pages/classlist/classlist?type=download&name=我的下载'
}, {
	iconType: 'star-filled',
	name: '我的评分',
	count: myUserInfo.value.scoreSize || 0,
	href: '/pages/classlist/classlist?type=score&name=我的评分'
}, {
	iconType: 'chatboxes-filled',
	name: '联系客服',
	count: -1,
	href: '',
	isShowSlot: true
},])

const clickContact = () => {
	uni.makePhoneCall({
		phoneNumber: "114"
	})
}

const userInfoListSecondGround = ref([{
	iconType: 'notification-filled',
	name: '订阅更新',
	count: -1,
	href: ''
}, {
	iconType: 'flag-filled',
	name: '常见问题',
	count: -1,
	href: ''
}])


onMounted(() => {

	(async () => {
		userInfo().then((res: any) => {
			const { downloadSize = 0, scoreSize = 0 } = res;

			userInfoListFistGround.value = [...userInfoListFistGround.value].map((item: any) => {
				if (item.name === '我的下载') {
					item.count = downloadSize
				} else if (item.name === '我的评分') {
					item.count = scoreSize
				}
				return item;
			})

			if (res) {
				myUserInfo.value = res;
			}
		})

	})()
})


</script>

<style lang="scss">
.userLayout {
	.userInfo {
		padding: 50rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;

			image {
				height: 100%;
				width: 100%;
			}


		}

		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}

		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}

	.section {
		margin: 50rpx auto;
		padding: 0 30rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

		button {
			background-color: #fff;
			border: none !important;
			width: 75vw;
			text-align: left;
			padding-left: 20rpx;
			color: #666;

			&::after {
				border: none !important;
			}
		}
	}
}
</style>
