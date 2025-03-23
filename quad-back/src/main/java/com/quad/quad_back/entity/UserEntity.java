package com.quad.quad_back.entity;

import com.quad.quad_back.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="user")
@Table(name="users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String email;
    private String password;
    private String username;
    private String type;
    private String role;

    public UserEntity(SignUpRequestDto dto){
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.username = dto.getUsername();
        this.type = "app";
        this.role = "ROLE_USER";
    }

    public UserEntity(String email){
        this.email = email;
        this.password = "P!ssword123";
        this.username = email.substring(0,4);
        this.type = "google";
        this.role = "ROLE_USER";
    }
}
