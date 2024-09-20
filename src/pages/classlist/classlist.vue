<template>
    <view class="classlistLayout">
        <view class="loadingLayout" v-if="!classifyDetailList.length && !noData">
            <uni-load-more status="loading"></uni-load-more>
        </view>
        <view class="content">
            <navigator :url="`/pages/preview/preview?id=${item.id}`" class="classlistItem"
                v-for="item in classifyDetailList" :key="item.id">
                <image :src="item.previewSrc" mode="aspectFill" />
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
import { myDownloadOrScoreList } from '@api/apis';
import { getClassifyDetailList } from '@api/detailListApi';

const classifyDetailList: any = ref([])
const noData = ref(false);


const queryParams: any = {
    start: 1,
    count: 48,
    pageNum: 1,
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
    queryParams.start = queryParams.pageNum * queryParams.count;
    getClassList()
})



const getHistory = () => {
    if (queryParams.type === 'download') {
        return uni.getStorageSync('myDownlodImages') || []
    }
    return uni.getStorageSync('myScoreImages') || []
}


const getClassList = async () => {
    const { classid, count, start } = queryParams;
    const res: any = queryParams.type ? getHistory() : await getClassifyDetailList({ classid, count, start });

    if (res) {
        const data = [...classifyDetailList.value, ...res];
        classifyDetailList.value = data;
        uni.setStorageSync('classifyDetailList', JSON.parse(JSON.stringify(data)))
    }

    if (res.length < queryParams.count) {
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