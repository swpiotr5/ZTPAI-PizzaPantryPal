package com.example.pizzapantrypal.consumer;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RabbitMQConsumer {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ObjectMapper objectMapper;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void receiveMessage(String jsonMessage) {
        try {
            Message message = objectMapper.readValue(jsonMessage, Message.class);
            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(message.email);
            email.setSubject("New Follower Notification");
            email.setText(message.messageText);
            mailSender.send(email);
            System.out.println("Email sent to: " + message.email + " with message: " + message.messageText);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static class Message {
        public String email;
        public String messageText;

        public Message() {
        }

        public Message(String email, String messageText) {
            this.email = email;
            this.messageText = messageText;
        }
    }
}