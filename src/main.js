import "babel-polyfill"; // 解决Ie9
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./element";
import * as filters from "./filtres/index"; // 全局过滤器
import "./role"; // 权限
import './assets/icon/iconfont.css'

import LangENUS from './common/lang/en-us'
import LangZHCN from './common/lang/zh-cn'

// import "./mock"; // 模拟数据

import "./assets/icon/iconfont";
import IconSvg from "./components/common/IconSvg.vue"; // svg组件
import MenuUtils from '@/utils/MenuUtils';

// import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import VCharts from 'v-charts'
Vue.use(VCharts)

import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 通过插件的形式挂载

// const i18n = new VueI18n({
//     locale: 'zh-CN',    // 语言标识
//     // this.$i18n.locale, // 通过切换locale的值来实现语言切换
//     messages: {
//         'zh-CN': require('./common/lang/zh'),   // 中文语言包
//         'en-US': require('./common/lang/en'),    // 英文语言包
//         'lang': require('./common/lang/local')    // 英文语言包
//     }
// })
const i18n = new VueI18n({
    locale: 'zh-cn',
    messages: {
        'en-us': LangENUS,
        'zh-cn': LangZHCN
    }
})





// 注册全局组件（register global）
Vue.component("icon-svg", IconSvg);

// 注册全局实用程序过滤器（register global utility filters）.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;



let data = JSON.parse(window.sessionStorage.getItem('user'))
if (data){
    //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
    let routes = []
    MenuUtils(routes,data)
    router.addRoutes(routes)
    window.sessionStorage.removeItem('isLoadNodes')
}
router.beforeEach((route, redirect, next) => {
    let data = JSON.parse(window.sessionStorage.getItem('user'))
    if(data&&route.path === '/login'){
        //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
        //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
        //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
        window.sessionStorage.removeItem('user')
        window.sessionStorage.removeItem('isLoadNodes')
        window.location.href = '/'
        return false
    }
    if (!data && route.path !== '/login') {
        next({ path: '/login' })
    } else {
        if (route.path) {
            next()
        } else {
            next({ path: '/nofound' })
        }
    }
})

new Vue({
    router,
    i18n,  // 不要忘记
    store,
    render: h => h(App)
}).$mount("#app");
