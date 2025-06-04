package com.quad.quad_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.quad.quad_back.dto.request.auth.ChangeUsernameRequestDto;
import com.quad.quad_back.dto.response.ResponseDto;
import com.quad.quad_back.dto.response.auth.ChangeUsernameResponseDto;
import com.quad.quad_back.dto.response.user.GetSignInUserResponseDto;
import com.quad.quad_back.entity.UserEntity;
import com.quad.quad_back.repository.UserRepository;
import com.quad.quad_back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService{

    private final UserRepository userRepository;

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

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        
        UserEntity userEntity = null;

        try{

            userEntity = userRepository.findByEmail(email);
            if(userEntity == null) return GetSignInUserResponseDto.notExistUser();

       }catch(Exception exception){
        exception.printStackTrace();
        return ResponseDto.databaseError();
    }
       return GetSignInUserResponseDto.success(userEntity);
    }
}
