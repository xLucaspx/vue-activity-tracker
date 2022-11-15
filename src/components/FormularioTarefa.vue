<template>
    <div class="box form">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>

            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="column">
                <TemporizadorTarefa @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';
import { computed } from '@vue/reactivity';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificaMixin } from '@/mixins/notifica';

export default defineComponent({
    name: 'FormularioTarefa',
    emits: ['aoSalvarTarefa'],
    components: {
        TemporizadorTarefa
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find((p) => p.id == this.idProjeto)
            // Se o projeto não existe:
            if (!projeto) {
                this.notifica(TipoNotificacao.FALHA, 'Erro!', 'É necessário selecionar um projeto antes de finalizar a tarefa!');
                return; // early return
            }

            // Se o projeto existe:
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: projeto
            });

            this.descricao = "";
        }
    },
    mixins: [notificaMixin], // usando mixins
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})
</script>

<style>
.form {
    background-color: var(--primary-bg);
    color: var(--primary-text);
}
</style>