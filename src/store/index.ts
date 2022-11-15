import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { useStore as vuexUseStore } from "vuex";
import { NOTIFICA } from "./tipo-mutacoes";
import { EstadoDoProjeto, projeto } from "./modulos/projeto";
import { EstadoDaTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    tarefa: EstadoDaTarefa,
    projeto: EstadoDoProjeto,
    notificacoes: INotificacao[]
}

export const store = createStore<Estado>({
    state: {
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        },
        notificacoes: []
    },
    mutations: {
        // Notificações:
        [NOTIFICA](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id);
            }, 3000)
        }
    },
    modules: {
        tarefa,
        projeto
    }
})

export const key: InjectionKey<Store<Estado>> = Symbol();

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}