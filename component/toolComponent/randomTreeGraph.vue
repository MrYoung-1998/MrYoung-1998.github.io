<template>
    <div >
        <div style="display: flex; align-items: baseline">
            <label>点的个数</label>
            <el-input
                    placeholder="请输入点的数目"
                    v-model="pointNum"
                    clearable>
            </el-input>
            &nbsp;
            <label>结点最大孩子数目</label>
            <el-input
                    placeholder="请输入内容"
                    v-model="maxChildren"
                    clearable>
            </el-input>
        </div>

        <div style="display: flex; align-items: baseline">
            <label>x取值范围</label>
            <el-input
                    placeholder="请输入内容"
                    v-model="xMin"
                    clearable>
            </el-input>
            <span>to</span>
            <el-input
                    placeholder="请输入内容"
                    v-model="xMax"
                    clearable>
            </el-input>
            &nbsp;
            <label>y取值范围</label>
            <el-input
                    placeholder="请输入内容"
                    v-model="yMin"
                    clearable>
            </el-input>
            <span>to</span>
            <el-input
                    placeholder="请输入内容"
                    v-model="yMax"
                    clearable>
            </el-input>
        </div>

        <el-button type="primary" @click.native="createRandomTree">生成随机树图</el-button>

        <el-table
                :data="this.$store.state.vertexArg"
                stripe
                style="width: 100%"
                height="250"
        >
            <el-table-column
                    prop="name"
                    label="Point"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="x"
                    label="x坐标"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="y"
                    label="y坐标"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="value"
                    label="value"
                    width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import randomTree from "../../src/js/utils/randomTree";

    export default {
        name: "randomTreeGraph.vue",
        data(){
            return{
                pointNum:0,
                xMin:0,
                xMax:0,
                yMin:0,
                yMax:0,
                maxChildren:0,
            }
        },
        methods:{
            createRandomTree(){
                this.$store.state.vertexArg = [];
                this.$store.state.edgeArg =[];
                let tree = randomTree(this.pointNum,this.xMin,this.xMax,this.yMin,this.yMax,this.maxChildren);
                let vertex = tree.Vertexes;
                let edge = tree.Edges;
                console.log(vertex,edge);
                vertex.forEach((item)=>{
                    this.$store.commit('insertVertex',item);
                });
                edge.forEach((item)=>{
                    this.$store.commit('insertEdge',item);
                });
                window.dispatchEvent(window.eventHub.draw);
            }
        },
    }
</script>

<style scoped>
 label{
     width: 400px;
 }
</style>