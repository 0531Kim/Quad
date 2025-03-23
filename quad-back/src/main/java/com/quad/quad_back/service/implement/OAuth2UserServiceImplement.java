package com.quad.quad_back.service.implement;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.quad.quad_back.entity.CustomOAuth2User;
import com.quad.quad_back.entity.UserEntity;
import com.quad.quad_back.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService{

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException{
        
        OAuth2User oAuth2User = super.loadUser(request);

        // System.out.println("i am here");

        // try{

        //     System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));

        // }catch (Exception exception){
        //     exception.printStackTrace();
        // }

        String clientEmail = (String) oAuth2User.getAttributes().get("email");
        UserEntity userEntity = new UserEntity(clientEmail);

        userRepository.save(userEntity);
        System.out.println("Just saved");
        return new CustomOAuth2User(clientEmail);

    }
}
