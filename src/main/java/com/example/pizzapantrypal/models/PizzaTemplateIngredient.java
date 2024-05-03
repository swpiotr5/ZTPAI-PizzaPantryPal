package com.example.pizzapantrypal.models;

import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.Set;

@Entity
@Table(name = "pizza_template_ingredients")
public class PizzaTemplateIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ingredient_id;

    @Column(length = 50)
    private String name;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private PizzaTemplate pizzaTemplate;

    @ManyToOne
    @JoinColumn(name = "user_ingredient_id")
    private UserIngredient userIngredient;

    public PizzaTemplateIngredient() {

    }

    public PizzaTemplateIngredient(String name) {
        this.name = name;
    }

    public Integer getIngredient_id() {
        return ingredient_id;
    }

    public void setIngredient_id(Integer ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public PizzaTemplate getPizzaTemplate() {
        return pizzaTemplate;
    }

    public void setPizzaTemplate(PizzaTemplate pizzaTemplate) {
        this.pizzaTemplate = pizzaTemplate;
    }

    public UserIngredient getUserIngredient() {
        return userIngredient;
    }

    public void setUserIngredient(UserIngredient userIngredient) {
        this.userIngredient = userIngredient;
    }
}