package com.quad.quad_back.service.implement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

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

        String clientEmail = (String) oAuth2User.getAttributes().get("email");
        boolean userExists = userRepository.existsByEmail(clientEmail);

        if (!userExists) {
            UserEntity userEntity = new UserEntity(clientEmail, null);
            userRepository.save(userEntity);
        }

        return new CustomOAuth2User(clientEmail);

    }
}
