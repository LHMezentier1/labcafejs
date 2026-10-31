import {getProducts} from './produtos.js'
import {met_pag} from './enums.js'

export default class Cart{
    /**
     * 
     * @param {Array} entries 
     * @param {Number} subtotal 
     * @param {Number} total 
     * @param {met_pag} met_pagamento 
     */
    constructor(entries = [], subtotal = 0, total = 0){
        this.entries = entries
        this.subtotal = subtotal
        this.total = total
    }
    static CartEntry = class CartEntry{
    constructor(product, amount){
        this.product = product
        this.amount = amount
    }
}
}

/**
 * @returns {Cart}
 */
export const getCart = () => localStorage.hasOwnProperty("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : new Cart()

/**
 * @param {Cart} cart 
 */
export const setCart = (cart) => localStorage.setItem('carrinho', JSON.stringify(cart))

export function addToCart(id, amount = 1){
    const produtos = getProducts()
    const cart = getCart()
    console.log(cart.entries)
    console.log(Array.isArray(cart.entries))
    if(cart.entries.some(e => e.product.id == id)){
        const index = cart.entries.findIndex(e => e.product.id == id)
        if(index == -1) return null
        cart.entries[index].amount += 1
        const {subtotal, total} = getTotalAndSubtotal(cart)
        cart.total = total
        cart.subtotal = subtotal
        setCart(cart)
        return true
    }
    const produto = produtos.find(e => e.id == id)
    if(produto === null || produto === undefined) return null
    const entry = new Cart.CartEntry(produto, amount)
    cart.entries.push(entry)
    const total = getTotalAndSubtotal(cart)
    cart.total = total.total
    cart.subtotal = total.subtotal
    setCart(cart)
    return true
}

export function alterCart(id, amount){
    const cart = getCart()
    if(cart.entries.length == 0) return null
    const index = cart.entries.findIndex(e => e.product.id == id)
    if(index == -1) return null
    if(amount == 0) cart.entries.splice(index, 1)
    else cart.entries[index].amount = amount
    const total = getTotalAndSubtotal(cart)
    cart.total = total.total
    cart.subtotal = total.subtotal
    setCart(cart)
    return true
}

export function removeById(id){
    const cart = getCart()
    const index = cart.entries.findIndex(e => e.product.id == id)
    if(index == -1) return
    cart.entries.splice(index, 1)
    setCart(cart)
    return true
}

/**
 * @param {Cart} cart
 */
export function getTotalAndSubtotal(cart){
    const subTotal = cart.entries.reduce((acc, e) => acc + e.product.preco * e.amount, 0)
    const taxCalc = Math.min(10, subTotal*(0.05))
    return {subtotal: subTotal, total: subTotal + taxCalc}
}