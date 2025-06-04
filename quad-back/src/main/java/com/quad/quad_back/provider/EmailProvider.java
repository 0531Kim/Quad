package com.quad.quad_back.provider;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailProvider {
    private final JavaMailSender javaMailSender;

    private final String SUBJECT = "[Welcome to quad] Authentication email!";

    public boolean sendVerificationMail(String email, String verificationCode){

        try{
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);

            String htmlContent = getVerificationMessage(verificationCode);

            messageHelper.setTo(email);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(htmlContent, true);

            javaMailSender.send(message);

        } catch (Exception exception){
            exception.printStackTrace();
            return false;
        }

        return true;
    }
    
    private String getVerificationMessage(String verificationCode){

        String verificationMessage ="";
        verificationMessage += "<h1 style='text-align: center;'>[Quad Authentication email]</h1>";
        verificationMessage += "<h3 style='text-align: center;'>Verification code : <strong style='font-size': 32px; letter-spacing: 8px;'>" + verificationCode + "</strong></h3>";
        return verificationMessage;
        
    }
}
