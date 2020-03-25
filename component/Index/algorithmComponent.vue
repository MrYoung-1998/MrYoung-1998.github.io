<template>
    <div class="fd-algorithm-container">

        <!--列表-->
        <div class="mui-card fd-algorithm-list">
            <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell mui-collapse mui-active"><a href="javascript:void(0)" @click="Toggle_fold(foldFlag)">算法列表</a>
                    <ul class="mui-table-view mui-table-view-chevron" v-for="item in algorithmList"  v-if="foldFlag">
                        <li class="mui-table-view-cell animated bounceInUp fd-algorithm-list-animate" :key="item.id" @click="currentId=item.id">
                            <router-link class="mui-navigate-right" :to="'/algorithm/'+item.routerAdress" :style="{'color':'#000000'}">{{item.name}}</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!--介绍区域-->
        <div class="mui-card fd-algorithm-content">
            <!--页眉，放置标题-->
            <div class="mui-card-header">{{algorithmList[currentId-1].name}}</div>

            <div class="mui-card-content container">
                <!--内容区 1、一个panel区域，一个路由区域-->
                <my-title :title="algorithmList[currentId-1].name+' 相关介绍'" :color="'#0056F0'"></my-title>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media">
                        <a href="javascript:;">
                            <img class="mui-media-object mui-pull-left" src="https://static.easyicon.net/preview/116/1167473.gif">
                            <div class="mui-media-body">
                                参考文献
                                <p class='mui-ellipsis'>{{algorithmList[currentId-1].reference}}</p>
                            </div>
                        </a>
                    </li>
                </ul>

                <my-title :title="'算法特点'" :color="'#0056F0'"></my-title>

                <ul class="mui-table" v-for="(val,index) in algorithmList[currentId-1].properties">
                    <li :key="index" class="fd-algorithm-property-list animated fadeInUp" v-if="ifFlag"><strong>{{index+1}}</strong>.  {{val}}</li>
                </ul>
                <hr>
                <!--渲染路由-->
                <router-view></router-view>
            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <div class="mui-card-footer">页脚</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "algorithmComponent.vue",
        data(){
            return{
                /*此处设置data*/
                algorithmList:[
                    {
                        id:1,
                        name:'Eades P',
                        reference:'EADES P. A heuristic for graph drawing[J]. Congressus Numerantium, 1984,42: 149-160.',
                        properties:[
                            "在胡可定律的基础上，将引力模型从线性模型改为对数模型",
                            "非相邻点产生斥力，与其距离的根号成反比",
                            "移动的距离为该点收到的合力乘以一个常数"
                        ],
                        routerAdress:'EadesP',
                    },
                    {
                        id:2,
                        name:'FR模型',
                        reference:'',
                        properties:[
                            "property 1 FR*********",
                            "property 2 test*********",
                            "property 3 test*********",
                        ],
                        routerAdress:'FR',
                    },
                    {
                        id:3,
                        name:'KK算法',
                        reference:'',
                        properties:[
                            "property 1 test*********",
                            "property 2 test*********",
                            "property 3 test*********",
                        ],
                        routerAdress:'KK',
                    },
                    {id:4,name:'AR模型',reference:''},
                    {id:5,name:'Maxent算法',reference:''},
                    {id:6,name:'双压力模型算法',reference:''},
                    {id:7,name:'MDS算法',reference:''},
                    {id:8,name:'多层迭代绘制算法',reference:''},
                    {id:9,name:'非欧空间结点布局算法',reference:''},
                    {id:10,name:'受约束图形自动布局算法',reference:''},
                ],
                foldFlag:true,
                ifFlag:true,
                currentId:1,
            }
        },
        methods:{
            /*此处定义方法*/
            Toggle_fold(){//定义算法显示栏是否重叠
                this.foldFlag = !this.foldFlag;
            },

            /**/
            refreshAnimate(){
                this.ifFlag = false;
            }
        },
        watch:{
            /*监听路由的改变是为了刷新“算法特点”里面的动画效果
            *   思考1：为什么在算法特点模块中animated fadeInUp只能触发一次？
            *       动画效果是在组件被挂载到DOM树时才会执行，因此当需要触发点击重新启动动画就必须结合v-if来使用.
            *       为了验证这一想法，可以将v-if替换成v-show，会发现动画只能执行一次，由此得出只有当组件被插入到
            *       DOM的时候，才会触发更新效果。
            * 解决方法：
            *     因为需求是在路由更新的时候进行动画刷新因此可以分为两步去完成这一个操作
            *       1、在对应的组件的script中，用watch对路由进行监听（this.$route），当路由改变的时候将相应的组件从DOM树中移除
            *       2、在组件的生命周期中的updated，再将新组件插入到DOM树中，即可实现动画的刷新
            * */
          $route : 'refreshAnimate'
        },

        updated() {
            this.ifFlag = true;
        }
    }
</script>

<style scoped>
.fd-algorithm-container{
    display:flex;
    width: 100%;
    justify-content: center;
}
    .fd-algorithm-list{
        width: 300px;
        height: fit-content;
    }
    .fd-algorithm-content{
        width: 900px;
        height: fit-content;
    }

    .fd-algorithm-property-list{
        font-size: 15px;
        line-height: 30px;
        margin-left: 60px;
        list-style: none;
        font-style: italic;
        word-spacing: 0.3em;
        color: #777777;
        line-height: 40px;
    }
    /*动画*/
    .fd-algorithm-list-animate{
        animation-duration: 0.5s;
        cursor: pointer;
    }
</style>