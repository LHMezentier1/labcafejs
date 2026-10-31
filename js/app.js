import { getProducts, categoryFilter, search } from "./produtos.js";
import { categories, met_pag, searchTypes, textToMet, metToText} from "./enums.js";
import { addToCart, getCart, getTotalAndSubtotal, alterCart} from './carrinho.js'
import { handlePayment} from "./pedido.js";

const busca = document.querySelector("#busca")
const filterButtons = document.querySelectorAll(".filtro")
const carrinhoitens = document.querySelector("#itensCarrinho")
const formatarMoeda = (v) => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
// TODO: carregarProdutos, buscarProdutos, filtrarPorCategoria, adicionarAoCarrinho,
// removerDoCarrinho, alterarQuantidade, calcularSubtotal, calcularTaxa,
// calcularTotal, gerarPedido, salvarCarrinho, carregarCarrinho e salvarPedido.
function renderizarProdutos(list){
  document.querySelector("#listaProdutos").innerHTML=list.map((p,i)=>`<article class="produto"><img src="${p.foto}" alt="${p.nome}"><div class="produto-corpo"><span class="produto-categoria">${p.categoria}</span><h3>${p.nome}</h3><p>${p.descricao}</p><div class="produto-rodape"><span class="preco">${formatarMoeda(p.preco)}</span><button class="adicionar" data-id="${p.id}">Adicionar</button></div></div></article>`).join("")
  addButtons = document.querySelectorAll(".adicionar")
  addButtons.forEach(e => e.addEventListener('click', () => handleAdd(e)))
  console.log(addButtons)
}

let addButtons;
document.querySelector("#abrirCarrinho").onclick=()=>document.querySelector("#modalCarrinho").classList.add("aberto");
document.querySelector("#fecharCarrinho").onclick=()=>document.querySelector("#modalCarrinho").classList.remove("aberto");
document.addEventListener('DOMContentLoaded', () => {
  renderizarProdutos(getProducts())
})
document.addEventListener('DOMContentLoaded', () => addCart(getCart()))

function addCart(cart){
  carrinhoitens.innerHTML = ''
  if(cart.entries.length == 0){
    carrinhoitens.innerHTML = '<p class="vazio">Seu carrinho está vazio.</p>'
    document.getElementById("contadorCarrinho").innerText = cart.entries.length
  }
  cart.entries.forEach(e => {
    const article = document.createElement('article')
    article.classList.add('item-carrinho')
    const div = document.createElement('div')
    div.classList.add('produto-corpo')
    const spanP = document.createElement('span')
    spanP.classList.add('preco')
    spanP.innerText = formatarMoeda(e.product.preco)
    const nome = document.createElement('h4')
    nome.innerText = e.product.nome
    const p = document.createElement('p')
    p.innerText = `Quantidade : ${e.amount}`
    const buttonRemove = document.createElement('button')
    const buttonAdd = document.createElement('button')
    buttonRemove.innerText = "-"
    buttonAdd.innerText = "+"
    buttonRemove.classList.add('handleAmount', 'remove')
    buttonAdd.classList.add('handleAmount', 'add')
    buttonRemove.addEventListener('click', () => {
      alterCart(e.product.id, e.amount - 1)
      addCart(getCart())
    })
    buttonAdd.addEventListener('click', () => {
      alterCart(e.product.id, e.amount + 1)
      addCart(getCart())
    })
    div.append(nome, spanP, p, buttonRemove, buttonAdd)
    article.appendChild(div)
    carrinhoitens.appendChild(article)
  })
  console.log(cart)
  console.log(getTotalAndSubtotal(cart))
  document.getElementById("subtotal").innerText = formatarMoeda(cart.subtotal)
  document.getElementById('taxa').innerText = formatarMoeda(cart.total - cart.subtotal)
  document.getElementById('total').innerText = formatarMoeda(cart.total)
  document.getElementById("contadorCarrinho").innerText = cart.entries.length || 0
}

function handleAdd(e){
  console.log('sim')
  const id = e.getAttribute('data-id')
  addToCart(id)
  addCart(getCart())
}

filterButtons.forEach(el => el.addEventListener('click', () => gerenciarClique(el)))

function gerenciarClique(el) {
  if (el.classList.contains('ativo')) return;
  filterButtons.forEach(el => {if(el.classList.contains('ativo')) el.classList.remove('ativo')})
  const categoriaescolhida = el.getAttribute('data-categoria');
  el.classList.add('ativo');
  let categoria;
  switch(categoriaescolhida) {
    case "Todos":
      categoria = categories.ALL;
      break;
    case "Bebidas quentes":
      categoria = categories.HOT;
      break;
    case "Bebidas frias":
      categoria = categories.COLD;
      break;
    case "Pães":
      categoria = categories.BREAD;
      break;
    case "Bolos":
      categoria = categories.CAKES;
      break;
    default:
      return;
  }
  renderizarProdutos(categoryFilter(categoria))
}


busca.addEventListener('input', () =>{
  const value = busca.value
  const quant = document.querySelector("#quantidadeResultados")
  if(value.trim() == ''){
    const products = getProducts()
    renderizarProdutos(products)
    quant.innerHTML = products.length
    return
  }
  const sch = search(value)
  renderizarProdutos(sch)
  quant.innerHTML = sch.length
})

document.querySelector(".botao-principal").addEventListener("click", () =>{
  const status = handlePayment(getCart())
  const div = document.getElementById("mensagemPagamento")
  addCart(getCart())
  [status.id, status.total, metToText(status.mp)].forEach(e =>{
    const h1 = document.createElement('h1')
    h1.innerText = e
  })
})




