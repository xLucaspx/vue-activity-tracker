import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICA } from "@/store/tipo-mutacoes"

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

export default () : Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
        store.commit(NOTIFICA, {
            tipo,
            titulo,
            texto
        })
    }

    return {
        notificar
    }
}