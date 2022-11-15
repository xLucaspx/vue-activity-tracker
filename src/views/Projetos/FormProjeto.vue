<template>
    <section>
        <form @submit.prevent="salvaProjeto">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" id="nomeDoProjeto" v-model="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CRIA_PROJETO, ATUALIZA_PROJETO } from '@/store/tipo-actions';

export default defineComponent({
    name: 'FormProjeto',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeDoProjeto: ""
        }
    },
    methods: {
        salvaProjeto() {
            if (this.id) {
                // Edição
                this.store.dispatch(ATUALIZA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => this.lidaComSucesso())
            } else {
                // Adição
                this.store.dispatch(CRIA_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidaComSucesso())
            }
        },

        lidaComSucesso() {
            this.notificar(TipoNotificacao.SUCESSO, 'Sucesso!', 'Seu projeto foi salvo!') // notifica
            this.nomeDoProjeto = ''; // limpa o input
            this.$router.push('/projetos'); // volta para a lista de projetos
        }
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar // Usando hooks personalizados
        }
    }
})
</script>