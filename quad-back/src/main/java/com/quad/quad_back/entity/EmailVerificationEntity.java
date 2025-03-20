package com.quad.quad_back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="verification")
@Table(name="verification")
public class EmailVerificationEntity {
    
    @Id
    private String username;
    private String email;
    // use string not int in case a verification number starts from 0
    private String verificationNumber;
}
