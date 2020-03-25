import  Vue from 'vue'

import  vueRouter from 'vue-router'
Vue.use(vueRouter);//Vue使用vueRouter
import router from './js/router/indexRouter'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*import Vuex from "vuex"
Vue.use(Vuex);*/
import store from "./js/vuexStore/store.js";

import './css/global.css'
import  './css/FD.css'
import  '../lib/mui/css/mui.css'
import '../lib/mui/js/mui.js'
import '../lib/animate/css/animate.css'

import displayComponent from "../component/Index/display.vue";
import {title,displayBox} from "../component/toolComponent/myComponent";
import ResultGraph from "../component/toolComponent/ResultGraph.vue";

Vue.component('my-title',title);
Vue.component('my-display',displayBox);
Vue.component('my-result',ResultGraph);

window.eventHub = new Object();//用于挂载所有的监听事件
Vue.config.productionTip = false;

let vm_select = new Vue({
    el:'#display',
    render:c=>c(displayComponent),
    store,
    router
});
