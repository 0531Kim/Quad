import React, { useState, KeyboardEvent, useRef, ChangeEvent, useEffect } from 'react'
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto, SignUpRequestDto, emailVerificationRequestDto, checkVerificationCodeRequestDto, usernameCheckRequestDto } from 'apis/request/auth';
 import { changeUsername, checkValidateCode, GOOGLE_SIGN_IN_URL, sendEmailVerificationCode, signInRequest, signUpRequest, usernameCheck } from 'apis';
import { checkVerificationCodeResponseDto, EmailVerificationCodeResponseDto, SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate, useParams } from 'react-router-dom';
import usernameCheckResponseDto from 'apis/response/auth/username-check-response.dto';
import { ChangeUsernameRequestDto } from 'apis/request/user';
import { ChangeUsernameResponseDto } from 'apis/response/user';

//          component: authentication page component            //
export default function OAuth() {

  //          state: display state        //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-up');

  //          state: cookie state         //
  const [cookies, setCookie] = useCookies();

  //          function: navigate function         //
  const navigate = useNavigate();

  //          component: sign up card component           //
  const SignUpCard = () => {

    //          state: ref        //
    const usernameRef = useRef<HTMLInputElement | null>(null);

    //          state: usestate         //
    const[page, setPage] = useState<1 | 2>(2);
    const[username, setUsername] = useState<string>('');
    const[hasNavigated, setHasNavigated] = useState<boolean>(false);

    //          state: blue box           //
    const[usernameBlueBox, setUsernameBlueBox] = useState<boolean>(false);


    //          state: no edit        //
    const[emailNoEdit, setEmailNoEdit] = useState<boolean>(false);
    const[verificationCodeNoEdit, setVerificationCodeNoEdit] = useState<boolean>(false);

    //          state: isVerified         //
    const[isVerified, setIsVerified] = useState<boolean>(false);

    //          state: notification state         //
    const[isUsernameError, setUsernameError] = useState<boolean>(false);
    const[usernameValidationRedNotification, setUsernameValidationRedNotification] = useState<boolean>(false);
    const[usernameValidationBlueNotification, setUsernameValidationBlueNotification] = useState<boolean>(false);


    //          state: notification message           //
    const[isUsernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
    const[usernameValidationRedMessage, setUsernameValidationRedMessage] = useState<string>('');
    const[usernameValidationBlueMessage, setUsernameValidationBlueMessage] = useState<string>('');

    //            function: Username check response           //
    const UsernameCheckResponse = (responseBody: usernameCheckResponseDto | ResponseDto | null) => {
      if(!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const {code} = responseBody;

      if(code === 'DN'){
        setUsernameValidationRedNotification(true);
        setUsernameValidationRedMessage("That username is already taken.");
      }

      if(code === 'DBE') alert('Database error occurred.');

      if(code !== 'SU')return;

      setUsernameBlueBox(true);
      setUsernameValidationBlueNotification(true);
      setUsernameValidationBlueMessage("This username is available!");
      setIsVerified(true);
    }

    //          function: Sign up request             //
    const ChangeUsernameResponse = (responseBody: ChangeUsernameResponseDto | ResponseDto | null) => {
      if(!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const {code} = responseBody;
      if(code === 'DBE') alert('Database error occurred.');

      if(code !== 'SU')return;

      const now = Date.now();
      const expires = new Date(now + Number(expirationTime) * 1000);

      setCookie('accessToken', token, { expires, path: MAIN_PATH() });
      navigate(MAIN_PATH());
    }

    //          event Handler : change handler        //
    const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setUsername(value);
      setUsernameError(false);
      setUsernameErrorMessage('');
      setUsernameBlueBox(false);
      setUsernameValidationBlueNotification(false);
      setUsernameValidationBlueMessage('');
      setIsVerified(false);
    }

    const { token, expirationTime, tempUsername } = useParams();

    //          event handler : sign in button        //
    const onSignUpButtonClickHandler = () => {
      if (!isVerified) return;
      if (!expirationTime || !token) return;

      const newUsername: string = username;
      const requestBody: ChangeUsernameRequestDto = {
        tempUsername: tempUsername as string,
        newUsername
      };

      changeUsername(requestBody).then(ChangeUsernameResponse);
};

    //          event handler: username key down event handler         //
    const onUsernameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
    }

    //          event handler: onUsernameValidationButtonClickHandler         //
    const onUsernameValidationButtonClickHandler = () => {

      setUsernameBlueBox(false);
      setUsernameValidationBlueNotification(false);
      setUsernameValidationBlueMessage('');
      setUsernameValidationRedNotification(false);
      setUsernameValidationRedMessage('');
      setIsVerified(false);


      const usernamePattern = /^[a-zA-Z0-9_]{4,14}$/;
      const isUsernameValid = usernamePattern.test(username);

      if(!isUsernameValid){
        setUsernameValidationRedNotification(true);
        setUsernameValidationRedMessage('Username must be 4–14 characters and can only include letters and underscores.');
        return;
      }

      const requestBody: usernameCheckRequestDto = {username};
      usernameCheck(requestBody).then(UsernameCheckResponse);
    }
    
    //          effect: page change effect          //
    useEffect(() => {
      if(page == 2){
        if(!usernameRef.current) return;
        usernameRef.current.focus();
      }
    }, [page])

    //          effect: navigate to main           //
    useEffect(() => {
      const isNavigated = sessionStorage.getItem('hasNavigated');
      if (isNavigated === 'true') return;

      if (!token || !expirationTime) return;
      console.log(tempUsername);
      console.log(tempUsername === undefined);
      if (tempUsername === undefined) {

        const now = Date.now();
        const expires = new Date(now + Number(expirationTime) * 1000);

        setCookie('accessToken', token, { expires, path: MAIN_PATH() });

        sessionStorage.setItem('hasNavigated', 'true');
        navigate(MAIN_PATH());
      }
    }, [])
    

    //          render: sign up card component rendering        //
    return (
      <div className ='auth-card'>
        <div className ='auth-card-box'>
          <div className ='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Sign up'}</div>
            </div>
            <div className = 'oauth-message-box'>
              <div className='oauth-message'>Your Google account has been verified!</div>
              <div className='oauth-message'>Please set up your username.</div>
            </div>
              <InputBox ref={usernameRef} label='Username' type='text' placeholder='Create your username' value={username} 
              onChange={onUsernameChangeHandler} 
              notification={usernameValidationRedNotification || usernameValidationBlueNotification} 
              notificationMessage={usernameValidationRedMessage || usernameValidationBlueMessage} 
              onKeyDown={onUsernameKeyDownHandler}
              onValidButtonClick={onUsernameValidationButtonClickHandler} 
                
              buttonTitle= "Validate"
              blueBox={usernameBlueBox}
              />
          </div>
          <div className ='auth-card-bottom'>
            {
              !isVerified ? (<div className='green-empty-large-full-button' onClick={onSignUpButtonClickHandler}>{'Sign Up'}</div>)
                           : (<div className='green-large-full-button' onClick={onSignUpButtonClickHandler}>{'Sign Up'}</div>)
            }
          </div>
        </div>
      </div>
    )
  }

  //          render: render authentication component         //
  return (
    <div id='auth-wrapper'>
      <div className = 'auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            {/* <div className='auth-logo-icon'></div> */}
            <div className ='icon-box' style={{'width': '68px', 'height': '64px'}}>
              <div className ='icon quad-logo-green'></div>
            </div>
            <div className='auth-jumbotron-textbox'>
              <div className='auth-jumbotron-text'>{'Quad shares informative and exclusive lecture reviews strictly related to the University of Auckland.'}</div>
              {/* <div className='auth-jumbotron-text'>{'Know before you enroll'}</div> */}
            </div>
          </div>
        </div>
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
