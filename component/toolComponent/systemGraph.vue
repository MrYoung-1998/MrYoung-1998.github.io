<template>
    <div>
        <p>这是系统组件</p>
        <component :is="'GraphInput'"></component>
    </div>
</template>

<script>
    import GraphInput from "./GraphInput.vue";
    export default {
        name: "systemGraph.vue",
        components:{
            GraphInput
        }
    }
</script>

<style scoped>

</style>