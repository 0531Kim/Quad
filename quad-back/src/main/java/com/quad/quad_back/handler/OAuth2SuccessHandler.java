package com.quad.quad_back.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.quad.quad_back.entity.CustomOAuth2User;
import com.quad.quad_back.entity.UserEntity;
import com.quad.quad_back.provider.JwtProvider;
import com.quad.quad_back.repository.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
    
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
	public void onAuthenticationSuccess(
        HttpServletRequest request, 
        HttpServletResponse response,
		Authentication authentication
    ) throws IOException, ServletException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String userEmail = oAuth2User.getName();
        String token = jwtProvider.create(userEmail);

        UserEntity userEntity = userRepository.findByEmail(userEmail);
        String username = userEntity.getUsername();
        boolean isDefaultUsername = false;

        String defaultPrefix = "default_" + userEmail.substring(0, 4);
        isDefaultUsername = username.startsWith(defaultPrefix);

        if(!isDefaultUsername){
            response.sendRedirect("https://quadnz.com/auth/oauth-response/" + token + "/3600");
        }else{
            response.sendRedirect("https://quadnz.com/auth/oauth-response/" + token + "/3600/" + username);
        }
	}
}
