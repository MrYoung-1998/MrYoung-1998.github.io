<template>
    <div id="resultGraph" class="resultGraph"></div>
</template>

<script>
    import ECharts from "echarts"

    export default {
        name: "ResultGraph.vue",
        data(){
            return{

            }
        },
        created() {
            window.eventHub.drawResultGraph = new Event('drawResult');
            window.addEventListener('drawResult',()=>{
                this.drawResult();
            })
        }
        ,
        methods:{
            drawResult(){
                //获取eCharts所绑定的对象
                let el = document.getElementById('resultGraph');
                let myCharts = ECharts.init(el);
                //获取node数据
                let data = [];
                this.$store.state.resultVertexArg.forEach((item)=>{
                    data.push(item)
                });
                //获取link数据
                let links = [];
                this.$store.state.resultEdgeArg.forEach((item)=>{
                    links.push(item);
                });
                myCharts.setOption({
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
                });
            }
        }
    }
</script>

<style scoped>
.resultGraph{
    width: 400px;
    height: 400px;
}
</style>