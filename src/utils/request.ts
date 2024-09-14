const { VITE_BASIC_URL, VITE_API_BASIC, VITE_ACCESS_KE } = import.meta.env;

interface requersConfig {
	url: string;
	method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined;
	data?: any;
	header?: Object;
	responseType?: string;
}

/** 网络请求 */
export const request = (config: requersConfig) => {
	const { url, method = "GET", data, header = {} } = config;
	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			url: /^(http|https)/gi.test(url) ? url : `${VITE_BASIC_URL}${VITE_API_BASIC}${url}`,
			data,
			header: { "access-key": VITE_ACCESS_KE, ...header },
			method,
			success: (res: any) => {
				if (res.data.errCode === 400) {
					uni.showModal({
						title: "错误提示",
						content: `${res.data.errMsg} \n "access-key":${VITE_ACCESS_KE}`,
						showCancel: false,
					});
				}

				resolve(res.data.data);
			},
			fail: (err: any) => {
				reject(err);
			},
		});
	});
};
