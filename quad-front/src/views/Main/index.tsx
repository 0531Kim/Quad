import SidebarBox from 'components/SideBar';
import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import BarChart from 'components/Chart'
import Example from 'components/Chart';
import CustomBarChart from 'components/Chart';
import ContentCard from 'components/ContentCard';

export default function Main() {
  
  //      function: navigate        //
  const navigate = useNavigate();
  
  //      Component: Hightlight content       //
  const HighLightContent = () => {

    //         state: title        //
    const[title, setTitle] = useState<string>('Trending Reviews');
    const[starCount, setStarCount] = useState<number>(3.5);

    function StarRating({ starCount } : { starCount: number }) {
      const stars = Array.from({ length: 5 }, (_, idx) => {
          const position = idx + 1;
  
          let overlayClass = null;
  
          if (starCount >= position - 0.25) {
              overlayClass = 'star';
          } else if (starCount >= position - 0.75) {
              overlayClass = 'half-star';
          }
  
          return (
              <div key={idx} className="star-wrapper">
                  <div className="empty-star"></div>
                  {overlayClass && <div className={overlayClass}></div>}
              </div>
          );
      });
  
      return <div className="content-rate">{stars}</div>;
  }

    return(
      <div className='high-light-content'>
        <div className='high-light-content-top'>
          {title}
        </div>
        <div className='high-light-content-bot'>
          <div className='contentCard'>
            <div className='content-card-top'>
                <div className='content-course-name'>COMPSCI 220</div>
                  <StarRating starCount={starCount} />
                <div className='content-card-time'>
                    <div className='content-card-time'>31min</div>
                    <div className='content-card-time-text'>ago</div>
                </div>
            </div>
            <div className='content-card-bot'>
                <div className='content-card-content'>contents random contents</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            <HighLightContent />
            <HighLightContent />
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