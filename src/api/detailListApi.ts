import { request } from "@utils/request";
import { getRandomNumber } from "@utils/common";
const { VITE_BASIC_URL_THREE } = import.meta.env;

// export const getClassifyDetailList = (params: any) => {
// 	const { classid } = params;
// 	return new Promise(async (resolve) => {
// 		try {
// 			const res: any = await request({
// 				url: `${VITE_BASIC_URL_TWO}/v1/vertical/category/${classid}/vertical`,
// 				data: { limit: 999, adult: false, first: 30, order: "new", size: 3 },
// 			});

// 			if (res.vertical) {
// 				resolve(res.vertical);
// 			} else {
// 				resolve([]);
// 			}
// 		} catch {}
// 	});
// };

interface ClassifyDetailListParams {
	classid: number;
	start?: number;
	count?: number;
}

export const getClassifyDetailList = (params: ClassifyDetailListParams) => {
	const { classid, start = 0, count = 12 } = params;
	return new Promise(async (resolve) => {
		try {
			const res: any = await request({
				url: `${VITE_BASIC_URL_THREE}/index.php`,
				data: { c: "WallPaperAndroid", a: "getAppsByCategory", cid: classid, start, count },
			});

			if (res.data) {
				const data = res.data.map((item: any) => {
					return { ...item, id: item.pid, previewSrc: item.url };
				});

				resolve(data);
			} else {
				resolve([]);
			}
		} catch {}
	});
};
