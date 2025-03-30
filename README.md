## 📘 Quad – UoA Course Review Platform

Quad is a course review platform built for University of Auckland students to share and explore real feedback on university courses. It aims to bridge the information gap students face during enrollment by providing insights beyond just course titles and brief descriptions.

## 🎯 Purpose

 During the enrollment process, students often make decisions with limited knowledge about courses. Quad empowers students to make smarter, data-driven choices by giving them access to:
  - Honest student reviews
  - Course ratings
  - Aggregated statistics and review charts

## 🛠️ Tech Stack

 **Frontend:**  
  - React (v19.0.0)  
  - TypeScript (v5.7.2)
  - Zustand (v5.0.3)  
  - Axios (v1.8.3)

  **Backend:**  
  - Java (v17.0.11)  
  - Spring Boot (v3.4.3)  
  - JPA (Hibernate)  
  - OAuth 2.0
  - Lombok (v1.18.36)

  **Database:**
    - MySQL (v9.2.0)

## 🚏 API Endpoints (Work in Progress)

 **Auth**
  - SIGN IN : POST /api/v1/auth/sign-in
  - SIGN UP : POST /api/v1/auth/sign-up
  - DUPLICATED USERNAME CHECK : POST /api/v1/auth/username-check
  - EMAIL VERIFICATION : POST /api/v1/auth/email-verification
  - CONFIRM EMAIL VERIFICATION : POST /api/v1/auth/confirm-email-verification

 **REVIEW** (Work in Progress)
  - LATEST REVIEW LIST : GET /api/v1/review/latest
  - TRENDING REVIEW LIST : GET /api/v1/review/trending
  - SEARCH REVIEW LIST : GET /api/v1/review/search/{searchWord}
  - USER REVIEW LIST : GET /api/v1/review/user-review-list/{email}
  - REVIEW LIST FOR SPECIFIC COURSE : GET /api/v1/review/{courseId}
  - COMMENT LIST : GET /api/v1/review/{reviewNumber}/comment-list
  - WRITE REVIEW : POST /api/v1/review
  - WRITE COMMENT : POST /api/v1/review/{reviewNumber}/comment
  - EDIT REVIEW : PATCH /api/v1/review/{reviewNumber}
  - LIKE FEATURE : PUT /api/v1/review/{reviewNumber}/like
  - DELETE REVIEW : POST /api/v1/review/{reviewNumber}

 **USER** (Work in Progress)
  - USER INFORMATION : GET /api/v1/user/{username}
  - LOGIN USER INFORMATION : GET /api/v1/user/{userId}

## 🔒 Authentication

Quad supports two sign-in methods:
  - JWT Bearer Token Authentication — Users sign in with email and password to receive a JWT
  - Google OAuth Sign-In — for users who prefer not to store credentials on the Quad server

