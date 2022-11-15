<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxTarefa',
    data() {
        return {
            // inserindo estilos com JavaScript
            estilos: {
                backgroundColor: '#faf0ca'
                // 'background-color: '#faf0ca'
            }
        }
    }
})
</script>

<!-- <style scoped>
.box {
    background-color: #faf0ca;
}
</style> -->