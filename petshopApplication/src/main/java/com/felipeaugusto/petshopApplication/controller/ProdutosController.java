package com.felipeaugusto.petshopApplication.controller;

import com.felipeaugusto.petshopApplication.entity.Produtos;
import com.felipeaugusto.petshopApplication.service.ProdutosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutosController {

    private final ProdutosService produtosService;

    public ProdutosController(ProdutosService produtosService) {
        this.produtosService = produtosService;
    }

    @GetMapping
    public List<Produtos> getAll() {
        return produtosService.getAll();
    }

    @PostMapping
    public Produtos criar(@RequestBody Produtos produtos) {
        return produtosService.save(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produtos> buscarPorId(@PathVariable Long id) {

        Produtos produtos = produtosService.buscarPorId(id);

        if (produtos == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(produtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produtos> atualizar(@PathVariable Long id,
                                              @RequestBody Produtos produtos) {

        Produtos atualizada = produtosService.atualizar(id, produtos);

        if (atualizada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        boolean deletado = produtosService.deletar(id);

        if (!deletado) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categoria/{id}")
    public List<Produtos> buscarPorCategoria(@PathVariable Long id) {
        return produtosService.buscarPorCategoria(id);
    }
}
