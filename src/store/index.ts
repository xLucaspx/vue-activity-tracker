import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, EXCLUI_PROJETO, EXCLUI_TAREFA, NOTIFICA } from "./tipo-mutacoes";

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
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
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

        // Notificações:
        [NOTIFICA](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id);
            }, 3000)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}