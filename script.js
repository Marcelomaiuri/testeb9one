const produtos = [
  {
    nome: "Monitor LED 27'' Gamer Curvo Samsung 1920 x 1080 FHD 240 Hz HDMI, DP, Gsync Série CRG50",
    precoDe: 2813.0,
    precoPor: 2599.0,
    parcelamento: {
      vezes: 10,
      valorParcela: 259.9,
      semJuros: true,
    },
    imagem: "images/image.png",
  },
  {
    nome: "Monitor LED 27'' Gamer Curvo Samsung 1920 x 1080 FHD 240 Hz HDMI, DP, Gsync Série CRG50",
    precoDe: 2813.0,
    precoPor: 2599.0,
    parcelamento: {
      vezes: 10,
      valorParcela: 259.9,
      semJuros: true,
    },
    imagem: "images/image.png",
  },
];

const appDiv = document.querySelector(".App");
const favoritos = {};

function formatarValor(valor) {
  return valor
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

produtos.forEach((produto, index) => {
  const produtoDiv = document.createElement("div");
  produtoDiv.classList.add("produto");

  const iconeWishlist = document.createElement("img");
  iconeWishlist.src = "images/wishlist.png";
  iconeWishlist.alt = "Ícone de Wishlist";
  iconeWishlist.classList.add("icone-wishlist");
  iconeWishlist.addEventListener("click", () => {
    iconeWishlist.classList.toggle("selected");
    if (iconeWishlist.classList.contains("selected")) {
      iconeWishlist.src = "images/wishlist-selected.png";
      popupConfirmacao.classList.add("show");
      favoritos[index] = true;
    } else {
      iconeWishlist.src = "images/wishlist.png";
      popupConfirmacao.classList.remove("show");
      favoritos[index] = false;
    }
    
    setTimeout(() => {
        popupConfirmacao.classList.remove("show");
    }, 2000);
  });

  const popupConfirmacao = document.createElement("div");
  popupConfirmacao.classList.add("popup-confirmacao");

  const textoConfirmacao = document.createElement("p");
  textoConfirmacao.textContent = "Produto adicionado à Wishlist";
  popupConfirmacao.appendChild(textoConfirmacao);
  
  produtoDiv.appendChild(popupConfirmacao);
  produtoDiv.appendChild(iconeWishlist);

  const imagemElement = document.createElement("img");
  imagemElement.src = produto.imagem;
  imagemElement.alt = produto.nome;
  produtoDiv.appendChild(imagemElement);

  const nomeElement = document.createElement("h2");
  nomeElement.textContent = produto.nome;
  nomeElement.classList.add("titulo-produto");

  const precoDeElement = document.createElement("p");
  precoDeElement.textContent = `R$ ${formatarValor(produto.precoDe)}`;
  precoDeElement.classList.add("preco-de");

  const precoPorElement = document.createElement("p");
  precoPorElement.textContent = `R$ ${formatarValor(produto.precoPor)}`;
  precoPorElement.classList.add("preco-por");

  const parcelamentoElement = document.createElement("p");
  const parcelamentoInfo = produto.parcelamento.semJuros
    ? "sem juros"
    : "com juros";
  parcelamentoElement.innerHTML = `em até <strong class="valor-parcelamento">${
    produto.parcelamento.vezes
  }x de R$ ${formatarValor(
    produto.parcelamento.valorParcela
  )}</strong> ${parcelamentoInfo}`;
  parcelamentoElement.classList.add("parcelamento");

  const botaoAdicionar = document.createElement("button");
  botaoAdicionar.textContent = "Adicionar";
  botaoAdicionar.classList.add("btn-adicionar");
  botaoAdicionar.setAttribute("data-id", index);

  const iconeCheck = document.createElement("span");
  iconeCheck.classList.add("icone-check");
  botaoAdicionar.appendChild(iconeCheck);

  produtoDiv.appendChild(nomeElement);
  produtoDiv.appendChild(precoDeElement);
  produtoDiv.appendChild(precoPorElement);
  produtoDiv.appendChild(parcelamentoElement);
  produtoDiv.appendChild(botaoAdicionar);

  appDiv.appendChild(produtoDiv);

  botaoAdicionar.addEventListener("click", () => {
    const productId = botaoAdicionar.getAttribute("data-id");

    botaoAdicionar.classList.toggle("clicked");
    iconeCheck.style.display = botaoAdicionar.classList.contains("clicked")
      ? "inline-block"
      : "none";

    if (botaoAdicionar.classList.contains("clicked")) {
      botaoAdicionar.textContent = "Adicionado";
      favoritos[productId] = true;
    } else {
      botaoAdicionar.textContent = "Adicionar";
      favoritos[productId] = false;
    }
  });
});
