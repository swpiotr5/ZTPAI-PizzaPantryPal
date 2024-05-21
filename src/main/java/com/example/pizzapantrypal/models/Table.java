package com.example.pizzapantrypal.models;

import jakarta.persistence.UniqueConstraint;

public @interface Table {

    UniqueConstraint[] uniqueConstraints();

    String name();

}
