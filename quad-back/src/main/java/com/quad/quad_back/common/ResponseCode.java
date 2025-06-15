package com.quad.quad_back.common;

public interface ResponseCode{
    
    // Http status 200: SUCCESS
    public static final String SUCCESS = "SU";

    // Http status 400: BAD REQUEST
    String VALIDATION_FAILED = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATED_USERNAME = "DU";
    String NOT_EXISTED_EMAIL = "NE";
    String NOT_EXISTED_REVIEW = "NR";
    String NOT_EXISTED_COURSE = "NC";
    String NOT_EXISTED_USER = "NU";

    // Http status 401: Unauthorized
    String SIGN_IN_FAILED = "SF";
    String AUTHORIZATION_FAIL = "AF";
    String EMAIL_VERIFICATION_FAILED = "EVF";
    String SIGN_IN_TYPE_WRONG = "STW";

    // Http status 403: Forbidden
    String NO_PERMISSION = "NP";

    // Http status 500: Server Error
    String DATABASE_ERROR = "DBE";
    String MAIL_SEND_FAILED = "MF";
}
