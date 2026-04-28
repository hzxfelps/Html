package com.felipeaugusto.petshopApplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long id;

    @Column(nullable = false) // ← obrigatório no banco
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean ativo = true; // ← padrão verdadeiro

    public Categoria() {
    }

    public Categoria(Long id, String nome, String descricao, boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.ativo = ativo;
    }

    public Long getId() { // ⚠️ cuidado: o método do seu controller chama getId_categoria()
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Para compatibilidade com seu controller/service (que usa getId_categoria)
    // Você pode deixar os dois métodos, ou renomear no controller.
    // Vou manter os dois para não quebrar seu código existente:
    public Long getId_categoria() {
        return id;
    }

    public void setId_categoria(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isAtivo() { // getter para boolean
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo != null ? ativo : true;
    }
}