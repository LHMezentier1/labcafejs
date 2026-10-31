import jsonData from '../data/produtos.json' with {type:'json'};
import { searchTypes, categories } from './enums.js';

export const getProducts = () => jsonData.map((e, i) => {
    e.id = i;
    return e;
});

export function search(nome, type = searchTypes.NOME){
    const products = getProducts()
    switch(type){
        case searchTypes.NOME:
            return products.filter(e => e.nome.toLowerCase().startsWith(nome.toLowerCase()))
        case searchTypes.DESCRICAO:
            return products.filter(e => e.descricao.toLowerCase().startsWith(nome.toLowerCase()))
        default:
            return null
    }
}

export function categoryFilter(category = categories.ALL){
    const products = getProducts()
    switch(category){
        case categories.ALL:
            return products
        case categories.COLD:
            return products.filter(e => e.categoria == 'Bebidas frias')
        case categories.HOT:
            return products.filter(e => e.categoria == 'Bebidas quentes')
        case categories.BREAD:
            return products.filter(e => e.categoria == 'Pães')
        case categories.CAKES:
            return products.filter(e => e.categoria == 'Bolos')
        default:
            return null
    }
}

