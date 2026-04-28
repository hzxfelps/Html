// ================= API =================
const API_CATEGORIAS = "http://localhost:8080/categorias";
const API_PRODUTOS = "http://localhost:8080/produtos";

let editandoId = null;          // id da categoria em edição
let categoriaSelecionada = null; // id da categoria ativa para produtos

// ================= UTIL =================
function tratarErro(res) {
  if (!res.ok) {
    throw new Error("Erro na requisição: " + res.status);
  }
  return res;
}

// ================= CATEGORIAS =================

// LISTAR categorias
async function carregarCategorias() {
  try {
    const res = await fetch(API_CATEGORIAS);
    tratarErro(res);
    const data = await res.json();

    const container = document.getElementById("listaCategorias");
    container.innerHTML = "";

    data.forEach(cat => {
      container.innerHTML += `
        <div class="bg-zinc-900 p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition">
          <h4 class="text-lg font-semibold mb-2">${cat.nome}</h4>
          <p class="text-sm text-zinc-400 mb-4">${cat.descricao || "Sem descrição"}</p>
          <div class="flex justify-between text-sm mb-3">
            <button onclick="editarCategoria(${cat.id_categoria})" class="text-yellow-400 hover:underline">
              editar
            </button>
            <button onclick="excluirCategoria(${cat.id_categoria})" class="text-red-400 hover:underline">
              excluir
            </button>
          </div>
          <button onclick="verProdutos(${cat.id_categoria})"
            class="w-full bg-indigo-500 py-2 rounded-lg hover:bg-indigo-600 transition">
            ver produtos
          </button>
        </div>
      `;
    });
  } catch (err) {
    console.error("Erro ao carregar categorias:", err);
  }
}

// MODAL CATEGORIA (abrir/fechar)
function abrirModalCategoria() {
  document.getElementById("modalCategoria").classList.remove("hidden");
}

function fecharModalCategoria() {
  document.getElementById("modalCategoria").classList.add("hidden");
  document.getElementById("nomeCategoria").value = "";
  document.getElementById("descricaoCategoria").value = "";
  editandoId = null;
}

// SALVAR nova categoria ou edição
async function salvarCategoria() {
  try {
    const nome = document.getElementById("nomeCategoria").value.trim();
    const descricao = document.getElementById("descricaoCategoria").value.trim();

    if (!nome) return alert("Digite um nome");

    const categoria = {
      nome,
      descricao: descricao || "",
      ativo: true
    };

    if (editandoId) {
      // Editar
      const res = await fetch(`${API_CATEGORIAS}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
      });
      tratarErro(res);
    } else {
      // Criar nova
      const res = await fetch(API_CATEGORIAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
      });
      tratarErro(res);
    }

    fecharModalCategoria();
    await carregarCategorias();
  } catch (err) {
    console.error("Erro ao salvar categoria:", err);
  }
}

// EDITAR categoria - busca dados atuais e preenche modal
async function editarCategoria(id) {
  try {
    const res = await fetch(`${API_CATEGORIAS}/${id}`);
    tratarErro(res);
    const cat = await res.json();

    editandoId = cat.id_categoria;
    document.getElementById("nomeCategoria").value = cat.nome;
    document.getElementById("descricaoCategoria").value = cat.descricao || "";
    abrirModalCategoria();
  } catch (err) {
    console.error("Erro ao buscar categoria para edição:", err);
    alert("Não foi possível carregar os dados da categoria");
  }
}

// EXCLUIR categoria
async function excluirCategoria(id) {
  try {
    if (!confirm("Deseja excluir esta categoria?")) return;

    const res = await fetch(`${API_CATEGORIAS}/${id}`, {
      method: "DELETE"
    });
    tratarErro(res);
    await carregarCategorias();

    // Se a categoria excluída for a que está selecionada, limpar produtos e categoriaSelecionada
    if (categoriaSelecionada === id) {
      categoriaSelecionada = null;
      document.getElementById("tituloCategoria").innerText = "Selecione uma categoria";
      document.getElementById("listaProdutos").innerHTML = "";
    }
  } catch (err) {
    console.error("Erro ao excluir categoria:", err);
  }
}

// ================= PRODUTOS =================

// VER produtos de uma categoria (lista no grid principal)
async function verProdutos(id_categoria) {
  try {
    categoriaSelecionada = id_categoria;
    // Buscar o nome da categoria para exibir no título
    const resCategoria = await fetch(`${API_CATEGORIAS}/${id_categoria}`);
    if (resCategoria.ok) {
      const cat = await resCategoria.json();
      document.getElementById("tituloCategoria").innerHTML = `Produtos de: ${cat.nome}`;
    } else {
      document.getElementById("tituloCategoria").innerHTML = `Produtos da categoria`;
    }

    // Carregar produtos da categoria
    const resProdutos = await fetch(`${API_PRODUTOS}/categoria/${id_categoria}`);
    tratarErro(resProdutos);
    const produtos = await resProdutos.json();

    const container = document.getElementById("listaProdutos");
    if (produtos.length === 0) {
      container.innerHTML = `<div class="col-span-full text-center text-zinc-500">Nenhum produto cadastrado nesta categoria.</div>`;
      return;
    }

    container.innerHTML = "";
    produtos.forEach(prod => {
      container.innerHTML += `
        <div class="bg-zinc-800 p-4 rounded-xl border border-white/10">
          <h4 class="font-bold">${prod.nome}</h4>
          <p class="text-sm text-zinc-400">R$ ${prod.preco}</p>
          <div class="flex justify-between mt-3 text-sm">
            <button onclick="editarProduto(${prod.id})" class="text-yellow-400">editar</button>
            <button onclick="excluirProduto(${prod.id})" class="text-red-400">excluir</button>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

// ABRIR MODAL PRODUTO (para criar novo)
function abrirModalProduto() {
  if (!categoriaSelecionada) {
    alert("Selecione uma categoria primeiro clicando em 'ver produtos'.");
    return;
  }
  // Limpar campos
  document.getElementById("nomeProduto").value = "";
  document.getElementById("precoProduto").value = "";
  document.getElementById("estoqueProduto").value = "";
  document.getElementById("modalProduto").classList.remove("hidden");
}

function fecharModalProduto() {
  document.getElementById("modalProduto").classList.add("hidden");
}

// SALVAR novo produto
async function salvarProduto() {
  try {
    const nome = document.getElementById("nomeProduto").value.trim();
    const precoStr = document.getElementById("precoProduto").value.trim();
    const estoqueStr = document.getElementById("estoqueProduto").value.trim();

    if (!nome) return alert("Digite o nome do produto");
    if (!precoStr) return alert("Digite o preço");
    if (!estoqueStr) return alert("Digite o estoque");

    const preco = parseFloat(precoStr);
    const estoque = parseInt(estoqueStr, 10);

    if (isNaN(preco) || preco <= 0) return alert("Preço inválido");
    if (isNaN(estoque) || estoque < 0) return alert("Estoque inválido");

    const produto = {
      nome: nome,
      preco: preco,
      precoDesconto: preco,          // ou 0, se preferir
      qtdEstoque: estoque,
      ativo: true,
      imagem: "",                     // se tiver campo de imagem, pode adicionar
      categoria: { id: categoriaSelecionada }  // ← mudei para { id: ... }
    };

    console.log("Enviando produto:", produto); // debug

    const res = await fetch(API_PRODUTOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ${res.status}: ${errorText}`);
    }

    await abrirProdutos(categoriaSelecionada);
    fecharModalProduto();  // fechar o modal após salvar

  } catch (err) {
    console.error("Erro ao salvar produto:", err);
    alert("Erro ao salvar: " + err.message);
  }
}
// EXCLUIR produto
async function excluirProduto(id) {
  try {
    if (!confirm("Excluir produto?")) return;

    const res = await fetch(`${API_PRODUTOS}/${id}`, {
      method: "DELETE"
    });
    tratarErro(res);
    // Recarregar produtos da categoria atual
    if (categoriaSelecionada) {
      await verProdutos(categoriaSelecionada);
    }
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
  }
}

// Editar produto (função simples, você pode expandir)
async function editarProduto(id) {
  // Para simplificar, apenas alerta que falta implementar; você pode criar um modal similar ao de categoria
  alert("Funcionalidade de editar produto será implementada em breve.");
  // Aqui você poderia buscar o produto por id e abrir um modal de edição
}

// ================= INIT =================
carregarCategorias();