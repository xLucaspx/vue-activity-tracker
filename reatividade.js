const projeto = {
    id: 42,
    descricao: 'Reatividade é top'
}

const proxy = new Proxy(projeto, {
    get(objOriginal, key) {
        console.log(`Algúem pediu a chave ${key} do projeto`);
        return objOriginal[key]
    },

    set(objOriginal, key, value) {
        console.log(`Alguém alterou a chave ${key} para o valor "${value}"`)
        objOriginal[key] = value
    }
})


console.log(proxy.id)

proxy.descricao = 'Resposta'

console.log(proxy.descricao)