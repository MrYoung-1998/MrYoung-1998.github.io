
import introductionComponent from "../../../component/Index/introductionComponent.vue";
import algorithmComponent from "../../../component/Index/algorithmComponent.vue";
import processComponent from "../../../component/Index/processComponent.vue";
import Router from 'vue-router';

let router = new Router({
    routes:[
        {path: '/',redirect:'/introduction'},
        {path:'/introduction',component:introductionComponent},
        {path: '/algorithm',component: algorithmComponent},
        {path: '/process',component:processComponent},
    ]
})

export default router;