package com.felipeaugusto.petshopApplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_categoria;

    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private boolean ativo;


    public Categoria() {
    }

    public Categoria(Long id_categoria, String nome, String descricao, boolean ativo) {
        this.id_categoria = id_categoria;
        this.nome = nome;
        this.descricao = descricao;
        this.ativo = ativo;
    }

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
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

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}