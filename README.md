# Violet-wallpaper
搁浅壁纸



一款壁纸工具类软件 后端API由咸虾米壁纸提供

~~后端api地址 https://api.qingnian8.com/apis/~~

后端api 改为 360壁纸API https://www.jianshu.com/p/796496029886

```ts
/** 获取壁纸类别 **/
http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories

/** 获取某类别下的壁纸 **/
http://wallpaper.apc.360.cn/index.php? c=WallPaperAndroid a=getAppsByCategory

/** 按关键字搜索壁纸 **/
http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw=%E6%AF%95%E4%B8%9A&start=0&count=99

/** 获取今日热门搜索 **/
http://openbox.mobilem.360.cn/html/api/wallpaperhot.html


```



b站教学视频 https://www.bilibili.com/video/BV1Yg4y127Fp

# 开始

```js
npm install -g pnpm
pnpm run install
pnpm run dev:h5 // h5端
pnpm run dev:app // app端
pnpm run dev:mp-weixin // 微信小程序

pnpm run build:h5
pnpm run build:mp-weixin
pnpm run build:app
```



# 预览地址

**搁浅壁纸以上架主流平台 微信小程序端 ; app安卓端 ; H5网页端**

## 小程序

![](doc/images/搁浅壁纸_小程序.jpg)

## h5

 [https://static-mp-7fa83821-38f5-4b9a-97c7-ad3fedaaf01e.next.bspapp.com/#/](https://gitee.com/link?target=https%3A%2F%2Fstatic-mp-7fa83821-38f5-4b9a-97c7-ad3fedaaf01e.next.bspapp.com%2F%23%2F)

![](doc/images/搁浅壁纸_H5(网页版).png)





## APP(仅安卓手机)

https://mp-7fa83821-38f5-4b9a-97c7-ad3fedaaf01e.cdn.bspapp.com/cloudstorage/__UNI__543260B_20240914003844.apk

![](doc/images/搁浅壁纸_APP(安卓版).png)

# app部分页面截图

![](doc/images/微信图片_20240914084351.jpg)

![](doc/images/微信图片_20240914084410.jpg)

![](doc/images/微信图片_20240914084418.jpg)

![](doc/images/微信图片_20240914084423.jpg)

![](doc/images/微信图片_20240914084428.jpg)

![](doc/images/微信图片_20240914084434.jpg)