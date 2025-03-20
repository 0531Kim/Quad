import React from 'react';
import './App.css';
import InputBox from 'components/InputBox';


const onValidButtonClickHandler = () => {

}
function App() {
  return (
    <>
      {/* <InputBox
    label="Username"
    type="text"
    onChange={(e) => console.log(e.target.value)}  
    placeholder="Enter your username"
    value=""
    error={false}
    message="never"
    buttonTitle="Validate"
    onValidButtonClick={onValidButtonClickHandler}
      /> */}
      <div className='google-sign-in'></div>
    </>
  );
}

export default App;
