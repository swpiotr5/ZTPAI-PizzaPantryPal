package com.example.pizzapantrypal.models;

import jakarta.persistence.*;

@Entity
@Table(name = "pizza_template_ingredients", uniqueConstraints = @UniqueConstraint(columnNames = {"template_id", "available_ingredient_id"}))
public class PizzaTemplateIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "template_id", nullable = false)

    private Integer templateId;

    @Column(name = "available_ingredient_id", nullable = false)
    private Integer availableIngredientId;

    @Column(nullable = false)
    private String amount;

    @Column(nullable = false)
    private String unit;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public Integer getAvailableIngredientId() {
        return availableIngredientId;
    }

    public void setAvailableIngredientId(Integer availableIngredientId) {
        this.availableIngredientId = availableIngredientId;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
