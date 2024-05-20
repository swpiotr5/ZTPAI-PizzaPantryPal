package com.example.pizzapantrypal.models;

import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(name = "available_ingredients")
public class AvailableIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ingredient_id;

    @Column(length = 50)
    private String name;

    @Column(length = 100)
    private String img;

    public AvailableIngredient() {
    }

    public AvailableIngredient(String name, String img) {
        this.name = name;
        this.img = img;
    }

    @OneToMany(mappedBy = "availableIngredient")
    private Set<UserIngredient> userIngredients;

    public Integer getIngredient_id() {
        return ingredient_id;
    }

    public void setIngredient_id(Integer ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Set<UserIngredient> getUserIngredients() {
        return userIngredients;
    }

    public void setUserIngredients(Set<UserIngredient> userIngredients) {
        this.userIngredients = userIngredients;
    }}

