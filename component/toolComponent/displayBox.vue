<!--组件需求：
    该组件有两个状态，
            状态1：等待数据状态，此时页面会有一个加载环转动
            状态2：数据到达状态，将图片渲染到该组件区域
    设计思路：
        存在一个状态标志，用于判断组件当前所处的状态
        需要一个图的数据，然后借助百度画图插件进行画图
-->


<template>
    <div class="component-displayBox">
        <div class="component-displayBox-console">
            <div :class="{
                        'component-displayBox-canvas':true,
                        'component-displayBox-canvas-black':!this.$props.flag,
                    }">
                <div class="component-displayBox-loading" v-show="!this.$props.flag"></div>
                <div id="graphArea" class="graphArea" v-show="this.$props.flag"></div>
            </div>
            <button class="mui-btn-primary" style="width: 100%" @click="$store.commit('postGraph','/EadesP')">提交此图</button>
            <div style="display: flex;justify-content: space-around;min-height: 120px;align-items: center">
                <div class="choice"
                        v-for="(val,key) in buttonList" :key="key"  @click.prevent="clickHandle(val.tag)"
                >{{val.name}}
                </div>
            </div>
            <component :is="option"></component>
            <my-result v-show="$store.state.resultFlag"></my-result>
        </div>
    </div>
</template>

<script>
    /*导入子模版*/
    import userGraph from "./userGraph.vue";
    import systemGraph from "./systemGraph.vue";
    import randomGraph from "./randomGraph.vue";
    import  Echarts from "echarts";

    export default {
        name: "displayBox.vue",
        props:['flag'],
        created() {
            this.option='user-graph';
            /*创建一个draw事件*/
            window.eventHub.draw = new Event('draw');
            window.addEventListener('draw',()=>{
                this.draw();
            });
        },
        mounted() {
            this.draw();
        },
        data(){
            return{
                option:'',
                buttonList:[
                    {name:'自定义图',tag:'user-graph'},
                    {name:'系统图',tag:'system-graph'},
                    {name:'随机图',tag:'random-graph'},
                ]
            }
        },
        components:{//局部导入组件
            userGraph:userGraph,
            systemGraph:systemGraph,
            randomGraph:randomGraph,
        },
        methods:{
            draw(vertexArg=this.$store.state.vertexArg,edgeArg=this.$store.state.edgeArg){
                let data=[];
                for(let item of vertexArg){
                    data.push(item);
                }
                let links=[];
                if(data.length!=0){
                    this.$emit('load-terminate');
                }
                for(let item of edgeArg){
                    links.push(item);
                }
                let mychart = Echarts.init(document.getElementById('graphArea'));
                let config = {
                    series:[
                        {
                            type:'graph',
                            layout:'none',
                            grid:{
                                top:"50px",
                                left:"50px",
                                right:"10px",
                                bottom:"50px"
                            },
                            dataZoom: [
                                {
                                    id: 'dataZoomX',
                                    type: 'slider',
                                    xAxisIndex: [0],
                                    filterMode: 'filter'
                                },
                                {
                                    id: 'dataZoomY',
                                    type: 'slider',
                                    yAxisIndex: [0],
                                    filterMode: 'empty'
                                }
                            ],
                            label:{
                                normal:{
                                    show:false,
                                    position:'top',
                                    textStyle:{
                                        fontSize:'12rem'
                                    },
                                }
                            },
                            data:data,
                            links:links,
                            lineStyle:{
                                color:'#606060',
                                width:1.5
                            },
                            itemStyle: {
                                color: 'black'
                            }
                        }
                    ]
                };
                mychart.setOption(config);
            },
            clickHandle(str){
                this.option = str;
            }
        },
    }
</script>

<style scoped>
    .component-displayBox-console{
        margin-top: 30px;
    }
    .component-displayBox-canvas-black{
        background: black;
    }
    .component-displayBox-canvas{
        width: 100%;
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px gainsboro solid;
    }
    .component-displayBox-loading{
        width: 100px;
        height: 100px;
        background: linear-gradient(-135deg,#ffff00 20%,transparent 60%);
        border-radius: 50%;
        position: relative;
        animation: component-displayBox-loading 1s linear infinite;
    }
    @keyframes component-displayBox-loading {
        0%{
            transform: rotate(0deg);
            filter: hue-rotate(0deg);
            -webkit-filter: hue-rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
            filter: hue-rotate(360deg);
            -webkit-filter: hue-rotate(360deg);
        }
    }
    .component-displayBox-loading:before{
        position: absolute;
        content: '';
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        border-radius: 50%;
        background: #000000;
    }
    .component-displayBox-loading:after{
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(-135deg, #f7ff32 20%,transparent 60%);
        border-radius: 50%;
        content: '';
        z-index: -1;
        filter: blur(3px);
    }
    .graphArea{
        width:400px;
        height: 400px;
    }
    .mui-btn-primary{
        border-radius: 0px;
        border: none;
    }
    .choice{
        position: relative;
        width: 80px !important;
        height: 80px !important;
        text-align: center;
        background: white;
        color: #555555;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 50%;
    }

    .choice:before{
        position: absolute;
        left: -2px;
        right: -2px;
        bottom: -2px;
        top: -2px;
        border-radius: 50%;
        content: '';
        background: linear-gradient(-135deg, #ff5026 20%,transparent 60%);
        z-index: -1;
        animation: choice 3s linear infinite;
    }
    .choice:hover{
        transition: 100ms !important;
        font-size: 18px;
        font-weight: bold;
    }
    @keyframes choice {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>