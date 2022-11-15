<template>
    <BoxTarefa>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>

            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'S/P' }}
            </div>

            <div class="column">
                <CronometroTarefa :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxTarefa>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import BoxTarefa from './BoxTarefa.vue';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'TarefaVue',
    emits: ['aoClicarTarefa'],
    components: {
        CronometroTarefa,
        BoxTarefa
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada(): void {
            this.$emit('aoClicarTarefa', this.tarefa)
        }
    }
})
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>