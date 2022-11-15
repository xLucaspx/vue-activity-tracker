const projeto = {
    id: 42,
    descricao: 'Reatividade é top'
}

const proxy = new Proxy(projeto, {
    get(objOriginal, key, receiver) {
        console.log(`Algúem pediu a chave ${key} do projeto`);
        // return objOriginal[key]
        return Reflect.get(objOriginal, key, receiver)
    },

    set(objOriginal, key, value) {
        console.log(`Alguém alterou a chave ${key} para o valor "${value}"`)
        objOriginal[key] = value
    }
})


console.log(proxy.id)

proxy.descricao = 'Resposta'

console.log(proxy.descricao)