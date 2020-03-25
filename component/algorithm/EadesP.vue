<template>
    <div>
        <my-display :flag="statusFlag" @load-terminate="setFlag" class="animated bounceInUp" id="myDisplay"></my-display>
    </div>
</template>

<script>
    export default {
        name: "EadesP.vue",
        data(){
            return{
                //当数据到达时可以改变statusFlag标志从而结束loading状态
                statusFlag:false,
            }
        },
        methods:{
            setFlag(){
                this.statusFlag=true;
            }
        },
    }
</script>

<style scoped>
    #myDisplay{
        animation-duration: 2s;
        animation-delay: 0.8s;
    }
</style>