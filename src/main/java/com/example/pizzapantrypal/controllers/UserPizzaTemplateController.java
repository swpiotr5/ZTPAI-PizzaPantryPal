//package com.example.pizzapantrypal.controllers;
//
//import com.example.pizzapantrypal.models.UserPizzaTemplate;
//import com.example.pizzapantrypal.repository.UserPizzaTemplateRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/user_pizza_templates")
//public class UserPizzaTemplateController {
//
//    @Autowired
//    private UserPizzaTemplateRepository userPizzaTemplateRepository;
//
//    @GetMapping
//    public List<UserPizzaTemplate> getAllUserPizzaTemplates() {
//        return userPizzaTemplateRepository.findAll();
//    }
//
//    @PostMapping
//    public UserPizzaTemplate createUserPizzaTemplate(@RequestBody UserPizzaTemplate userPizzaTemplate) {
//        return userPizzaTemplateRepository.save(userPizzaTemplate);
//    }
//}