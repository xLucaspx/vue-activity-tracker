<template>
    <section>
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </RouterLink>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <RouterLink :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluiProjeto(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { BUSCA_PROJETOS, DELETA_PROJETO } from '@/store/tipo-actions';

export default defineComponent({
    name: 'ListaProjetos',
    methods: {
        excluiProjeto (id: string) {
            this.store.dispatch(DELETA_PROJETO, id)
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(BUSCA_PROJETOS)
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})
</script>
