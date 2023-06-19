let listaDeItens = []

const form = document.getElementById("form-itens")
//input dos itens no campo te entrada:
const itensInput = document.getElementById("receber-item")

const ulItens = document.getElementById("lista-de-itens")

const ulItensComprados = document.getElementById("itens-comprados")

//Evento de escuta para quando o formulário é submetido
//A função passada como argumento é executada quando o evento ocorre
form.addEventListener('submit', function (event) {
    event.preventDefault()
    salvarItem()
    mostrarItem()
})

function salvarItem() {
    //Obtém o valor do elemento de entrada de texto 'itensInput' e o armazena na variável 'comprasItem'
    const comprasItem = itensInput.value;
    //'COMPARAÇÃO DE OBJETOS' Verifica se o usuario esta tentando adicionar um item duplicado a lista
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if (checarDuplicado) {
        alert("Item já existe.")
    } else {
         listaDeItens.push({
            valor: comprasItem,
            checar: false
        })
    }

    console.log(listaDeItens)
}

//Metodo de callback 
//O forEach() percorre cada elemento do array e executa a função de callback fornecida como argumento
function mostrarItem() {
    ulItens.innerHTML
    listaDeItens.forEach((elemento, index) => {
        if(elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />
                    <span class="itens-comprados is-size-5">${elemento.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
            `    
            } else {
        //+= para adicionar conteúdo HTML ao innerHTML existente. A cada interação, um novo elemento de lista <li> é adicionado ao ulItens, contendo os detalhes do item.
            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.valor}"></input>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
    `
            }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')
        //'i' é o parametro da função de callback Foreach
        inputsCheck.forEach(i => {
            //i representa cada item da NodeList retornada pela função querySelectorAll
            i.addEventListener('click', (evento) => {
                const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
                    listaDeItens[valorDoElemento].checar = evento.target.checked
                    console.log(listaDeItens[valorDoElemento].checar)
            })
    })

}