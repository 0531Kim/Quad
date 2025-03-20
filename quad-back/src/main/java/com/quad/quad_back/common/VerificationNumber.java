package com.quad.quad_back.common;

public class VerificationNumber {
    
    public static String getVerificationNumber () {

        String verificationNumber = "";

        for(int count = 0; count < 4; count++){
            verificationNumber += (int)(Math.random() * 10);
        }

        return verificationNumber;
    }
}
