package com.example.pizzapantrypal.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "pizza_templates", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class PizzaTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private Users user;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "template_id")
    private List<PizzaTemplateIngredient> ingredients;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public List<PizzaTemplateIngredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<PizzaTemplateIngredient> ingredients) {
        this.ingredients = ingredients;
    }
}
