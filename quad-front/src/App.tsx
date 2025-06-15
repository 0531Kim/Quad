import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Main from 'views/Main';
import Authentication from 'views/Authentication';
import OAuth from 'views/OAuth';
// import UserP from 'views/User';
// import Container from 'layouts/Container';
import { useLoginUserStore } from 'stores';
import { AUTH_PATH, COURSE_PATH, FACULTY_PATH, FACULTY_PATH_WITH_CODE, MAIN_PATH, OAUTH_PATH, STUDY_PATH, USER_PATH } from 'constant';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'apis/response';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { getLikedReviewIndexList, getSignInUserRequest } from 'apis';
import { User } from 'types/interface';
import Main from 'views/Main';
import Container from 'layouts/Container';
import ReviewView from 'views/Review';
import FacultyView from 'views/Faculty';
import StudyView from 'views/Study';
import UserView from 'views/User';
import GetLikedReviewIndexListResponseDto from 'apis/response/review/get-liked-review-index-list.response.dto';
import useLikedReviewStore from 'stores/liked-review.store';

// app renders twice.
//      Component: Application component      //
function App() {
  //        state: sign in user global state        //
  const{setLoginUser, resetLoginUser} = useLoginUserStore();

  //        state: cookie state       //
  const[cookies, setCookie] = useCookies();

  //        function: get sign in response handle function          //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) =>{
    if(!responseBody) return;
    const{code} = responseBody;
    if(code === 'AF' || code === 'NE' || code === 'DBE'){
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);
  }

  //        function: get liked review index list response handle function          //
  const getLikedReviewIndexListResponse = (responseBody: GetLikedReviewIndexListResponseDto | ResponseDto | null) => {
    if(!responseBody) return;
    const { code } = responseBody;
    if(code === 'DBE') alert('Database Error!');
    if(code !== 'SU') return;

    const { likedReviewIndexList } = responseBody as GetLikedReviewIndexListResponseDto;
    useLikedReviewStore.getState().setLikedReviewIndexList(likedReviewIndexList);
  }

  //        effect: runs when accessToken cookie changes        //
  useEffect(() => {
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  //        effect: runs when user is logged in        //
  useEffect(() => {
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    getLikedReviewIndexList(cookies.accessToken).then(getLikedReviewIndexListResponse);
  }, [cookies.accessToken]);

  //      render:rendering Application component      //
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={OAUTH_PATH()} element={<OAuth />} />
        <Route path={FACULTY_PATH()} element={<FacultyView />} />
        <Route path={FACULTY_PATH_WITH_CODE(":facultyName")} element={<FacultyView />} />
        <Route path={STUDY_PATH(":faculty",":studyCode")} element={<StudyView />} />
        <Route path={COURSE_PATH(":faculty",":studyCode",":courseCode")} element={<ReviewView />} />
        <Route path={USER_PATH(":userEmail")} element={<UserView />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
