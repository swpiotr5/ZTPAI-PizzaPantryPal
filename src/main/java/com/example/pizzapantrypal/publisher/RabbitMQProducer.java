package com.example.pizzapantrypal.publisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RabbitMQProducer {
    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQProducer.class);
    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public RabbitMQProducer(RabbitTemplate rabbitTemplate, ObjectMapper objectMapper) {
        this.rabbitTemplate = rabbitTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendMessage(String email, String messageText) {
        try {
            Message message = new Message(email, messageText);
            String jsonMessage = objectMapper.writeValueAsString(message);
            LOGGER.info(String.format("Message sent -> %s", jsonMessage));
            rabbitTemplate.convertAndSend(exchange, routingKey, jsonMessage);
        } catch (Exception e) {
            LOGGER.error("Error while sending message", e);
        }
    }

    private static class Message {
        public String email;
        public String messageText;

        public Message(String email, String messageText) {
            this.email = email;
            this.messageText = messageText;
        }
    }
}