<template>
    <FormularioTarefa @aoSalvarTarefa="salvaTarefa" />

    <div class="lista">
        <div class="field">
            <p class="control has-icons-left">
                <input type="text" class="input" placeholder="Filtrar tarefa..." v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>

        <TarefaVue v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa" @aoClicarTarefa="selecionaTarefa" />
        <!-- v-for: primeiro o item, depois o índice -->

        <BoxTarefa v-if="listaEstaVazia">
            Você ainda não realizou nenhuma tarefa!
        </BoxTarefa>

        <ModalEdicao :mostra="tarefaSelecionada != null" v-if="tarefaSelecionada">
            <template v-slot:header>
                <p class="modal-card-title" id="modalHeader">Edição de tarefa</p>
                <button class="delete" aria-label="close" @click="fechaModal"></button>
            </template>

            <template v-slot:tbody>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">Descrição</label>
                    <input type="text" class="input" id="descricaoDaTarefa" v-model="tarefaSelecionada.descricao">
                </div>
            </template>

            <template v-slot:footer>
                <button class="button is-success" @click="atualizaTarefa">Salvar alterações</button>
                <button class="button" @click="fechaModal">Cancelar</button>
            </template>
        </ModalEdicao>
    </div>
</template>
  
<script lang="ts">
import { useStore } from '@/store';
import { ATUALIZA_TAREFA, BUSCA_PROJETOS, BUSCA_TAREFAS, CRIA_TAREFA } from '@/store/tipo-actions';
import { computed } from '@vue/reactivity';
import { defineComponent, ref, watchEffect } from 'vue';
import BoxTarefa from '../components/BoxTarefa.vue';
import FormularioTarefa from '../components/FormularioTarefa.vue'
import ModalEdicao from '@/components/ModalEdicao.vue';
import TarefaVue from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import { notificaMixin } from '@/mixins/notifica';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'App',
    components: {
        FormularioTarefa,
        TarefaVue,
        BoxTarefa,
        ModalEdicao
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

        const filtro = ref('');
        // Filtrando em memória:
        // const tarefas = computed(() => store.state.tarefa.tarefas.filter(
        //     (t) => !filtro.value || t.descricao.includes(filtro.value))
        // );

        // Filtrando com a API:
        watchEffect(() => {
            store.dispatch(BUSCA_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro
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
    color: #4a4a4a;
}

#modalHeader {
    margin-bottom: 0;
}
</style>
  