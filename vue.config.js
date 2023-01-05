const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
		proxy: {
			'/inewsRequest': {
				//代理api
				target: 'https://r.inews.qq.com', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/inewsRequest': '' //代理路径
				}
			},
			'/viewRequest': {
				//代理api
				target: 'https://view.inews.qq.com/g2/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/viewRequest': '' //代理路径
				}
			},
			'/provinceMapJson': {
				//代理api
				target: 'https://mat1.gtimg.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/provinceMapJson': '' //代理路径
				}
			},
			'/provinceNewsRequest': {
				//代理api
				target: 'https://api.dreamreader.qq.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				ws: true, // proxy websockets
				pathRewrite: {
					//重写路径
					'^/provinceNewsRequest': '' //代理路径
				}
			},
			'/apiMapQQ': {
				//代理api
				target: 'https://apis.map.qq.com', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiMapQQ': '' //代理路径
				}
			},
			'/apiMapTransfer': {
				//代理api
				target: 'https://map.so.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiMapTransfer': '' //代理路径
				}
			},
			'/apiVaccineData': {
				//代理api
				target: 'https://v.qq.com/', // 代理接口(注意只要域名就够了)
				changeOrigin: true, //是否跨域
				secure: false,
				pathRewrite: {
					//重写路径
					'^/apiVaccineData': '' //代理路径
				}
			},
			
		}
	},
})
