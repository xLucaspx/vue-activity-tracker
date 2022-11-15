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
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CRIA_PROJETO, ATUALIZA_PROJETO } from '@/store/tipo-actions';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormProjeto',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const store = useStore()
        const { notifica } = useNotificador() // hook
        const nomeDoProjeto = ref("")
        const router = useRouter() // Atenção: useRouter != useRoute

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const salvaProjeto = () => {
            if (props.id) {
                // Edição
                store.dispatch(ATUALIZA_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidaComSucesso())
            } else {
                // Adição
                store.dispatch(CRIA_PROJETO, nomeDoProjeto.value)
                    .then(() => lidaComSucesso())
            }
        }

        const lidaComSucesso = () => {
            notifica(TipoNotificacao.SUCESSO, 'Sucesso!', 'Seu projeto foi salvo!') // notifica
            nomeDoProjeto.value = ''; // limpa o input
            router.push('/projetos'); // volta para a lista de projetos
        }

        return {
            nomeDoProjeto,
            salvaProjeto
        }
    }
})
</script>