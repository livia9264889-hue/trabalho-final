

let carrinho = [];

const formatarPreco = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// FILTRAR AS ROUPAS
function filtrar(categoria, botao) {
    document.querySelectorAll(".produto").forEach(produto => {
        const mostrar =
            categoria === "Todos" ||
            produto.dataset.categoria === categoria;

        produto.classList.toggle("escondido", !mostrar);
    });

    document.querySelectorAll(".filtro").forEach(item => {
        item.classList.remove("ativo");
    });

    botao.classList.add("ativo");
}

// ADICIONAR À BOLSA
function adicionar(nome, preco) {
    carrinho.push({
        id: Date.now() + Math.random(),
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();
}

// ATUALIZAR A BOLSA
function atualizarCarrinho() {
    document.getElementById("contador").textContent =
        carrinho.length;

    const lista = document.getElementById("itensCarrinho");
    lista.innerHTML = "";

    carrinho.forEach(item => {
        const linha = document.createElement("div");
        linha.className = "item-carrinho";

        const nome = document.createElement("span");
        nome.textContent =
            item.nome + " — " + formatarPreco(item.preco);

        const remover = document.createElement("button");
        remover.className = "remover";
        remover.textContent = "Remover";

        remover.onclick = () => {
            carrinho = carrinho.filter(
                produto => produto.id !== item.id
            );

            atualizarCarrinho();
        };

        linha.append(nome, remover);
        lista.appendChild(linha);
    });

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco,
        0
    );

    document.getElementById("totalCarrinho").textContent =
        "Total: " + formatarPreco(total);
}

// ABRIR E FECHAR LOGIN
function abrirLogin() {
    document.getElementById("modalLogin").classList.add("aberto");
}

function fecharLogin() {
    document.getElementById("modalLogin").classList.remove("aberto");
}

// ABRIR E FECHAR BOLSA
function abrirCarrinho() {
    document.getElementById("modalCarrinho").classList.add("aberto");
}

function fecharCarrinho() {
    document.getElementById("modalCarrinho").classList.remove("aberto");
}

// LOGIN DEMONSTRATIVO
document.getElementById("formLogin").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    document.getElementById("mensagemLogin").textContent =
        "Olá! Seu formulário foi preenchido para " + email +
        ". Este login é apenas uma demonstração.";

    this.reset();
});

// FINALIZAR PEDIDO DEMONSTRATIVO
function finalizarCompra() {
    const mensagem = document.getElementById("mensagemCompra");

    if (carrinho.length === 0) {
        mensagem.textContent =
            "Sua bolsa está vazia! Escolha suas peças favoritas. 💗";
    } else {
        mensagem.textContent =
            "Pedido demonstrativo preparado! Para comprar de verdade, " +
            "é necessário configurar pagamento e entrega.";
    }
}

// FECHAR AO CLICAR FORA DA JANELA
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.remove("aberto");
        }
    });
});

// FECHAR COM A TECLA ESC
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        fecharLogin();
        fecharCarrinho();
    }
});

// INICIAR CARRINHO
atualizarCarrinho();
