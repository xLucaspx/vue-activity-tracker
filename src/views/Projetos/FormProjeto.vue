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
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { notificaMixin } from '@/mixins/notifica'

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
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            } else {
                // Adição
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.notifica(TipoNotificacao.SUCESSO, 'Sucesso!', 'Seu projeto foi salvo!')
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        }
    },
    mixins: [notificaMixin],
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>