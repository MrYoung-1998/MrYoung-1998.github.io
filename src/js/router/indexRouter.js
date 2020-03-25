
import introductionComponent from "../../../component/Index/introductionComponent.vue";
import algorithmComponent from "../../../component/Index/algorithmComponent.vue";
import processComponent from "../../../component/Index/processComponent.vue";

import {AR,ConstrainModel,DoublePress,EadesP,FR,KK,MultiLayer,MDS,Maxent,NoneEuropeanSpace} from '../../../component/algorithm/algorithm.js'

import Router from 'vue-router';

let router = new Router({
    routes:[
        {path:'/introduction',component:introductionComponent},
        {path:'/algorithm',redirect:'/algorithm/EadesP'},
        {path: '/algorithm',component: algorithmComponent,
            children:[
                {path:'EadesP',component:EadesP},
                {path:'ConstrainModel',component:ConstrainModel},
                {path:'AR',component:AR},
                {path:'DoublePress',component:DoublePress},
                {path:'FR',component:FR},
                {path:'KK',component:KK},
                {path:'MultiLayer',component:MultiLayer},
                {path:'MDS',component:MDS},
                {path:'Maxent',component:Maxent},
                {path:'NoneEuropeanSpace',component:NoneEuropeanSpace},
            ]
        },
        {path: '/process',component:processComponent},
    ]
});

export default router;