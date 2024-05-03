package com.example.pizzapantrypal.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "user_pizza_templates")
public class UserPizzaTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_template_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private PizzaTemplate pizzaTemplate;


    public UserPizzaTemplate() {

    }

    public UserPizzaTemplate(Users user, PizzaTemplate pizzaTemplate) {
        this.user = user;
        this.pizzaTemplate = pizzaTemplate;
    }
    public Integer getUser_template_id() {
        return user_template_id;
    }

    public void setUser_template_id(Integer user_template_id) {
        this.user_template_id = user_template_id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public PizzaTemplate getPizzaTemplate() {
        return pizzaTemplate;
    }

    public void setPizzaTemplate(PizzaTemplate pizzaTemplate) {
        this.pizzaTemplate = pizzaTemplate;
    }
}