<template>
    <div class="fd-display" id="fd-display"><!--主体组件，用于切换index.html中所绑定的div-->
        <div class="fd-begin" id="fd-begin"><!--开始按钮：链接到主路由-->
            <h1 class="animated bounceInLeft" id="begin" v-if="beginFlag">
                <span>Let's Begin</span>
                <a class="active">
                    <!--业务1：点击按钮，将主体内容展示出来-->
                    <router-link to="introduction"
                         class="mui-icon mui-icon-arrowdown"
                         @click.native="unfold"
                    ></router-link>
                </a>
            </h1>
        </div>

        <!--内容的主体部分-->
        <div v-if="displayFlag" id="content">
            <div class="fd-content-controller">
                <!--路由链接，向后跳转-->
                <router-link class="active" :to="contentList[left].to"
                             @click.native="back()"
                ><span class="mui-icon mui-icon-back "></span></router-link>

                <!--标题-->
                <transition
                        name="title"
                        enter-active-class="defineEntries"
                >
                    <span class="fd-content-title" v-if="ifFlag">{{this.contentList[this.currentId].name}}</span>
                </transition>

                <!--路由链接，向后跳转-->
                <router-link class="active" :to="contentList[right].to"
                             @click.native="forward()"
                ><span class="mui-icon mui-icon-forward"></span></router-link>
            </div>

            <!--将路由展示到router-view当中-->
            <router-view class="fd-content" id="fd-content"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "display.vue",
        data(){
            return{
                //准备数据,数据包括路由组件的名称name，路由的组件的id,以及路由地址
                contentList:[
                    {id:0,name:'项目简介',to:'/introduction'},
                    {id:1,name: '力布局算法',to:'/algorithm'},
                    {id:2,name: '毕设进度',to:'/process'}
                ],
                num:0,
                left:0,
                currentId:0,
                right:0,
                //切换动画控制标志
                animateFlag:true,//向右是true，向左是false
                ifFlag:true,
                displayFlag:false,
                beginFlag:true,
            }
        },
        created() {
            this.init();//初始化
        },
        methods:{
            test(){
                alert('hello');
            },

            unfold(){
                /*将displayFlag设置为true*/
                this.displayFlag = true;


                /*思考：为什么在修改dom中的值以后，为何没有马上渲染？而卸载nextTick中就可以了呢？
                *       1、
                * */
                /*获取所移动的位置*/
                let el = document.getElementById("begin");
                let y =el.offsetTop+el.clientHeight;
                this.$nextTick(()=>{
                    let timer1 = setInterval(()=>{
                        let currentY =window.scrollY;
                        if(currentY<y){
                            currentY+=2;
                            window.scrollTo(0,currentY);
                        }else{
                            window.scrollY = y;
                            this.beginFlag = false;//关闭let'sbegin
                            clearInterval(timer1);
                        }
                    },1);
                })
            },
            init(){
                this.num = this.contentList.length;
                this.currentId = 0;
                this.left = this.num-1;
                this.right = this.currentId+1;
            },
            forward(){
                this.ifFlag = !this.ifFlag;
                let temp;
                temp = this.currentId;
                this.currentId = this.right;
                this.left = temp;
                this.right = (this.right+1)%this.num;
            },
           back(){
               this.ifFlag = !this.ifFlag;
                let temp =this.currentId;
                this.currentId = this.left;
                this.right =temp;
                if (this.left==0)
                    this.left = this.num-1;
                else
                    this.left--;
           },
        },
        updated(){
            this.ifFlag = true;
        }
    }
</script>

<style scoped>
    .fd-display{
        background: white;
        display: block;
    }
    .fd-begin{
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        background: white;
        padding-top: 40px;
        padding-left: 20px;
    }
    #begin{/*用于控制let‘s begin的动画时长*/
        animation-duration: 3s;
    }
    .mui-icon-forward ,.mui-icon-back{
        font-size: 80px;
        color: #777777;
    }
    .fd-content{
        margin-top: 50px;
    }
    .fd-content-controller{
        position: relative;
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        left: 50%;
        transform: translate(-50%,0);
    }
    .fd-content-title{
        font-size: 50px;
        font-family: 华文细黑;
    }

    #fd-content{
        min-height: 800px;
    }

    /*自定义动画*/
    .defineEntries{
        animation: entry 500ms;
    }
    @keyframes entry {
        from,
        60%,
        75%,
        90%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            -webkit-transform: translate3d(-50px, 0, 0);
            transform: translate3d(-50px, 0, 0);
        }

        60% {
            opacity: 1;
            -webkit-transform: translate3d(25px, 0, 0);
            transform: translate3d(25px, 0, 0);
        }

        75% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }

        90% {
            -webkit-transform: translate3d(5px, 0, 0);
            transform: translate3d(5px, 0, 0);
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

</style>