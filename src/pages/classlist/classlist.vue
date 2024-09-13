<template>
    <view class="classlistLayout">
        <view class="loadingLayout" v-if="!classifyDetailList.length && !noData">
            <uni-load-more status="loading"></uni-load-more>
        </view>
        <view class="content">
            <navigator :url="`/pages/preview/preview?id=${item._id}`" class="classlistItem"
                v-for="item in classifyDetailList" :key="item._id">
                <image :src="item.smallPicurl" mode="aspectFill" />
            </navigator>
        </view>

        <view class="loadingLayout" v-if="classifyDetailList.length || noData">
            <uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
        </view>

        <view class="safe-area-inset-bottom"></view>
    </view>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onLoad, onReachBottom, onUnload } from '@dcloudio/uni-app';
import { getClassifyDetailList, myDownloadOrScoreList } from '@api/apis';

const classifyDetailList: any = ref([])
const noData = ref(false);


const queryParams: any = {
    pageNum: 1,
    pageSize: 12
};


onLoad((e: any) => {
    let { name = null, id = '', type = null } = e;
    if (id) {
        queryParams.classid = id
    }

    if (type) {
        queryParams.type = type

    }
    //修改导航标题
    uni.setNavigationBarTitle({
        title: name
    });

    getClassList()

});

onReachBottom(() => {
    if (noData.value) {
        return;
    }
    queryParams.pageNum++;
    getClassList()
})


const getClassList = async () => {
    const res: any = queryParams.type ? await myDownloadOrScoreList(queryParams) : await getClassifyDetailList(queryParams);


    if (res) {
        const data = [...classifyDetailList.value, ...res];
        classifyDetailList.value = data;
        uni.setStorageSync('classifyDetailList', JSON.parse(JSON.stringify(data)))
    }

    if (res.length < queryParams.pageSize) {
        noData.value = true;
    }
}


onUnload(() => {
    uni.removeStorageSync("classifyDetailList")
})

</script>

<style lang="scss" scoped>
.classlistLayout {


    .content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5rpx;
        padding: 5rpx;

        .classlistItem {
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