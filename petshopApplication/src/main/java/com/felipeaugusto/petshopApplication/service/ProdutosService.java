package com.felipeaugusto.petshopApplication.service;

import com.felipeaugusto.petshopApplication.entity.Categoria;
import com.felipeaugusto.petshopApplication.entity.Produtos;
import com.felipeaugusto.petshopApplication.repository.CategoriaRepository;
import com.felipeaugusto.petshopApplication.repository.ProdutosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutosService {
    private final ProdutosRepository produtosRepository;

    public ProdutosService(ProdutosRepository produtosRepository) {
        this.produtosRepository = produtosRepository;
    }

    public List<Produtos> getAll() {
        return produtosRepository.findAll();
    }

    public Produtos save(Produtos produtos) {
        return produtosRepository.save(produtos);
    }

    public Produtos buscarPorId(Long id) {
        return produtosRepository.findById(id).orElse(null);
    }

    public boolean deletar(Long id) {
        if (!produtosRepository.existsById(id)) {
            return false;
        }
        produtosRepository.deleteById(id);
        return true;
    }

    public Produtos atualizar(Long id, Produtos produtos) {

        Optional<Produtos> existente = produtosRepository.findById(id);

        if (existente.isEmpty()) {
            return null;
        }

        Produtos c = existente.get();
        c.setNome(produtos.getNome());

        return produtosRepository.save(c);
    }

    public List<Produtos> buscarPorCategoria(Long id) {
        return produtosRepository.findByCategoriaId(id);
    }
}
