<template>
	<view class="searchLayout">
		<view class="search">
			<uni-search-bar v-model="queryParams.keyword" @confirm="confirmSearcHandle" @clear="clearSearcHandle"
				@cancel="cancelSearcHandle" />
		</view>
		<view class="tagList" v-if="!searchResolveList.length || noSearch">
			<view class="history" v-if="historySearchList.length">
				<view class="topTitle">
					<view>最近搜索</view>
					<view class="icon">
						<uni-icons @click="deleteHistoryHandle" type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" @click="() => clickTab(item)" v-for="item in historySearchList" :key="item">{{ item }}
					</view>
				</view>
			</view>
			<view class="recommend">
				<view class="topTitle">热门搜索</view>
				<view class="tabs">
					<view @click="() => clickTab(item)" class="tab" v-for="item in recommendList" :key="item">{{ item }}
					</view>
				</view>
			</view>
		</view>

		<view class="noSearchWarrper" v-if="noSearch">
			<view class="noSearch">
				<image src="http://cdn.uviewui.com/uview/empty/search.png"></image>
				<view>没有搜索结果</view>
			</view>
		</view>

		<view v-else>
			<scroll-view scroll-y>
				<view class="list">
					<navigator :url="`/pages/preview/preview?id=${item.id}`" class="item" v-for="item in searchResolveList"
						:key="item._id">
						<image :src="item.url_mobile || item.url_mid" mode='aspectFill'></image>
					</navigator>
				</view>
				<view class="loadingLayout" v-if="noData || searchResolveList.length">
					<uni-load-more :status="noData ? 'noMore' : 'loading'" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { onLoad, onReachBottom, onUnload } from '@dcloudio/uni-app';
import { searchKeyImages } from '@api/homeApis';


//查询参数
const queryParams = ref({
	start: 1,
	count: 48,
	pageNum: 1,
	keyword: ""
})



// 最近搜索
const historySearchList: any = ref([]);

//热门搜索词
const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);

const searchResolveList: any = ref([]);

const noData = ref(false);
const noSearch = ref(false);

onMounted(() => {
	(async () => {
		historySearchList.value = uni.getStorageSync('historySearchList');
	})()
})

//关闭有页面
onUnload(() => {
	uni.removeStorageSync("classifyDetailList");
})

//触底加载更多
onReachBottom(() => {
	if (noData.value) {
		return;
	};
	queryParams.value.pageNum++;
	queryParams.value.start = queryParams.value.pageNum * queryParams.value.count;
	searchData();
})

//点击标签进行搜索
const clickTab = (value) => {
	initParams(value);

	searchData();
}

const searchData = async () => {
	try {
		uni.showLoading();
		const res: any = await searchKeyImages(queryParams.value);
		searchResolveList.value = [...searchResolveList.value, ...res];

		uni.setStorageSync("classifyDetailList", JSON.parse(JSON.stringify(searchResolveList.value)));
		if (queryParams.value.count > res?.length) {
			noData.value = true
		};


		if (res?.length === 0 && searchResolveList.value.length === 0) {
			noSearch.value = true
		};

	} finally {
		uni.hideLoading();;
	}

};



const initParams = (value?: string) => {
	noData.value = false;
	noSearch.value = false;
	searchResolveList.value = [];
	queryParams.value = {
		start: 1,
		count: 48,
		pageNum: 1,
		keyword: value || ""
	}
}



const confirmSearcHandle = (e: any) => {
	const { value } = e;
	if (!value) {
		uni.showToast({
			title: '您还没输入任何搜索词!',
			icon: 'none'
		})
		return;
	}

	historySearchList.value = [...new Set([...historySearchList.value, queryParams.value.keyword])];
	uni.setStorageSync('historySearchList', [...historySearchList.value]);
	initParams(value)
	searchData();
}
const clearSearcHandle = () => {
	initParams()
}
const cancelSearcHandle = () => {
	initParams()
}


const deleteHistoryHandle = () => {
	uni.showModal({
		title: "是否清空历史搜索？",
		success: res => {
			if (res.confirm) {
				uni.removeStorageSync("historySearchList");
				historySearchList.value = []
			}
		}
	})

}
</script>

<style lang="scss">
.searchLayout {
	.tagList {

		.topTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #999;
		}

		.history {
			padding: 30rpx;
		}

		.recommend {
			padding: 30rpx;
		}

		.tabs {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 20rpx;

			.tab {
				background: #F4F4F4;
				font-size: 28rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}
	}

	.noSearchWarrper {

		display: flex;
		align-items: center;
		justify-content: center;

		.noSearch {
			width: 300rpx;
			height: 400rpx;
			text-align: center;
			font-size: 20rpx;
			color: #b6b6b6;

			image {
				width: 100%;
				height: 300rpx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				align-items: center;
			}
		}

	}


	.list {
		width: 100vw;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 20rpx 5rpx;

		.item {
			height: 440rpx;

			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
