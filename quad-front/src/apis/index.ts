import axios from "axios";
import { emailVerificationRequestDto, SignInRequestDto, SignUpRequestDto, checkVerificationCodeRequestDto, usernameCheckRequestDto } from "./request/auth";
import { EmailVerificationCodeResponseDto, SignInResponseDto, SignUpResponseDto, checkVerificationCodeResponseDto } from "./response/auth";
import { ChangeUsernameResponseDto, GetSignInUserResponseDto } from "./response/user";
import { ResponseDto } from "./response";
import usernameCheckResponseDto from "./response/auth/username-check-response.dto";
import { ChangeUsernameRequestDto } from "./request/user";
import getLatestReviewResponseDto from "./response/review/get-latest-review.response.dto";
import getTrendingReviewResponseDto from "./response/review/get-trending-review.response.dto";
import getAllFacultyReviewResponseDto from "./response/review/get-all-faculty-review.response.dto";
import getStudiesByFacultyResponseDto from "./response/review/get-studies-by-faculty.response.dto";
import getCourseReviewResponseDto from "./response/review/get-course-review.response.dto";
import getCourseReviewRequestDto from "./request/review/get-course-review.request.dto";

const DOMAIN = process.env.REACT_APP_API_DOMAIN!;
console.log('[DEBUG] DOMAIN:', DOMAIN);

const API_DOMAIN = `${DOMAIN}/api/v1`;
const authorization = (accessToken: string) => {
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

const CONFIRM_EMAIL_VERIFICATION_CODE_URL = () => `${API_DOMAIN}/auth/confirm-email-verification`;
const SEND_EMAIL_VERIFICATION_CODE_URL = () => `${API_DOMAIN}/auth/email-verification`;
const USERNAME_CHECK_URL = () => `${API_DOMAIN}/auth/username-check`;
export const GOOGLE_SIGN_IN_URL = () => `${API_DOMAIN}/auth/oauth2/google`;
export const AUTH_CHANGE_USERNAME_URL = () => `${API_DOMAIN}/auth/change-username`;

const GET_LATEST_REVIEW_LIST_URL = () => `${API_DOMAIN}/review/latest`;
const GET_TRENDING_REVIEW_LIST_URL = () => `${API_DOMAIN}/review/trending`;
const GET_ALL_FACULTY_REVIEW_LIST_URL = () => `${API_DOMAIN}/review/allFacultyReviews`;
const GET_STUDIES_BY_FACULTY_URL = () => `${API_DOMAIN}/review/allStudies`;
const GET_COURSES_BY_STUDY_URL = () => `${API_DOMAIN}/review/CoursesByStudy`;
const GET_COURSE_REVIEW_URL = (courseName: string) => `${API_DOMAIN}/review/getCourseReview/${courseName}`;

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

export const getLatestReviewRequest = async () => {
    const result = await axios.get(GET_LATEST_REVIEW_LIST_URL())
    .then(response => {
        const responseBody: getLatestReviewResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

export const getTrendingReviewRequest = async () => {
    const result = await axios.get(GET_TRENDING_REVIEW_LIST_URL())
    .then(response => {
        const responseBody: getTrendingReviewResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

export const getAllFacultyReview = async () => {
    const result = await axios.get(GET_ALL_FACULTY_REVIEW_LIST_URL())
    .then(response => {
        const responseBody: getAllFacultyReviewResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

export const getStudiesByFaculty = async () => {
    const result = await axios.get(GET_STUDIES_BY_FACULTY_URL())
    .then(response => {
        const responseBody: getStudiesByFacultyResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

export const getCoursesByStudy = async () => {
    const result = await axios.get(GET_COURSES_BY_STUDY_URL())
    .then(response => {
        const responseBody: getStudiesByFacultyResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}

export const getCourseReview = async (requestBody: getCourseReviewRequestDto) => {
    const url = GET_COURSE_REVIEW_URL(requestBody.courseName);
    console.log('Sending GET request to:', url);
    
    const result = await axios.get(GET_COURSE_REVIEW_URL(requestBody.courseName))
    .then(response => {
        const responseBody: getCourseReviewResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if(!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
}