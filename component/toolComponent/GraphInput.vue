<template>
    <div>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="插入节点" name="1">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>点的名称</label>
                        <input type="text" placeholder="点的名称" v-model="insertName">
                    </div>
                    <div class="mui-input-row">
                        <label>点的x坐标</label>
                        <input type="text" placeholder="请输入x坐标" v-model="x">
                    </div>
                    <div class="mui-input-row">
                        <label>点的y坐标</label>
                        <input type="text" placeholder="请输入y坐标" v-model="y">
                    </div>
                    <div class="mui-button-row">
                        <button class="mui-btn mui-btn-primary" type="button" @click="insertNode">确认</button>&nbsp;&nbsp;
                        <button class="mui-btn mui-btn-primary" type="button" @click="clearText">取消</button>
                    </div>
                </form>
            </el-collapse-item>
            <el-collapse-item title="插入边" name="2">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>起始点</label>
                        <input type="text" placeholder="请输入起始点名称" v-model="start">
                    </div>
                    <div class="mui-input-row">
                        <label>终止点</label>
                        <input type="text" placeholder="请输入终止点名称" v-model="end">
                    </div>
                    <div class="mui-button-row">
                        <button class="mui-btn mui-btn-primary" type="button" @click="insertEdge">确认</button>&nbsp;&nbsp;
                        <button class="mui-btn mui-btn-primary" type="button" @click="clearText">取消</button>
                    </div>
                </form>
            </el-collapse-item>
            <el-collapse-item title="使用本地文件" name="3">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <input type="file">
                    </div>
                    <div class="mui-input-row mui-plus-visible">
                        <label>Input</label>
                        <input type="text" class="mui-input-speech mui-input-clear" placeholder="语音输入" data-input-clear="4" data-input-speech="4"><span class="mui-icon mui-icon-clear mui-hidden"></span><span class="mui-icon mui-icon-speech"></span>
                    </div>
                    <div class="mui-button-row">
                        <button class="mui-btn mui-btn-primary" type="button" onclick="return false;">确认</button>&nbsp;&nbsp;
                        <button class="mui-btn mui-btn-primary" type="button" onclick="return false;">取消</button>
                    </div>
                </form>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "GraphInput.vue",
        props:['draw'],
        data(){
            return{
                insertName:'',
                x:0,
                y:0,
                start:'',
                end:'',
                activeName: '1'
            }
        },
        methods:{
            insertNode(){
                let newNode={
                    name:this.insertName,
                    x:this.x,
                    y:this.y,
                    value:10,
                };
                this.$store.commit('insertVertex',newNode);
                let drawEvent = window.eventHub.draw;
                window.dispatchEvent(drawEvent);
                this.clearText();
            },
            insertEdge(){
                let newEdge={
                    source:this.start,
                    target:this.end
                };
                this.$store.commit('insertEdge',newEdge);
                let drawEvent = window.eventHub.draw;
                window.dispatchEvent(drawEvent);
                this.clearText();
            },
            clearText(){
                this.insertName='';
                this.x ='';
                this.y='';
                this.start='';
                this.end='';
            }
        }
    }
</script>

<style scoped>

</style>