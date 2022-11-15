import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { useStore as vuexUseStore } from "vuex";
import { ATUALIZA_PROJETO, ATUALIZA_TAREFA, BUSCA_PROJETOS, BUSCA_TAREFAS, CRIA_PROJETO, CRIA_TAREFA, DELETA_PROJETO } from "./tipo-actions";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINE_PROJETOS, DEFINE_TAREFAS, EXCLUI_PROJETO, EXCLUI_TAREFA, NOTIFICA } from "./tipo-mutacoes";
import http from "@/http"

interface Estado {
    tarefas: ITarefa[],
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        projetos: [],
        notificacoes: []
    },
    mutations: {
        // Tarefas:
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

        // Projetos:
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto;

            state.projetos.push(projeto);
        },

        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },

        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },

        [DEFINE_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },

        // Notificações:
        [NOTIFICA](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id);
            }, 3000)
        }
    },
    actions: {
        [CRIA_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data))
        },

        [BUSCA_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(response => commit(DEFINE_TAREFAS, response.data))
        },

        [ATUALIZA_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },

        // Projetos:
        [CRIA_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },

        [BUSCA_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINE_PROJETOS, resposta.data))
        },

        [ATUALIZA_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },

        [DELETA_PROJETO]({ commit }, idProjeto: string) {
            return http.delete(`/projetos/${idProjeto}`)
                .then(() => commit(EXCLUI_PROJETO, idProjeto))
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}