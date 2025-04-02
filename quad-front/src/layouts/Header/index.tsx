import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH, USER_PATH, SEARCH_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
import { ResponseDto } from 'apis/response';


//          Component: header layout component         //
export default function Header() {

  //          state: login user state         //
  const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

  //          state: path state         //
  const { pathname } = useLocation();

  //          state: cookie state           //
  const [cookies, setCookie] = useCookies();

  //          state: login state            //
  const [isLogin, setLogin] = useState<boolean>(false);

  //          state: auth page state          //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);

  //          state: main page state          //
  const [isMainPage, setMainPage] = useState<boolean>(false);

  //          state: search page state          //
  const [isSearchPage, setSearchPage] = useState<boolean>(false);

  //          state: board detail page state          //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);

  //          state: board write page state          //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);

  //          state: board edit page state          //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);

  //          state: user page state          //
  const [isUserPage, setUserPage] = useState<boolean>(false);

  
  //          function: navigate function           //
  const navigate = useNavigate();

  //          event Handler: logo click event Handler          //
  const  onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //        component: search btn component           //
  const SearchButton = () => {

    //          state: search btn reference state          //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);

    //          state: search btn state             //
    const [status, setStatus] = useState<boolean>(false);

    //          state: search word state            //
    const [word, setWord] = useState<string>('');

    //          state: search path variable state       //
    const { searchWord } = useParams();

    //        event Handler: search word change event handle function          //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const value = event.target.value;
      setWord(value);
    } 

    //        event Handler: search word key event handle function          //
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };

    //        event Handler: search icon click event handle function          //
    const onSearchButtonClickHandler = () => {
      if(!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    }

    //        effect: setting search word variable function           //
    useEffect(() => {
      if(searchWord) 
        setWord(searchWord);
        setStatus(true);
    }, [searchWord]);
    if(!status)
    //        render:  search btn component render(click false state)            //
    return (
        <div className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
    );
    //        render:  search btn component render(click true state)            //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='Enter keywords.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  }
  
  //        component: login or mypage btn component           //
  const MyPageButton = () => {

    //        state: userEmail path variable state          //
    const { userEmail } = useParams();

    //        event Handler: Mypage btn click event handler         //
    const onMyPageButtonClickHandler = () =>{
      if(!loginUser)return;
      const{email} = loginUser;
      navigate(USER_PATH(email));
    }

    //        event Handler: Sign out btn click event handler         //
    const onSignOutButtonClickHandler = () =>{
      resetLoginUser();
      setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() });
      navigate(MAIN_PATH());
    }

    //        event Handler: Mypage btn click event handler         //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    }

    //        render: sign out btn component rendering        //
    if(isLogin && userEmail === loginUser?.email)
    return(<div className = 'white-button' onClick={onSignOutButtonClickHandler}>{'Sign out'}</div>);
    //        render: Mypage btn component rendering         //
    if(isLogin)
    return(<div className = 'black-button quad-green-background' onClick={onMyPageButtonClickHandler}>{'My Profile'}</div>);
    //        render: Login btn component rendering         //
    return(<div className = 'black-button quad-green-background' onClick={onSignInButtonClickHandler}>{'Sign in'}</div>);
  };

  //          effect: runs when path changes            //

  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);
  }, [pathname]);

  //        effect: runs when login user changes        //
  useEffect(() => {
    setLogin(loginUser !== null);
  },[loginUser]);

  //          render: header layout rendering         //
  return (
    <div id = 'header'>
      {!isAuthPage && 
        <div className = 'header-container'>
            <div className ='header-left-box' onClick={onLogoClickHandler}>
                <div className ='icon-box' style={{'width': '34px', 'height': '32px'}}>
                    <div className ='icon quad-logo-green'></div>
                </div>
                <div className ='header-logo'>{'QUAD'}</div>
            </div>
            <div className ='header-right-box'>
              {(isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
              {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton />}
            </div>
        </div>
      }
    </div>
  )
}
