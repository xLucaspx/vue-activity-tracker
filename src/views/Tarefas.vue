<template>
    <FormularioTarefa @aoSalvarTarefa="salvaTarefa" />

    <div class="lista">
        <TarefaVue v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa" />
        <!-- v-for: primeiro o item, depois o índice -->

        <BoxTarefa v-if="listaEstaVazia">
            Você ainda não realizou nenhuma tarefa!
        </BoxTarefa>
    </div>
</template>
  
<script lang="ts">
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import BoxTarefa from '../components/BoxTarefa.vue';
import FormularioTarefa from '../components/FormularioTarefa.vue'
import TarefaVue from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
    name: 'App',
    components: {
        FormularioTarefa,
        TarefaVue,
        BoxTarefa
    },
    setup() {
        const store = useStore()
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvaTarefa(tarefa: ITarefa) {
            this.store.commit(ADICIONA_TAREFA, tarefa)
        }
    }
});
</script>
  
<style>
.lista {
    padding: 1.25rem;
}

.lista .display {
    color: black;
}
</style>
  