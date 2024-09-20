const {
	VITE_BASIC_URL,
	VITE_API_BASIC,
	VITE_ACCESS_KE,
	VITE_BASIC_URL_TWO,
	VITE_BASIC_URL_ONE,
	VITE_BASIC_URL_THREE,
} = import.meta.env;

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
				if (res.statusCode === 200) {
					if (url.includes(VITE_BASIC_URL_TWO)) {
						resolve(res.data.res);
					} else if (url.includes(VITE_BASIC_URL_ONE)) {
						resolve(res.data.data);
					} else if (url.includes(VITE_BASIC_URL_THREE)) {
						resolve(res.data);
					}
				}
			},
			fail: (err: any) => {
				reject(err);
			},
		});
	});
};
