package com.quad.quad_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quad.quad_back.common.VerificationNumber;
import com.quad.quad_back.dto.request.auth.ConfirmEmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.EmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.UsernameCheckRequestDto;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.auth.ConfirmEmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.EmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.UsernameCheckResponseDto;
import com.quad.quad_back.entity.EmailVerificationEntity;
import com.quad.quad_back.provider.EmailProvider;
import com.quad.quad_back.repository.UserRepository;
import com.quad.quad_back.repository.VertificationRepository;
import com.quad.quad_back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{

    private final UserRepository userRepository;
    private final VertificationRepository vertificationRepository;

    private final EmailProvider emailProvider;

    @Override
    public ResponseEntity<? super UsernameCheckResponseDto> usernameCheck(UsernameCheckRequestDto dto) {

        try{

            String userName = dto.getUsername();
            boolean isExistUsername = userRepository.existsByUsername(userName);
            if(isExistUsername) return UsernameCheckResponseDto.duplicateUsername();

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return UsernameCheckResponseDto.success();
    }

    @Override
    public ResponseEntity<? super EmailVerificationResponseDto> emailVerification(EmailVerificationRequestDto dto) {
      
        try{

            String username = dto.getUsername();
            System.out.println(username);
            System.out.println(username.length());
            String email = dto.getEmail();

            boolean isExistUsername = userRepository.existsByUsername(username);
            if(isExistUsername) return EmailVerificationResponseDto.duplicateUsername();

            String verificationNumber = VerificationNumber.getVerificationNumber();

            boolean isSuccessed = emailProvider.sendVerificationMail(email, verificationNumber);
            if(!isSuccessed) return EmailVerificationResponseDto.mailSendFail();

            EmailVerificationEntity verificationEntity = new EmailVerificationEntity(username, email, verificationNumber);
            vertificationRepository.save(verificationEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return EmailVerificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super ConfirmEmailVerificationResponseDto> confirmVerification(
            ConfirmEmailVerificationRequestDto dto) {
        try{
                
            String username = dto.getUsername();
            String email = dto.getEmail();
            String verificationNumber = dto.getVerificationNumber();

            EmailVerificationEntity emailVerificationEntity = vertificationRepository.findByUsername(username);
            if(emailVerificationEntity == null) return ConfirmEmailVerificationResponseDto.verificationFail();

            boolean isMatched = emailVerificationEntity.getEmail().equals(email) && emailVerificationEntity.getVerificationNumber().equals(verificationNumber);
            if(!isMatched) return ConfirmEmailVerificationResponseDto.verificationFail();

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return ConfirmEmailVerificationResponseDto.success();
    }
}
