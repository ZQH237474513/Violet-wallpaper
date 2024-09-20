import { request } from "@utils/request";
import { getRandomNumber } from "@utils/common";
const { VITE_BASIC_URL_TWO, VITE_BASIC_URL_THREE } = import.meta.env;

export const getRandomWall = (): Promise<any[]> => {
	return new Promise(async (resolve) => {
		try {
			const res: any = await request({
				url: `${VITE_BASIC_URL_TWO}/v1/vertical/vertical`,
				data: { limit: getRandomNumber(20, 30), skip: 180, adult: false, first: 0, order: "hot" },
			});

			if (res.vertical) {
				const data = res.vertical
					.filter((item: any) => {
						return (
							!item.tag.includes("制服") &&
							!item.tag.includes("jk") &&
							!item.tag.includes("御姐") &&
							!item.tag.includes("美背")
						);
					})
					.map((item: any) => {
						return { ...item, previewSrc: item.img, fav_total: item.favs };
					});
				resolve(data);
			} else {
				resolve([]);
			}
		} finally {
		}
	});
};

export const getThemeList = () => {
	return new Promise(async (resolve) => {
		try {
			const res: any = await request({
				url: `${VITE_BASIC_URL_THREE}/index.php`,
				data: {
					c: "WallPaperAndroid",
					a: "getAllCategories",
				},
			});
			if (res.data) {
				const allP = res.data.map((item: any) => {
					return new Promise(async (resolve) => {
						try {
							const res: any = await searchKeyImages({
								keyword: item.name.slice(0, 2),
								count: 1,
								// start: getRandomNumber(1, 20),
							});
							resolve({ ...res[0], picurl: res[0].url_mobile || res[0].url_mid, ...item });
						} finally {
						}
					});
				});
				const data = await Promise.all(allP);

				resolve(data);
			} else {
				resolve([]);
			}
		} catch {}
	});
};

interface SearchKeyImagesParams {
	keyword: string;
	start?: number;
	count?: number;
}

export const searchKeyImages = (params: SearchKeyImagesParams) => {
	const { keyword, start = 0, count = 12 } = params;
	return new Promise(async (resolve) => {
		try {
			const res: any = await request({
				url: `${VITE_BASIC_URL_THREE}/index.php`,
				data: {
					c: "WallPaper",
					a: "search",
					start,
					count,
					kw: keyword,
				},
			});
			if (res.data) {
				const data = res.data.map((item: any) => {
					return { ...item, previewSrc: item.url };
				});
				resolve(data);
			} else {
				resolve([]);
			}
		} finally {
		}
	});
};
