<script>
	import Common from "./common/common.js"
	// const AgentDetection = uni.requireNativePlugin('Karma617-AgentDetection');
	export default {
		data() {
			return {
				// 后台运行时间
				ht_time: ''
			}
		},
		onLaunch() {
			// 加载字体图标
			Common.fontFamily()
			// 网路监听（用户目前断网，切换wifi）
			this.lib.NetWork.On();
			// 更新
			this.updateLoad()
		},
		onShow() {
			this.isOut()
		},
		onHide() {
			this.isIn()
			console.log('App Hide')
		},
		onError() { 
			// console.log('错误----------------')
			// // 退出app
			// plus.runtime.quit()
		},
		methods: {
			async updateLoad() {
				let res = await uniCloud.callFunction({
					name: 'chb-check-update',
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version
					}
				})
				if (res.result.isUpdate) {
					uni.setStorageSync("updateAPP", res.result)
					uni.navigateTo({
						url: '/pages/update-app/update-app',
						fail: (err) => {
							console.error('更新弹框跳转失败', err)
						}
					})
				} else {
					console.log('最新版本，无需更新')
				}
			},
			isOut() {
				
				// 初始化信息
				let userinfo = uni.getStorageSync("userinfo") || {}
				if (userinfo._id) {
					this.$store.commit('updateUserinfo', userinfo)
				}
				console.log(userinfo)
				// 获取音效
				let isVoice =  uni.getStorageSync('voice') || false
				console.log('---------------------------声音')
				console.log(isVoice)		
				this.$store.state.isVoice = isVoice
				// 自定义后台运行多长时间后重启app
				// let outTime = uni.getStorageSync("isOutTime") || new Date().getTime()
				// console.log(outTime)
				// let inTime = new Date().getTime() - 600000
				// if (inTime>outTime) {
				// 	plus.runtime.restart();
				// 	this.isIn()
				// }
				// #ifdef APP-PLUS
				// 签名证书检验
				// var syInfo = uni.getSystemInfoSync();
				// // console.log(syInfo.platform)
				// var sign = plus.navigator.getSignature();
				// if ('android' == syInfo.platform) { //Android平台
				// 	console.log('安卓')
				// 	var sha1 = '271dfc00602d01618b504282dd9b0796cf1cef20'; //修改为自己应用签名证书SHA-1值，是全小写并且中间不包含“:”符号
				// 	if (sha1 != sign) {
				// 		//证书不对时退出应用
				// 		plus.runtime.quit();
				// 	}
				// } else { //iOS平台
				// 	var md5 = 'a2e629f0ea915b4ed11e296a059c9a12'; //修改为自己应用Apple Bunld ID(AppID)的md5值
				// 	if (md5 != sign) {
				// 		//不进入应用或循环弹出提示框
				// 		console.log('应用被破坏，无法正常运行！');
				// 		uni.showModal({
				// 			title: '错误',
				// 			content: '应用被破坏，无法正常运行！',
				// 		});
				// 	}
				// }
				// 检查是否是网络代理
				let isdl = plus.networkinfo.isSetProxy()
				console.log(isdl)
				if (isdl) {
					uni.showToast({
						icon: "none",
						title: '您的网络环境异常',
						position: "bottom"
					});
					plus.runtime.quit()
					return
				}
				let rot = plus.navigator.isRoot()
				if (rot) {
					uni.showToast({
						icon: "none",
						title: '坏境异常',
						position: "bottom"
					});
					plus.runtime.quit()
					return
				}
				// 禁止在模拟器
				let mnq = plus.navigator.isSimulator()
				console.log(mnq)
				if (mnq) {
					uni.showToast({
						icon: "none",
						title: '禁止在模拟器内运行',
						position: "bottom"
					});
					plus.runtime.quit()
					return
				}

				// 延时下 
				// setTimeout((res) => {
				// 	console.log('-----------------------------------执行判断抓包等')
				// 	// 检查是否使用vpn
				// 	let vpnn = AgentDetection.checkVPN()
				// 	console.log(vpnn)
				// 	if (vpnn) {
				// 		uni.showToast({
				// 			icon: "none",
				// 			title: '您的网络环境异常，请关闭VPN，或者抓包工具等',
				// 			position: "bottom"
				// 		});
				// 		plus.runtime.quit()
				// 		return
				// 	}
				// 	let wf = AgentDetection.checkWifiProxy()
				// 	console.log(wf)
				// 	if (wf) {
				// 		uni.showToast({
				// 			icon: "none",
				// 			title: '您的网络环境异常，请关闭VPN，或者抓包工具等',
				// 			position: "bottom"
				// 		});
				// 		plus.runtime.quit()
				// 		return
				// 	}
				// }, 1000)
				// #endif
			},
			isIn(){
				// let now_time = new Date().getTime()
				// uni.setStorageSync("isOutTime", now_time)
				// console.log('时间缓存成功')
			}
		}
	}
</script>

<style>
	/* #ifdef APP-NVUE */
	@import './common/common.css';
	/* #endif */
</style>
