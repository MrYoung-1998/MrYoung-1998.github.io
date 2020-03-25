<template>
    <div>
        <el-dropdown split-button type="primary">
            {{option}}
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-on:click.native="option='随机树图'">随机树图</el-dropdown-item>
                <el-dropdown-item v-on:click.native="option='随机无向图'">随机无向图</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <component :is="loadComponent(option)"></component>
    </div>
</template>

<script>
    import randomTreeGraph from "./randomTreeGraph.vue";
    import randomNonDirectGraph from "./randomNonDirectGraph.vue";


    export default {
        name: "randomGraph.vue",
        data(){
            return{
                option:'随机图'
            }
        },
        methods:{
            loadComponent(str){
                if(str == '随机树图')
                    return 'randomTreeGraph';
                else if(str == '随机无向图')
                    return  'randomNonDirectGraph';
                else
                    return ''
            },
            randomHandle(str){
                if(str == '随机树图')
                {

                }
                else if(str == '随机无向图')
                    return  'randomNonDirectGraph';
                else
                    return ''
            }
        },
        components:{
            randomTreeGraph,
            randomNonDirectGraph,
        }
    }
</script>

<style scoped>

</style>