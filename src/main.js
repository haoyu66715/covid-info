import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getElementUI from './plugins'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts' // 导入echarts
import './plugins/js/china.js' // 导入china.js
import './plugins/js/world.js' // 导入world.js

import './assets/icon/common.css' // 导入全局字体图标
import ContentSplit from "./components/contentSplit/index.js" // 引入分割线组件

import {Popover} from 'vant'


const app=createApp(App)
app.config.globalProperties.$echarts = echarts
getElementUI(app)
app.use(store)
app.use(ContentSplit)
app.use(Popover)
app.use(router).mount('#app')

// createApp(App).use(store).use(router).mount('#app')
