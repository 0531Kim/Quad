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
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImplement extends DefaultOAuth2UserService{

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(request);

    String clientEmail = (String) oAuth2User.getAttributes().get("email");
    if (clientEmail == null) {
        throw new OAuth2AuthenticationException("Email not found in OAuth2 attributes.");
    }

    UserEntity existingUser = userRepository.findByEmail(clientEmail);

    if (existingUser != null) {
        if (existingUser.getType().equals("email")) {
            throw new OAuth2AuthenticationException("해당 이메일은 이미 일반 회원가입으로 존재합니다.");
        }

        return new CustomOAuth2User(clientEmail);
    }

    UserEntity userEntity = new UserEntity(clientEmail, request.getClientRegistration().getRegistrationId());
    userEntity = userRepository.save(userEntity);

    userEntity.updateDefaultUsername();
    while (userRepository.existsByUsername(userEntity.getUsername())) {
        Random random = new Random();
        int randomNum = random.nextInt(10000);
        userEntity.setUsername("default_user_" + userEntity.getUserId() + randomNum);
    }
    userRepository.save(userEntity);

    return new CustomOAuth2User(clientEmail);
}
}
