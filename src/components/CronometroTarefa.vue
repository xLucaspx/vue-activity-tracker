<template>
    <section>
        <strong class="display">
            <i class="far fa-clock"></i>
            {{ tempoDecorrido }}
        </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroTarefa',
    props: {
        tempoEmSegundos: {
            type: Number,
            default: 0
        }
    },
    computed: {
        tempoDecorrido(): string {
            // formato '00:00:00'
            return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 19)
        }
    },
})
</script>

<style scoped>
.display {
    color: var(--primary-text);
}
</style>
