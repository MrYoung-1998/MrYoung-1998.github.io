<template>
    <div class="login">
        <table>
            <thead>用户登录</thead>
            <tbody>
                <tr>
                    <td><span class="mui-icon mui-icon-person-filled"></span></td>
                    <td><label>用户</label></td>
                    <td><input type="text" placeholder="请输入用户名" v-model="username" @focus="alertFlag=false"></td>
                </tr>

                <tr>
                    <td><a class="active"><span class="mui-icon mui-icon-locked"></span></a></td>
                    <td><label>密码</label></td>
                    <td><input type="password" placeholder="请输入密码" v-model="password" @focus="alertFlag=false"></td>
                </tr>
            </tbody>
            <tfoot style="display: block">
                <p v-if="!alertFlag">&nbsp</p>
                <p class="login-alert" v-if="alertFlag">{{alertInfo}}</p>
            </tfoot>
        </table>
        <button  type="button" ref="postInfo" class="mui-btn mui-btn-primary" data-loading-text = "提交中" data-loading-icon-position="right" @click="onPost">确认</button>
    </div>
</template>

<script>

export default {
    data:function () {
        return{
            username:'',
            password:'',
            alertFlag:false,//用于判断登陆的内容是否正确
            alertInfo:'',//用于输出缺失信息
        }
    },
    methods:{
        onPost(){
            //检查表单
            if(this.username=="" && this.password==''){
                this.alertFlag=true;
                this.alertInfo ='请输入用户名和密码';
                return;
            }else if(this.username==""){
                this.alertFlag=true;
                this.alertInfo ='请输入用户名';
                return;
            }else if(this.password==''){
                this.alertFlag=true;
                this.alertInfo ='请输入密码';
                return;
            }
            window.mui(this.$refs.postInfo).button('loading');

            //从本地Cookie中获取FdmToken
            //读取Cookie字符串
            const cookieObj = this.$cookieParse.parse(document.cookie);
            console.log(cookieObj);
            const FdmToken = cookieObj['FdmToken'];
            this.$axios.get('http://127.0.0.1:80/login',{
                method:'get',
                params:{//将参数挂载到params属性中
                    username: this.username,
                    password: this.password,
                },
                headers:{
                    FdmToken: FdmToken,
                }
            }).then((result)=>{
                //停止按钮的loading效果
                window.mui(this.$refs.postInfo).button('reset');
                console.log(result.data['FdmToken']);
                if(result.data['FdmToken']==undefined)
                {
                    this.alertFlag=true;
                    this.alertInfo='用户不存在';
                }else {
                    //将获取到的令牌写入到Cookie中去
                    document.cookie = 'FdmToken='+result.data['FdmToken'];
                    this.$router.push('../../src/index.html');
                }
            });
        },
    }
}
</script>

<style scoped>
    table{
        line-height: 20px;
        display: block;
    }
    thead,tfoot{
        display: flex;
        justify-content: center;
        text-align: center;
    }
    tbody{
        margin-top: 30px;
        position: relative;
        display: block;
        width: 100%;
    }
    .mui-icon-person-filled,.mui-icon-locked{
        width: 30px;
    }
    .mui-btn-primary{
        width: 200px;
        position: relative;
        left:50%;
        transform: translate(-50%,0);
    }
    tr{
        display: flex;
        align-items: baseline;
        justify-content: center;
    }
    [type='text'],[type='password']{
        color: #777777;
        width: 260px;
        margin-left: 10px;
    }
    .login-alert{
        color: #ff5053;
        font-size: 5px;
    }
</style>