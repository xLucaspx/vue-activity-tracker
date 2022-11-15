<template>
    <FormularioTarefa @aoSalvarTarefa="salvaTarefa" />

    <div class="lista">
        <TarefaVue v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa" @aoClicarTarefa="selecionaTarefa" />
        <!-- v-for: primeiro o item, depois o índice -->

        <BoxTarefa v-if="listaEstaVazia">
            Você ainda não realizou nenhuma tarefa!
        </BoxTarefa>

        <!-- v-if para pegar a descrição somente se uma tarefa for selecionada (v-model abaixo) -->
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Janela de edição de tarefa</p>
                    <button class="delete" aria-label="close" @click="fechaModal"></button>
                </header>

                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">Descrição</label>
                        <input type="text" class="input" id="descricaoDaTarefa" v-model="tarefaSelecionada.descricao">
                    </div>
                </section>

                <footer class="modal-card-foot">
                    <button class="button is-success" @click="atualizaTarefa">Salvar alterações</button>
                    <button class="button" @click="fechaModal">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { useStore } from '@/store';
import { ATUALIZA_TAREFA, BUSCA_PROJETOS, BUSCA_TAREFAS, CRIA_TAREFA } from '@/store/tipo-actions';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import BoxTarefa from '../components/BoxTarefa.vue';
import FormularioTarefa from '../components/FormularioTarefa.vue'
import TarefaVue from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import { notificaMixin } from '@/mixins/notifica';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'App',
    components: {
        FormularioTarefa,
        TarefaVue,
        BoxTarefa
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(BUSCA_TAREFAS)
        store.dispatch(BUSCA_PROJETOS)
        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvaTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CRIA_TAREFA, tarefa)
        },

        selecionaTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },

        atualizaTarefa() {
            this.store.dispatch(ATUALIZA_TAREFA, this.tarefaSelecionada)
                .then(() => {
                    this.fechaModal();
                    this.notifica(TipoNotificacao.SUCESSO, 'Edição concluída!', 'Tarefa alterada com sucesso!')
                })
        },

        fechaModal() {
            this.tarefaSelecionada = null
        }
    },
    mixins: [notificaMixin]
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
  