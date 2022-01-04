import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

import axios from 'axios';
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: 'http://tu71ajix.xiaomy.net:29998',
    baseURL: 'http://192.168.1.106:8080',
    // 超时
    timeout: 600000,
    headers: { 'X-Custom-Header': 'foobar', 'Accept': '*/*' }
})
Vue.prototype.$axios = service

Vue.use(ElementUI);
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')