<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="alteraTema" />
    </div>
    <div class="column is-three-quarter content">
      <FormularioTarefa @aoSalvarTarefa="salvaTarefa" />

      <div class="lista">
        <TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <!-- v-for: primeiro o item, depois o índice -->

        <BoxTarefa v-if="listaEstaVazia">
          Você ainda não realizou nenhuma tarefa!
        </BoxTarefa>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import BoxTarefa from './components/BoxTarefa.vue';
import FormularioTarefa from './components/FormularioTarefa.vue'
import TarefaVue from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioTarefa,
    TarefaVue,
    BoxTarefa
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
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
    },

    alteraTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
main {
  --primary-bg: #fff;
  --primary-text: #000;
}

main.dark-mode {
  --primary-bg: #2b2d42;
  --primary-text: #ddd;
}

.content {
  background-color: var(--primary-bg);
}

.lista {
  padding: 1.25rem;
}
</style>
