<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroTarefa :tempoEmSegundos="tempoEmSegundos" />

        <button class="button" @click="iniciar" :disabled="rodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>Start</span>
        </button>

        <button class="button" @click="finalizar" :disabled="!rodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';

export default defineComponent({
    name: 'TemporizadorTarefa',
    components: {
        CronometroTarefa
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
            clearInterval(this.cronometro)
        }
    }
})
</script>