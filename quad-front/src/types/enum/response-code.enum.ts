enum ResponseCode{
    // Http status 200
    SUCCESS = "SU",

    // Http status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_USERNAME = "DU",
    NOT_EXISTED_EMAIL = "NE",
    NOT_EXISTED_REVIEW = "NR",

    // Http status 401
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",
    EMAIL_VERIFICATION_FAILED = "EVF",
    SIGN_IN_TYPE_WRONG = "STW",

    // HTTP STATUS 403
    NO_PERMISSION = "NP",

    // HTTP STATUS 500
    DATABASE_ERROR = "DBE",
    MAIL_SEND_FAILED = "MF"
}

export default ResponseCode;