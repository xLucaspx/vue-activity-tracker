<template>
    <FormularioTarefa @aoSalvarTarefa="salvaTarefa" />

    <div class="lista">
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <!-- v-for: primeiro o item, depois o índice -->

        <BoxTarefa v-if="listaEstaVazia">
            Você ainda não realizou nenhuma tarefa!
        </BoxTarefa>
    </div>
</template>
  
<script lang="ts">
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
    data() {
        return {
            tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvaTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        }
    }
});
</script>
  
<style>
.lista {
    padding: 1.25rem;
}
</style>
  