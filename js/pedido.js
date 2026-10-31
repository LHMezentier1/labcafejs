export default class Pedido{
    /**
     * @param {Cart} carrinho 
     * @param {*} id 
     * @param {Date} date 
     */
    constructor(carrinho, id=Pedido.getNextId(), date = new Date().toDateString()){
        this.id = id;
        this.carrinho = carrinho;
        this.date = date;
    }
    /**
     * 
     * @returns {Array}
     */
    static getPedidos = () => localStorage.hasOwnProperty('pedidos') ? JSON.parse(localStorage.getItem('pedidos')) : [] 

    static getNextId = () => Pedido.getPedidos().reduce((acc, e) => e.id >= acc ? acc + 1 : acc, 0)
    
    /**
     * @param {Pedido} pedido 
     */
    static savePedido = (pedido) => localStorage.setItem("pedidos", JSON.stringify([...Pedido.getPedidos(), pedido]))

    static success = class{
        constructor(total, id, mp){
            this.mp = mp
            this.total = total
            this.id = id
        }
    }
}

export function handlePayment(cart){
    const pedido = new Pedido(cart)
    Pedido.savePedido(pedido)
    localStorage.removeItem('carrinho')
    return new Pedido.success(pedido.carrinho.total, pedido.id, pedido.carrinho.metpag)
}