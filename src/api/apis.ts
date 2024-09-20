import { request } from "@utils/request";

interface PageInfo {
	pageSize?: number;
	pageNum?: number;
}

interface ClassifyDetailParms extends PageInfo {
	classid: string;
}

// ---------------------首页-------------
/** 轮播图 ===> 获取banner图 */
export const getBanner = () => {
	return request({ url: "/homeBanner", method: "GET" });
};

/** 每日推荐 ===> 获取随机9张图 */
export const getRandomWall = () => {
	return request({ url: "/randomWall", method: "GET" });
};

/** 精选专题 ===> 获取首页分类图 */
export const getThemeList = () => {
	return request({ url: "/classify", method: "GET", data: { select: true } });
};

// -----------------分类页面---------------------

/** 分类页面 ===> 获取首页分类图 */
export const getClassifyList = (params: PageInfo) => {
	return request({ url: "/classify", method: "GET", data: params });
};

//---------------------详情页面--------------------

/** 详情页面 ==> 获取分类详情列表图 */
export const getClassifyDetailList = (data: ClassifyDetailParms) => {
	return request({ url: "/wallList", method: "GET", data });
};

//______预览页面__________________

/** 获取单个壁纸详情 */
export const getsingleImageInfo = (data: { id: string }) => {
	return request({ url: "/detailWall", data });
};

interface ConfirmUserScoreParams {
	classid: string;
	wallId: string;
	userScore: string;
}

/** 评分确认 */
export const confirmUserScore = (data: ConfirmUserScoreParams) => {
	return request({ url: "/setupScore", data });
};

interface DownloadImageParams {
	classid: string;
	wallId: string;
}

/** 壁纸下载 */
export const downloadImage = (data: DownloadImageParams) => {
	return request({ url: "/downloadWall", data });
};

// ______________ 我的 ______________

/** 用户信息 */
export const userInfo = () => {
	return request({ url: "/userInfo" });
};

interface MyDownloadOrScoreList extends PageInfo {
	type: "score" | "download";
}

/** 我的下载/评分 */
export const myDownloadOrScoreList = (data: MyDownloadOrScoreList) => {
	return request({ url: "/userWallList", data });
};

//_________________搜索页________________

interface SearchParams extends PageInfo {
	keyword: string;
}

/** 搜索 */
export const searchResolveData = (data: SearchParams) => {
	return request({ url: "/searchWall", data });
};

/** 每日一言 */
export const getOneWordDay = () => {
	return request({ url: "https://api.codelife.cc/yiyan/random?lang=cn" });
};

// http://service.picasso.adesk.com/v1/vertical/category
