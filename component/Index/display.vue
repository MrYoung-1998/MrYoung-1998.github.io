<template>
    <div class="fd-display">
        <div class="fd-select-controller">
            <router-link class="active" :to="contentList[left].to"
                @click.native="back()"
            ><span class="mui-icon mui-icon-back"></span></router-link>
            <span class="fd-content-title">{{this.contentList[this.currentId].name}}</span>
            <router-link class="active" :to="contentList[right].to"
                @click.native="forward()"
            ><span class="mui-icon mui-icon-forward"></span></router-link>
        </div>
        <router-view class="fd-content"></router-view>
    </div>
</template>

<script>
    export default {
        name: "display.vue",
        data(){
            return{
                //准备数据,数据包括路由组件的名称name，路由的组件的id,以及路由地址
                contentList:[
                    {id:0,name:'项目简介',to:'introduction'},
                    {id:1,name: '力布局算法',to:'algorithm'},
                    {id:2,name: '毕设进度',to:'process'}
                ],
                num:0,
                left:0,
                currentId:0,
                right:0,
            }
        },
        created() {
            this.init();
        },
        methods:{
            init(){
                this.num = this.contentList.length;
                this.currentId = 0;
                this.left = this.num-1;
                this.right = this.currentId+1;
            },
            forward(){
                let temp;
                temp = this.currentId;
                this.currentId = this.right;
                this.left = temp;
                this.right = (this.right+1)%this.num;
            },
           back(){
                let temp =this.currentId;
                this.currentId = this.left;
                this.right =temp;
                if (this.left==0)
                    this.left = this.num-1;
                else
                    this.left--;
           }
        },

    }
</script>

<style scoped>

    .fd-display{
        background: white;
        padding-top: 100px;
        display: block;
    }
    .mui-icon-forward ,.mui-icon-back{
        font-size: 80px;
        color: #777777;
    }
    .fd-content-title{
        font-size: 50px;
        font-family: 微軟正黑體;
    }
    .fd-select-controller{
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        left: 50%;
        transform: translate(-50%,0);
    }
    .fd-content{
        margin-top: 50px;
    }
</style>