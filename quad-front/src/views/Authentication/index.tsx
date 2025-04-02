import React, { useState, KeyboardEvent, useRef, ChangeEvent, useEffect } from 'react'
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto, SignUpRequestDto, emailVerificationRequestDto, checkVerificationCodeRequestDto, usernameCheckRequestDto } from 'apis/request/auth';
 import { checkValidateCode, GOOGLE_SIGN_IN_URL, sendEmailVerificationCode, signInRequest, signUpRequest, usernameCheck } from 'apis';
import { checkVerificationCodeResponseDto, EmailVerificationCodeResponseDto, SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import usernameCheckResponseDto from 'apis/response/auth/username-check-response.dto';

//          component: authentication page component            //
export default function Authentication() {

  //          state: display state        //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

  //          state: cookie state         //
  const [cookies, setCookie] = useCookies();

  //          function: navigate function         //
  const navigate = useNavigate();

  //          component: sign in card component           //
  const SignInCard = () => {
    //          state: email component reference state          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: password component reference state          //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //          state: email state          //
    const [email, setEmail] = useState<string>('');
    //          state: password state         //
    const [password, setPassword] = useState<string>('');
    //          state: password type state        //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    //          state: error state          //
    const [error, setError] = useState<boolean>(false);
    //          state: password btn icon state          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

    //          function: sign In Response handler function           //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if (!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const { code } = responseBody;
      if(code === 'DBE') alert('Database error occurred.');
      if(code === 'VF' || code === 'SF') setError(true);
      if(code !== 'SU') return;

      const {token, expirationTime} = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      setCookie('accessToken', token, {expires, path: MAIN_PATH()});
      navigate(MAIN_PATH());
    }

    //          event handler: changing input event           //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setEmail(value);
    }

    //          event handler: changing input event           //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setPassword(value);
    }

    //          event handler: login button click event handler         //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    }

    //          event handler: google button click         //
    const onGoogleButtonClickHandler = () => {
      window.location.href = GOOGLE_SIGN_IN_URL();
    }

    //          event handler: sign up link click event handler         //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up');
    }

    //          event handler: password button click event handler          //
    const onPasswordButtonClickHandler = () => {
      if(passwordType === 'text'){
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon');
      }else{
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
      }
    }

    //          event handler: email input key down event handler          //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }

    //          event handler: password input key down event handler          //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }

    //          render: sign in card component rendering        //
    return (
      <div className ='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Sign in'}</div>
            </div>
            {/* <div className='google-oauth-box'>
              <div className='google-oauth-button'>
                <div className='google-icon'>
                  <div className='google-logo'></div>
                </div>
                <div className='google-text'>Sign in with google</div>
              </div>
            </div> */}
            <InputBox ref={emailRef} label='Email' type='text' placeholder='Please enter your email address.' notification={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='Please enter your password.' notification={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onIconButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error && 
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>
                  {'You have entered an incorrect email address or password. \nPlease check your input and try again.'}
                </div>
              </div>
            }
            <div className='green-large-full-button' onClick={onSignInButtonClickHandler}>{'Sign in'}</div>
            <div className='google-oauth-button' onClick={onGoogleButtonClickHandler}>
                <div className='google-icon'>
                  <div className='google-logo'></div>
                </div>
                <div className='google-text'>Sign in with google</div>
              </div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'New here? '}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'Sign up'}</span><span className='auth-description'>{' now!'}</span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //          component: sign up card component           //
  const SignUpCard = () => {

    //          state: ref        //
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const validationNumberRef = useRef<HTMLInputElement | null>(null);


    //          state: usestate         //
    const[page, setPage] = useState<1 | 2>(1);
    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const[passwordCheck, setPasswordCheck] = useState<string>('');
    const[passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    const[passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');
    const[username, setUsername] = useState<string>('');
    const[agreedPersonal, setAgreedPersonal] = useState<boolean>(false);
    const[verificationCode, setValidationNumber] = useState<string>('');


    //          state: blue box           //
    const[emailBlueBox, setEmailBlueBox] = useState<boolean>(false);
    const[verificationCodeBlueBox, setVerificationCodeBlueBox] = useState<boolean>(false);
    const[usernameBlueBox, setUsernameBlueBox] = useState<boolean>(false);


    //          state: no edit        //
    const[emailNoEdit, setEmailNoEdit] = useState<boolean>(false);
    const[verificationCodeNoEdit, setVerificationCodeNoEdit] = useState<boolean>(false);

    //          state: isVerified         //
    const[isVerified, setIsVerified] = useState<boolean>(false);

    //          state: notification state         //
    const[emailBoxRedNotification, setEmailBoxRedNotification] = useState<boolean>(false);
    const[emailBoxBlueNotification, setEmailBoxBlueNotification] = useState<boolean>(false);
    const[verificationCodeBoxBlueNotification, setVerificationCodeBoxBlueNotification] = useState<boolean>(false);
    const[isPasswordError, setPasswordError] = useState<boolean>(false);
    const[isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
    const[isUsernameError, setUsernameError] = useState<boolean>(false);
    const[isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);
    const[verificationCodeBoxRedNotification, setVerificationCodeBoxRedNotification] = useState<boolean>(false);
    const[usernameValidationRedNotification, setUsernameValidationRedNotification] = useState<boolean>(false);
    const[usernameValidationBlueNotification, setUsernameValidationBlueNotification] = useState<boolean>(false);


    //          state: notification message           //
    const[emailBoxRedMessage, setEmailBoxRedMessage] = useState<string>('');
    const[emailBoxBlueMessage, setEmailBoxBlueMessage] = useState<string>('');
    const[verificationCodeBoxBlueMessage, setverificationCodeBoxBlueMessage] = useState<string>('');
    const[passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const[passwordverificationCodeBoxBlueMessage, setPasswordverificationCodeBoxBlueMessage] = useState<string>('');
    const[isUsernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
    const[verificationCodeBoxRedMessage, setVerificationCodeBoxRedMessage] = useState<string>('');
    const[usernameValidationRedMessage, setUsernameValidationRedMessage] = useState<string>('');
    const[usernameValidationBlueMessage, setUsernameValidationBlueMessage] = useState<string>('');

    //          state: icon state         //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');


    //          function: sign up Response          //
    const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
      if(!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const {code} = responseBody;
      if(code === 'DE'){
        setEmailBoxRedNotification(true);
        setEmailBoxRedMessage('This email is already in use.');
      }
      if(code === 'DU'){
        setUsernameError(true);
        setUsernameErrorMessage('This username is already in use.');
      }

      if(code === 'VF') alert('Please enter all required fields.');
      if(code === 'DBE') alert('Database error occurred.');

      if(code !== 'SU')return;

      setView('sign-in');
    }

    //          function: email verification response          //
    const emailVerificationResponse = (responseBody: EmailVerificationCodeResponseDto | ResponseDto | null) => {
      if(!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const {code} = responseBody;
      if(code === 'DE'){
        setEmailNoEdit(false);
        setEmailBlueBox(false);
        setEmailBoxBlueNotification(false);
        setEmailBoxBlueMessage('');
        setEmailBoxRedNotification(true);
        setEmailBoxRedMessage('This email is already in use.');
      }

      if(code === 'EVF'){
        setEmailNoEdit(false);
        setEmailBlueBox(false);
        setEmailBoxBlueNotification(false);
        setEmailBoxBlueMessage('');
        setEmailBoxRedNotification(true);
        setEmailBoxRedMessage('Failed to send verification email. Please try again.');
      }
      
      if(code === 'DBE') alert('Database error occurred.');

      if(code !== 'SU')return;

    }

    //          function: Validate number response          //
    const ValidateNumberResponse = (responseBody: checkVerificationCodeResponseDto | ResponseDto | null) => {
      if(!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const {code} = responseBody;

      if(code === 'VF'){
        setVerificationCodeBoxRedNotification(true);
        setVerificationCodeBoxRedMessage("The verification code you entered is incorrect.");
      }

      if(code === 'EVF'){
        setVerificationCodeBoxRedNotification(true);
        setVerificationCodeBoxRedMessage("The verification code you entered is incorrect.");
      }

      if(code === 'DBE') alert('Database error occurred.');

      if(code !== 'SU')return;

      setVerificationCodeBlueBox(true);
      setVerificationCodeBoxBlueNotification(true);
      setverificationCodeBoxBlueMessage("Your email has been successfully verified.");
      setIsVerified(true);
      setVerificationCodeNoEdit(true);
    }

    //            function: Username check response           //
    const UsernameCheckResponse = (responseBody: usernameCheckResponseDto | ResponseDto | null) => {
      if(!responseBody){
        alert('Network error: Please check your internet connection and try again.');
        return;
      }
      const {code} = responseBody;

      if(code === 'DU'){
        setUsernameValidationRedNotification(true);
        setUsernameValidationRedMessage("That username is already taken.");
      }

      if(code === 'DBE') alert('Database error occurred.');

      if(code !== 'SU')return;

      setUsernameBlueBox(true);
      setUsernameValidationBlueNotification(true);
      setUsernameValidationBlueMessage("This username is available!");
    }

    //          event Handler : change handler        //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setEmail(value);
      setEmailBoxRedNotification(false);
      setEmailBoxRedMessage('');
      setEmailBoxBlueMessage('');
    }
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordverificationCodeBoxBlueMessage('');
    }
    const onUsernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setUsername(value);
      setUsernameError(false);
      setUsernameErrorMessage('');
      setUsernameBlueBox(false);
      setUsernameValidationBlueNotification(false);
      setUsernameValidationBlueMessage('');
    }
    const onValidationNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setValidationNumber(value);
      setVerificationCodeBoxRedNotification(false);
      setVerificationCodeBoxRedMessage('');
    }

    //            event handler : agreed personal click handler         //
    const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal);
      setAgreedPersonalError(false);
    }

    //            event handler : password icon click handler         //
    const onPasswordButtonClickHandler = () => {
      if(passwordButtonIcon === 'eye-light-off-icon'){
        setPasswordButtonIcon('eye-light-on-icon');
        setPasswordType('text');
      }else{
        setPasswordButtonIcon('eye-light-off-icon');
        setPasswordType('password');
      }
    }

    //            event handler : password check click handler         //
    const onPasswordCheckButtonClickHandler = () => {
      if(passwordCheckButtonIcon === 'eye-light-off-icon'){
        setPasswordCheckButtonIcon('eye-light-on-icon');
        setPasswordCheckType('text');
      }else{
        setPasswordCheckButtonIcon('eye-light-off-icon');
        setPasswordCheckType('password');
      }
    }
    //            event handler : next btn click handler         //
    const onNextButtonClickHandler = () => {

      // if(!isVerified) return;
      setPage(2);
    
    }
    //          event handler: sign in btn click handler          //
    const onSignUpButtonClickHandler = () => {

      const isCheckedPassword = password.trim().length > 8;
      if(!isCheckedPassword){
        setPasswordError(true);
        setPasswordErrorMessage("Password must contain at least 8 characters.");
      }
      const isEqualPassword = password === passwordCheck;
      if(!isEqualPassword){
        setPasswordCheckError(true);
        setPasswordverificationCodeBoxBlueMessage('Make sure both passwords are the same.');
      }
      if(!isCheckedPassword || !isEqualPassword){
        return;
      }

      const hasUsername = username.trim().length > 0;
      if(!hasUsername){
        setUsernameError(true);
        setUsernameErrorMessage('Please enter your username.');
      }

      if(!agreedPersonal)setAgreedPersonalError(true);

      if(!hasUsername || !agreedPersonal) return;

      const requestBody: SignUpRequestDto = {
        email, password, username
      };

      signUpRequest(requestBody).then(signUpResponse);
    }
    //          event handler: login link click handler         //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
    }


    //          event handler: email key down handler         //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }
    //          event handler: password key down event handler         //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      if(!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }
    //          event handler: password check key down event handler         //
    const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      onNextButtonClickHandler();
    }
    //          event handler: username key down event handler         //
    const onUsernameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
    }

    //          event handler: validate email button click event handler          //
    const onValidateEmailButtonClickHandler = () =>{

      setEmailBoxRedNotification(false);
      setEmailBoxRedMessage('');
      setEmailBlueBox(false);
      setEmailBoxBlueNotification(false);
      setEmailBoxBlueMessage('');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailPattern = emailPattern.test(email);
      if(!isEmailPattern){
        setEmailBoxRedNotification(true);
        setEmailBoxRedMessage("Please enter a valid Email.");
        return;
      }else{
        setEmailNoEdit(true);

        setEmailBlueBox(true);
        setEmailBoxBlueNotification(true);
        setEmailBoxBlueMessage("A verification code has been sent to your email.");
      }
      const requestBody: emailVerificationRequestDto = {email};
      sendEmailVerificationCode(requestBody).then(emailVerificationResponse);
    }

    //          event handler: validate number button click event handler          //
    const onVerificationCodeButtonClickHandler = () =>{

      setVerificationCodeBoxRedNotification(false);
      setVerificationCodeBoxRedMessage('');
      setVerificationCodeBlueBox(false);
      setVerificationCodeBoxBlueNotification(false);
      setverificationCodeBoxBlueMessage('');
      setIsVerified(false);

      const requestBody: checkVerificationCodeRequestDto = {email, verificationCode};
      checkValidateCode(requestBody).then(ValidateNumberResponse);
    }

    //          event handler: onUsernameValidationButtonClickHandler         //
    const onUsernameValidationButtonClickHandler = () => {

      setUsernameBlueBox(false);
      setUsernameValidationBlueNotification(false);
      setUsernameValidationBlueMessage('');
      setUsernameValidationRedNotification(false);
      setUsernameValidationRedMessage('');


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

    //          render: sign up card component rendering        //
    return (
      <div className ='auth-card'>
        <div className ='auth-card-box'>
          <div className ='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Sign up'}</div>
              <div className='auth-card-page'>{`${page}/2`}</div>
            </div>
            {page === 1 &&(
              <>
                <InputBox ref={emailRef} 
                label='Email' 
                type='text' 
                placeholder='Please enter your email' 
                value={email} 
                onChange={onEmailChangeHandler} 

                notification={emailBoxRedNotification || emailBoxBlueNotification} 
                notificationMessage={emailBoxRedMessage || emailBoxBlueMessage} 

                onKeyDown={onEmailKeyDownHandler} 
                onValidButtonClick={onValidateEmailButtonClickHandler} 

                buttonTitle = "Verify Email" 
                blueBox={emailBlueBox}
                
                readOnly={emailNoEdit}
                />

                <InputBox 
                ref={validationNumberRef} 
                label='Verification Code' 
                type='text' 
                placeholder='Please enter your validation Number' 
                value={verificationCode}  
                onChange={onValidationNumberChangeHandler} 

                notification={verificationCodeBoxRedNotification || verificationCodeBoxBlueNotification} 
                notificationMessage={verificationCodeBoxRedMessage || verificationCodeBoxBlueMessage} 

                onValidButtonClick={onVerificationCodeButtonClickHandler} 

                buttonTitle = "Verify code" 
                blueBox={verificationCodeBlueBox}
                
                readOnly={verificationCodeNoEdit}
                />
              </>
            )}
            {page === 2 &&(
              <>
                <InputBox ref={usernameRef} label='Username' type='text' placeholder='Create your username' value={username} 
                onChange={onUsernameChangeHandler} 
                notification={usernameValidationRedNotification || usernameValidationBlueNotification} 
                notificationMessage={usernameValidationRedMessage || usernameValidationBlueMessage} 
                onKeyDown={onUsernameKeyDownHandler}
                onValidButtonClick={onUsernameValidationButtonClickHandler} 
                
                buttonTitle= "Validate"
                blueBox={usernameBlueBox}
                />
                
                <InputBox ref={passwordRef} label='Password' type={passwordType} placeholder='Please enter your password' value={password} 
                onChange={onPasswordChangeHandler} 
                notification={isPasswordError} 
                notificationMessage={passwordErrorMessage} 
                icon={passwordButtonIcon} 
                onIconButtonClick={onPasswordButtonClickHandler} 
                onKeyDown={onPasswordKeyDownHandler}/>
                
                <InputBox ref={passwordCheckRef} label='Confirm Password' type={passwordCheckType} placeholder='Please re-enter your password' value={passwordCheck} 
                onChange={onPasswordCheckChangeHandler} 
                notification={isPasswordCheckError} 
                notificationMessage={passwordverificationCodeBoxBlueMessage} 
                icon={passwordCheckButtonIcon} 
                onIconButtonClick={onPasswordCheckButtonClickHandler} 
                onKeyDown={onPasswordCheckKeyDownHandler}/>
              </>
            )}
          </div>
          <div className ='auth-card-bottom'>
            {page === 1 &&(
              !isVerified ? (<div className='green-empty-large-full-button' onClick={onNextButtonClickHandler}>{'Next step'}</div>)
                           : (<div className='green-large-full-button' onClick={onNextButtonClickHandler}>{'Next step'}</div>)
            )}
            {page === 2 &&(
              <>
              <div className='auth-consent-box'>
                <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                  <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>
                </div>
                <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'Agree to the Privacy Policy'}</div>
                <div className='auth-consent-link'>{'Read more >'}</div>
              </div>
              <div className='green-large-full-button' onClick={onSignUpButtonClickHandler}>{'Sign Up'}</div>
              </>
            )}
            <div className='auth-description-box'>
              <div className='auth-description'>{'Do you already have an account? '}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'Sign in'}</span></div>
            </div>
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
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
