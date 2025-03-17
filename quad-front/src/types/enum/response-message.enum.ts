enum ResponseMessage{
    //http status 200
    SUCCESS = "Success.",

    //http status 400
    VALIDATION_FAILED = "Validation Failed.",
    DUPLICATE_UPI = "Duplicate Upi.",
    DUPLICATE_USERNAME = "Duplicate Username.",
    NOT_EXISTED_UPI = "This upi does not exist.",
    NOT_EXISTED_REVIEW = "This review does not exist.",

    //Http status 401
    SIGN_IN_FAIL = "Login infomation mismatch.",
    AUTHORIZATION_FAIL = "Authorization Failed.",
    EMAIL_VERIFICATION_FAIL = "Email verification failed",

    //HTTP STATUS 403
    NO_PERMISSION = "Do not have permission.",

    //HTTP STATUS 500
    DATABASE_ERROR = "Database error.",
    MAIL_SEND_FAILED = "Mail send failed."
}