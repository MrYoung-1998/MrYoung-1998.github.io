import loginComponent from "../../../component/Login/loginComponent.vue";
import registerComponent from "../../../component/Login/registerComponent.vue";


import VueRouter from "vue-router"//！！不要忘记导入包

let router = new VueRouter({
    routes:[
        {path: '/',redirect:'/login'},
        {path: '/login',component:loginComponent},
        {path: '/register',component:registerComponent},
    ]
});

export default router;//暴露一个路由对象