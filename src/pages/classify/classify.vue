<template>
	<view class="classifyWrapper pageBg">
		<custom-nav-bar title="分类" />

		<view class="classifyList">
			<theme-item v-for="item in classifyList" :item="item" :key="item._id"></theme-item>

		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getClassifyList } from '@api/apis';
const classifyList: any = ref([])


onMounted(() => {
	getClassifyList({ pageNum: 1, pageSize: 15 }).then((res: any) => {
		if (res) {

			// #ifdef MP-WEIXIN
			classifyList.value = res.filter((item: any) => {
				return item.name !== 'AI美图'
			});
			// #endif

			// #ifndef MP-WEIXIN
			classifyList.value = res;
			// #endif

		}
	})
})

</script>

<style lang="scss">
.classifyWrapper {
	.classifyList {
		display: grid;
		padding: 30rpx;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
}
</style>
