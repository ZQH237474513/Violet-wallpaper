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
const classifyList: any = ref([])


onMounted(() => {
	classifyList.value = uni.getStorageSync('themeList') || []
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
