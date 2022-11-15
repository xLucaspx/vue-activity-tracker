import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { CRIA_TAREFA, BUSCA_TAREFAS, ATUALIZA_TAREFA } from "@/store/tipo-actions";
import { ADICIONA_TAREFA, DEFINE_TAREFAS, ALTERA_TAREFA, EXCLUI_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoDaTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },

        [DEFINE_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },

        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },

        [EXCLUI_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(t => t.id != id)
        },
    },
    actions: {
        [CRIA_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data))
        },

        [BUSCA_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas';

            if (filtro) {
                url += '?descricao=' + filtro
            }

            http.get(url)
                .then(response => commit(DEFINE_TAREFAS, response.data))
        },

        [ATUALIZA_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        }
    }
}