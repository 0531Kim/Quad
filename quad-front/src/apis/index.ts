import axios from "axios";
import { emailVerificationRequestDto, SignInRequestDto, SignUpRequestDto, checkVerificationCodeRequestDto, usernameCheckRequestDto } from "./request/auth";
import { EmailVerificationCodeResponseDto, SignInResponseDto, SignUpResponseDto, checkVerificationCodeResponseDto } from "./response/auth";
import { ChangeUsernameResponseDto, GetSignInUserResponseDto } from "./response/user";
import { ResponseDto } from "./response";
import usernameCheckResponseDto from "./response/auth/username-check-response.dto";
import { ChangeUsernameRequestDto } from "./request/user";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;
const authorization = (accessToken: string) => {
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async(requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const signUpRequest = async(requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
    .then(response => {
        const responseBody: GetSignInUserResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

const SEND_EMAIL_VERIFICATION_CODE_URL = () => `${API_DOMAIN}/auth/email-verification`;

export const sendEmailVerificationCode = async (requestBody: emailVerificationRequestDto) => {
    const result = await axios.post(SEND_EMAIL_VERIFICATION_CODE_URL(), requestBody)
    .then(response => {
        const responseBody: EmailVerificationCodeResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

const CONFIRM_EMAIL_VERIFICATION_CODE_URL = () => `${API_DOMAIN}/auth/confirm-email-verification`;

export const checkValidateCode = async (requestBody: checkVerificationCodeRequestDto) => {
    const result = await axios.post(CONFIRM_EMAIL_VERIFICATION_CODE_URL(), requestBody)
    .then(response => {
        const responseBody: checkVerificationCodeResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

const USERNAME_CHECK_URL = () => `${API_DOMAIN}/auth/username-check`;

export const usernameCheck = async (requestBody: usernameCheckRequestDto) => {
    const result = await axios.post(USERNAME_CHECK_URL(), requestBody)
    .then(response => {
        const responseBody: usernameCheckResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

export const GOOGLE_SIGN_IN_URL = () => `${API_DOMAIN}/auth/oauth2/google`;

export const AUTH_CHANGE_USERNAME_URL = () => `${API_DOMAIN}/auth/change-username`;

export const changeUsername = async (requestBody: ChangeUsernameRequestDto) => {
    const result = await axios.patch(AUTH_CHANGE_USERNAME_URL(), requestBody)
    .then(response => {
        const responseBody: ChangeUsernameResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}