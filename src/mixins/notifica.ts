import { TipoNotificacao } from "@/interfaces/INotificacao"
import { NOTIFICA } from "@/store/tipo-mutacoes"
import { store } from "@/store"

export const notificaMixin = {
    methods: {
        notifica(tipo: TipoNotificacao, titulo: string, texto: string): void {
                store.commit(NOTIFICA, {
                tipo,
                titulo,
                texto
            })
        }
    }
}