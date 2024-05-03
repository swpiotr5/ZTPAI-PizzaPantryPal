package com.example.pizzapantrypal.models;

import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.Set;

@Entity
@Table(name = "pantries")
public class Pantry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pantry_id;

    @Column(length = 50)
    private String name;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "user_ingredient_id")
//    private UserIngredient userIngredient;

    public Pantry() {
    }

    public Pantry(String name) {
        this.name = name;
    }

    public Integer getPantry_id() {
        return pantry_id;
    }

    public void setPantry_id(Integer pantry_id) {
        this.pantry_id = pantry_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
}
