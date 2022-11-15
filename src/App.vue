<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="alteraTema" />
    </div>
    <div class="column is-three-quarter content">
      <NotificacoesVue></NotificacoesVue>

      <!-- Visualização de acordo com a URL -->
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesVue from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    NotificacoesVue
  },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
    alteraTema(modoEscuroAtivo: boolean): void {
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
</style>
