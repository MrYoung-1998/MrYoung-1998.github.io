<template>
    <div>
        <component :is="'GraphInput'" @draw1="this.$emit('draw')"></component>
    </div>
</template>

<script>
    import GraphInput from "./GraphInput.vue";

    export default {
        name: "userGraph.vue",
        components:{
            GraphInput,
        }
    }
</script>

<style scoped>

</style>