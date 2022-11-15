import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { ATUALIZA_PROJETO, BUSCA_PROJETOS, CRIA_PROJETO, DELETA_PROJETO } from "@/store/tipo-actions";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINE_PROJETOS, EXCLUI_PROJETO } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoDoProjeto {
    projetos: IProjeto[]
}

// <Estado do módulo, Estado global>
export const projeto: Module<EstadoDoProjeto, Estado> = {
    mutations: {
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
    },
    actions: {
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
}