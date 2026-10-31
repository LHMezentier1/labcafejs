export const searchTypes = Object.freeze({NOME: 1, DESCRICAO: 2})
export const categories = Object.freeze({ALL: 1, COLD: 2, HOT: 3, BREAD: 4, CAKES: 5})
export const met_pag = Object.freeze({PIX: 1, DEBITO: 2, CREDITO: 3, DINHEIRO: 4, UNDEFINED: 5})

export function textToMet(text){
    switch(text.toLowerCase()){
        case "pix":
            return met_pag.PIX
        case "debito":
            return met_pag.DEBITO
        case "credito":
            return met_pag.CREDITO
        case "dinheiro":
            return met_pag.DINHEIRO
        default:
            return met_pag.UNDEFINED
    }
}

export function metToText(met){
    switch(met){
        case met_pag.PIX:
            return "PIX"
        case met_pag.DEBITO:
            return "Cartão de Debito"
        case met_pag.CREDITO:
            return "Cartão de Credito"
        case met_pag.DINHEIRO:
            return "Dinheiro"
        default:
            return "Desconhecido"
    }
}