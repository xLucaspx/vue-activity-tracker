<template>
    <section class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroTarefa :tempoEmSegundos="tempoEmSegundos" />

        <BotaoTemporizador @clicked="iniciar" icon="fas fa-play" buttonText="Play" :disabled="rodando" />
        <BotaoTemporizador @clicked="finalizar" icon="fas fa-stop" buttonText="Stop" :disabled="!rodando" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoTemporizador from './BotaoTemporizador.vue';
import CronometroTarefa from './CronometroTarefa.vue';

export default defineComponent({
    name: 'TemporizadorTarefa',
    emits: ['aoTemporizadorFinalizado'],
    components: {
    CronometroTarefa,
    BotaoTemporizador
},
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            rodando: false 
        }
    },
    
    methods: {
        iniciar() {
            // começar a contagem
            this.rodando = true;

            this.cronometro = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000) // 1s = 1000ms
        },
        finalizar() {
            this.rodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    }
})
</script>