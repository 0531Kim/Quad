import SidebarBox from 'components/SideBar';
import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import CustomBarChart from 'components/Chart';
import HighLightContent from 'components/ReviewHighLight';
import { getLatestReviewRequest, getTrendingReviewRequest } from 'apis';
import getLatestReviewResponseDto from 'apis/response/review/get-latest-review.response.dto';
import { ResponseDto } from 'apis/response';
import HighlightReviewListItem from 'types/interface/hightlight-review-list-item.interface';
import getTrendingReviewResponseDto from 'apis/response/review/get-trending-review.response.dto';
import ReviewContainer from 'views/Review';

export default function Main() {
  
  //      function: navigate        //
  const navigate = useNavigate();

  //      state: sideBar button      //
  const [selectedMenu, setSelectedMenu] = useState<'home' | 'review'>('home');
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
        <SidebarBox onMenuClick={setSelectedMenu}/>
      </>
    )
  }

  //      Component: Main-container       //
  const MainContainer = () => {

    const [latestReviewList, setLatestReviewList] = useState<HighlightReviewListItem[]>([]);
    const [trendingReviewList, setTrendingReviewList] = useState<HighlightReviewListItem[]>([]);

    //      function: get top3 board list response      //
    const getLatestReviewListResponse = (responseBody: getLatestReviewResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'DBE') alert('Database Error!');
      if(code !== 'SU') return;

      const { latestReviews } = responseBody as getLatestReviewResponseDto;
      setLatestReviewList(latestReviews);
    }

    //      function: get top3 board list response      //
    const getTrendingReviewListResponse = (responseBody: getTrendingReviewResponseDto | ResponseDto | null) => {
      if(!responseBody) return;
      const { code } = responseBody;
      if(code === 'DBE') alert('Database Error!');
      if(code !== 'SU') return;

      const { trendingReviews } = responseBody as getTrendingReviewResponseDto;
      setTrendingReviewList(trendingReviews);
    }

    //      effect: executed on the first mount       //
    useEffect(() => {
      getLatestReviewRequest().then(getLatestReviewListResponse);
      getTrendingReviewRequest().then(getTrendingReviewListResponse);
    }, []);

    return(
      <>
        <div className="main-container">
          <div className="main-container-graph">
            <CustomBarChart />
          </div>
          <div className="main-container-content">
            <HighLightContent titleEmo="📊" title="Trending Reviews" highlightReviewListItem={trendingReviewList}/>
            <HighLightContent titleEmo="🔥" title="Latest Reviews" highlightReviewListItem={latestReviewList}/>
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
        {selectedMenu === 'home' ? <MainContainer /> : <ReviewContainer />}
        <MainRight />
      </div>
    </div>
    </>
  );
}