package com.example.pizzapantrypal.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "pizza_templates")
public class PizzaTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer template_id;

    @Column(length = 50)
    private String name;

    @SuppressWarnings("rawtypes")
    @OneToMany(mappedBy = "pizzaTemplate")
    private Set<PizzaTemplateIngredient> pizzaTemplateIngredients;

    @OneToMany(mappedBy = "pizzaTemplate")
    private Set<UserPizzaTemplate> userPizzaTemplates;

    public PizzaTemplate() {

    }

    public PizzaTemplate(String name) {
        this.name = name;
    }
    public Integer getTemplate_id() {
        return template_id;
    }

    public void setTemplate_id(Integer template_id) {
        this.template_id = template_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @SuppressWarnings("rawtypes")
    public Set<PizzaTemplateIngredient> getPizzaTemplateIngredients() {
        return pizzaTemplateIngredients;
    }

    public void setPizzaTemplateIngredients(@SuppressWarnings("rawtypes") Set<PizzaTemplateIngredient> pizzaTemplateIngredients) {
        this.pizzaTemplateIngredients = pizzaTemplateIngredients;
    }

    public Set<UserPizzaTemplate> getUserPizzaTemplates() {
        return userPizzaTemplates;
    }

    public void setUserPizzaTemplates(Set<UserPizzaTemplate> userPizzaTemplates) {
        this.userPizzaTemplates = userPizzaTemplates;
    }
}