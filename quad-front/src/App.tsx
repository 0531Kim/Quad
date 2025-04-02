import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Main from 'views/Main';
import Authentication from 'views/Authentication';
import OAuth from 'views/OAuth';
// import UserP from 'views/User';
// import Container from 'layouts/Container';
import { useLoginUserStore } from 'stores';
import { AUTH_PATH, MAIN_PATH, OAUTH_PATH, USER_PATH } from 'constant';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'apis/response';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { getSignInUserRequest } from 'apis';
import { User } from 'types/interface';
import Main from 'views/Main';
import Container from 'layouts/Container';

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

  //        effect: runs when accessToken cookie changes        //
  useEffect(() => {
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);

  //      render:rendering Application component      //
  //      description: main page: '/' - Main      //
  //      description: signin + signup: 'auth' - Authentication     //
  //      description: search page: '/search/:searchWord' - Search      //
  //      description: board page: '/board/detail/:boardNumber' - BoardDetail      //
  //      description: write board: '/board/write' - Boardwrite      //
  //      description: edit board: '/board/update/:boardNumber' - BoardUpdate      //
  //      description: user page: '/user/:email' - User     //
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={OAUTH_PATH()} element={<OAuth />} />
        {/* <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
        <Route path={USER_PATH(':userEmail')} element={<UserP />} /> */}
        {/* <Route path={BOARD_PATH()}>
          <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
        </Route> */}
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
