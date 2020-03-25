<template>
    <div class="title-container" :style="{'borderLeft':this.$props.color+' 10px'+' solid'}">
        <h3>{{this.$props.title}}</h3>
    </div>
</template>

<script>
    export default {
        props:['title','color'],
        name: "my-title"
    }
</script>

<style scoped>
    .title-container{
        box-sizing: border-box;
        padding-left: 5px;
        margin-left: 5px;
    }
</style>