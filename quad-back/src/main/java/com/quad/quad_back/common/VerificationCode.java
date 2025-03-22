package com.quad.quad_back.common;

public class VerificationCode {
    
    public static String getVerificationCode () {

        String verificationCode = "";

        for(int count = 0; count < 4; count++){
            verificationCode += (int)(Math.random() * 10);
        }

        return verificationCode;
    }
}
