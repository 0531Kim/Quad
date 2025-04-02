import SidebarBox from 'components/SideBar';
import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import BarChart from 'components/Chart'
import Example from 'components/Chart';
import CustomBarChart from 'components/Chart';

export default function Main() {
  
  //      function: navigate        //
  const navigate = useNavigate();
  
  //      Component: Main-top       //
  const MainTop = () => {
    return(
      <>
        <div className="main-top-box">
          <div className="main-top-container">
            <div className="main-top-text1">Kia Ora! Whanau!</div>
            <div className="main-top-text2">Have an issue or found a bug? Let us know at no-reply@quadnz.com</div>
          </div>
        </div>
      </>
    )
  }
  //      Component: Main-sidebar       //
  const MainSideBar = () => {
    return(
      <>
        <SidebarBox />
      </>
    )
  }
  //      Component: Main-container       //
  const MainContainer = () => {
    return(
      <>
        <div className="main-container">
          <div className="main-container-graph">
            <CustomBarChart />
          </div>
          <div className="main-container-content">
          </div>
        </div>
      </>
    )
  }
  //      Component: Right-section        //
  const MainRight = () => {
    return(
      <>
        <div className="main-right"></div>
      </>
    )
  }
  return (
    <>
    <div className="main">
      <MainTop />
      <div className="main-bottom">
        <MainSideBar />
        <MainContainer />
        <MainRight />
      </div>
    </div>
    </>
  );
}