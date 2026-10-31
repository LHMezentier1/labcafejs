const {search, categoryFilter} = require('../js/produtos.js')
const {searchTypes, categories} = require('../js/enums.js')
const {getCart, setCart, addToCart, alterCart, removeById, Cart} = require('../js/carrinho.js')
const {handlePayment} = require('../js/pedido.js')
import Pedido from '../js/pedido'

test("deve encontrar produtos pelo nome", () =>{
    const resultado = search("cappuccino")
    console.log(resultado)
    expect(resultado.every(e => e.nome.toLowerCase().startsWith("cappuccino"))).toEqual(true);
})

test("deve retornar array vazio ao nao encontrar nada", () =>{
    const resultado = search("pizza")
    console.log(resultado)
    expect(resultado).toEqual([])
})

test("deve encontrar por descricao", () =>{
    const resultado = search("cafe", searchTypes.DESCRICAO)
    console.log(resultado)
    expect(resultado.every(e => e.descricao.toLowerCase().startsWith("cappuccino"))).toEqual(true);
})

test("deve encontrar por categoria", () =>{
    const resultado = categoryFilter(categories.CAKES)
    expect(resultado.every(e => e.categoria == "Bolos")).toEqual(true)
})

test("Devemos conseguir pegar o carrinho de volta no localstorage apos adicionar um item", () =>{
    addToCart(2)
    console.log(getCart())
    expect(getCart().entries).toHaveLength(1)
})

test("deve aumentar a quantidade quando tentar adicionar um ja existente", () =>{
    addToCart(2)
    console.log(getCart())
    expect(getCart().entries[0].amount).toBe(2)
})

test("ao deletar com só 1 o length deve ser 0", () =>{
    removeById(2)
    expect(getCart().entries).toHaveLength(0)
})

test("criação de pedido", () =>{
    const pedido = new Pedido(getCart())
    Pedido.savePedido(pedido)
    console.log(Pedido.getPedidos())
    expect(Pedido.getPedidos()[0]).toEqual(pedido)
})