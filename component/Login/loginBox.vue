<template>
    <div class="loginBox">
        <div class="loginIcon">FDM</div>
        <div class="login-option">
            <router-link to="/login" class="btn-login" @click.native="markItems(true)" :style="{color:loginStyle}">登录</router-link>
            <!--router-link的点击事件被触发，要设置native属性-->
            <span>/</span>
            <router-link to="/register" class="btn-register" @click.native="markItems(false)" :style="{color: registerStyle}">注册</router-link>
        </div>
        <router-view class="login-component"></router-view>
    </div>
</template>

<script>
export default {
    name:'LoginBox',
    data:function () {
        return{
            selectedStyle:'#ffffff',
            defaultStyle:'#b6b6b6',
            loginStyle:'',
            registerStyle:'',

       }
    },
    methods:{
        markItems(flag){
            if(flag){//当flag为true时，代表选中login组件，反之为register为false.
                this.loginStyle = this.selectedStyle;
                this.registerStyle = this.defaultStyle;
            }else{
                this.registerStyle = this.selectedStyle;
                this.loginStyle = this.defaultStyle;
            }
        }
    },
    mounted() {//在组件挂载的时候,默认选中login组件
        this.markItems(1);
    }
}
</script>

<style scoped>
    .loginBox{
        position: absolute;
        box-sizing: border-box;
        width: 800px;
        height: 400px;
        background: rgba(57, 57, 57, 0.4);
        color: white;
        border-radius: 50px;
        left: 50%;
        top:60%;
        transform: translate(-50%,-50%);
    }

    .login-option{
        position: absolute;
        right: 120px;
        top: 40px;
        display: flex;
        align-items: center;

    }
    .btn-login,.btl-register{
        color: white;
        font-size: 30px;
    }
    .login-component{
        margin-top: 110px;
        padding: 20px;
        width: 90%;
        height: 270px;
        background: rgba(42, 42, 42, 0.4);
        border-radius: 20px;
        display: block;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
    }
    .login-option span{
        font-size: 50px;
    }
    .loginIcon{
        width: 200px;
        height: 200px;
        background: #267871;
        position: absolute;
        box-sizing: border-box;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 50%;
        border: white 8px solid;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 55px;
    }

</style>