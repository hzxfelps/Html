// ================= API =================
const API_CATEGORIAS = "http://localhost:8080/categorias";
const API_PRODUTOS = "http://localhost:8080/produtos";

let editandoId = null;
let categoriaSelecionada = null;

// ================= UTIL =================
function tratarErro(res) {
  if (!res.ok) {
    throw new Error("Erro na requisição: " + res.status);
  }
  return res;
}

// ================= CATEGORIAS =================

// LISTAR
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

          <h4 class="text-lg font-semibold mb-4">${cat.nome}</h4>

          <div class="flex justify-between text-sm mb-3">

            <button onclick="editarCategoria(${cat.id_categoria}, '${cat.nome.replace(/'/g, "\\'")}')"
              class="text-yellow-400 hover:underline">
              editar
            </button>

            <button onclick="excluirCategoria(${cat.id_categoria})"
              class="text-red-400 hover:underline">
              excluir
            </button>

          </div>

          <button onclick="abrirProdutos(${cat.id_categoria})"
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

// MODAL
function abrirModalCategoria() {
  document.getElementById("modalCategoria").classList.remove("hidden");
}

function fecharModalCategoria() {
  document.getElementById("modalCategoria").classList.add("hidden");
  document.getElementById("nomeCategoria").value = "";
  editandoId = null;
}

// SALVAR / EDITAR
async function salvarCategoria() {
  try {
    const nome = document.getElementById("nomeCategoria").value;

    if (!nome) return alert("Digite um nome");

    const categoria = {
      nome,
      descricao: "sem descrição",
      ativo: true
    };

    if (editandoId) {
      const res = await fetch(`${API_CATEGORIAS}/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria)
      });
      tratarErro(res);

    } else {
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

// EDITAR
function editarCategoria(id, nome) {
  editandoId = id;
  document.getElementById("nomeCategoria").value = nome;
  abrirModalCategoria();
}

// EXCLUIR
async function excluirCategoria(id) {
  try {
    if (!confirm("Deseja excluir?")) return;

    const res = await fetch(`${API_CATEGORIAS}/${id}`, {
      method: "DELETE"
    });

    tratarErro(res);
    await carregarCategorias();

  } catch (err) {
    console.error("Erro ao excluir categoria:", err);
  }
}

// ================= PRODUTOS =================

// ABRIR PRODUTOS
async function abrirProdutos(id_categoria) {
  try {
    categoriaSelecionada = id_categoria;

    const res = await fetch(`${API_PRODUTOS}/categoria/${id_categoria}`);
    tratarErro(res);

    const produtos = await res.json();

    const container = document.getElementById("listaProdutos");
    container.innerHTML = "";

    produtos.forEach(prod => {
      container.innerHTML += `
        <div class="bg-zinc-800 p-4 rounded-xl border border-white/10">

          <h4 class="font-bold">${prod.nome}</h4>
          <p class="text-sm text-zinc-400">R$ ${prod.preco}</p>

          <div class="flex justify-between mt-3 text-sm">
            <button onclick="editarProduto(${prod.id_produto})" class="text-yellow-400">editar</button>
            <button onclick="excluirProduto(${prod.id_produto})" class="text-red-400">excluir</button>
          </div>

        </div>
      `;
    });

    document.getElementById("modalProdutos").classList.remove("hidden");

  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

// FECHAR MODAL PRODUTOS
function fecharModalProdutos() {
  document.getElementById("modalProdutos").classList.add("hidden");
}

// SALVAR PRODUTO
async function salvarProduto() {
  try {
    const nome = document.getElementById("nomeProduto").value;
    const preco = document.getElementById("precoProduto").value;

    if (!nome || !preco) return alert("Preencha tudo");

    const produto = {
      nome,
      preco: parseFloat(preco),
      precoDesconto: parseFloat(preco),
      ativo: true,
      qtdEstoque: 10,
      imagem: "",
      categoria: { id_categoria: categoriaSelecionada }
    };

    const res = await fetch(API_PRODUTOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    tratarErro(res);
    await abrirProdutos(categoriaSelecionada);

  } catch (err) {
    console.error("Erro ao salvar produto:", err);
  }
}

// EXCLUIR PRODUTO
async function excluirProduto(id) {
  try {
    if (!confirm("Excluir produto?")) return;

    const res = await fetch(`${API_PRODUTOS}/${id}`, {
      method: "DELETE"
    });

    tratarErro(res);
    await abrirProdutos(categoriaSelecionada);

  } catch (err) {
    console.error("Erro ao excluir produto:", err);
  }
}

// ================= INIT =================
carregarCategorias();