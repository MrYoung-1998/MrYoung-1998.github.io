import  Vue from 'vue'

import  vueRouter from 'vue-router'
Vue.use(vueRouter);//Vue使用vueRouter
import router from './js/router/indexRouter'


import './css/global.css'
import  './css/FD.css'
import  '../lib/mui/css/mui.css'


import displayComponent from "../component/Index/display.vue";


let vm_select = new Vue({
    el:'#display',
    render:c=>c(displayComponent),
    router
});