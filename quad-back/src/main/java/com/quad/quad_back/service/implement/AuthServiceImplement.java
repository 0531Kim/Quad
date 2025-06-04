package com.quad.quad_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quad.quad_back.common.VerificationCode;
import com.quad.quad_back.dto.request.auth.ChangeUsernameRequestDto;
import com.quad.quad_back.dto.request.auth.ConfirmEmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.EmailVerificationRequestDto;
import com.quad.quad_back.dto.request.auth.SignInRequestDto;
import com.quad.quad_back.dto.request.auth.SignUpRequestDto;
import com.quad.quad_back.dto.request.auth.UsernameCheckRequestDto;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.auth.ChangeUsernameResponseDto;
import com.quad.quad_back.dto.response.auth.ConfirmEmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.EmailVerificationResponseDto;
import com.quad.quad_back.dto.response.auth.SignInResponseDto;
import com.quad.quad_back.dto.response.auth.SignUpResponseDto;
import com.quad.quad_back.dto.response.auth.UsernameCheckResponseDto;
import com.quad.quad_back.entity.EmailVerificationEntity;
import com.quad.quad_back.entity.UserEntity;
import com.quad.quad_back.provider.EmailProvider;
import com.quad.quad_back.provider.JwtProvider;
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
    private final JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

            String email = dto.getEmail();

            boolean isExistEmail = userRepository.existsByEmail(email);
            if(isExistEmail) return EmailVerificationResponseDto.duplicateEmail();

            String verificationCode = VerificationCode.getVerificationCode();

            boolean isSuccessed = emailProvider.sendVerificationMail(email, verificationCode);
            if(!isSuccessed) return EmailVerificationResponseDto.mailSendFail();

            EmailVerificationEntity verificationEntity = new EmailVerificationEntity(email, verificationCode);
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
                
            String email = dto.getEmail();
            String verificationCode = dto.getVerificationCode();

            EmailVerificationEntity emailVerificationEntity = vertificationRepository.findByEmail(email);
            if(emailVerificationEntity == null) return ConfirmEmailVerificationResponseDto.verificationFail();

            boolean isMatched = emailVerificationEntity.getEmail().equals(email) && emailVerificationEntity.getVerificationCode().equals(verificationCode);
            if(!isMatched) return ConfirmEmailVerificationResponseDto.verificationFail();

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        
        return ConfirmEmailVerificationResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
       
        try{
            String username = dto.getUsername();
            boolean isExistUsername = userRepository.existsByUsername(username);
            if(isExistUsername) return SignUpResponseDto.duplicateUsername();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

            String email = dto.getEmail();
            vertificationRepository.deleteByEmail(email);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
       
        String token = null;

        try{

            String email = dto.getEmail();
            UserEntity userEntity = userRepository.findByEmail(email);
            if(userEntity == null){
                return SignInResponseDto.signInFailed();
            }

            String userType = userEntity.getType();
            
            if("google".equals(userType)){
                return SignInResponseDto.signInTypeWrong();
            }

            String password = dto.getPassword();
            String encodedPassword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPassword);
            if(!isMatched) return SignInResponseDto.signInFailed();

            token = jwtProvider.create(email);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return SignInResponseDto.success(token);
    }

    @Transactional
    @Override
    public ResponseEntity<? super ChangeUsernameResponseDto> changeUsername(ChangeUsernameRequestDto dto) {
       try{

            String tempUsername = dto.getTempUsername();
            String newUsername = dto.getNewUsername();

            UserEntity userEntity = userRepository.findByUsername(tempUsername);
            if(userEntity == null) return ChangeUsernameResponseDto.validationFailed();

            userEntity.setUsername(newUsername);

            userRepository.save(userEntity);

       }catch(Exception exception){
        exception.printStackTrace();
        return ResponseDto.databaseError();
    }
       return ChangeUsernameResponseDto.success();
    }
}
