<template>
    <section class="projetos">
        <h1 class="title">projetos</h1>

        <form @submit.prevent="salvaProjeto">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" id="nomeDoProjeto" v-model="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'ProjetosView',
    data() {
        return {
            nomeDoProjeto: ""
        }
    },
    methods: {
        salvaProjeto() {
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = '';
        }
    },
    setup () {
        const store = useStore()
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>