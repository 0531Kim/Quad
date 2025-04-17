import SidebarBox from 'components/SideBar';
import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import BarChart from 'components/Chart'
import Example from 'components/Chart';
import CustomBarChart from 'components/Chart';
import ContentCard from 'components/ContentCard';
import HighLightContent from 'components/ReviewHighLight';
import { getLatestReviewRequest, getTrendingReviewRequest } from 'apis';
import getLatestReviewResponseDto from 'apis/response/review/get-latest-review.response.dto';
import { ResponseDto } from 'apis/response';
import HighlightReviewListItem from 'types/interface/hightlight-review-list-item.interface';
import getTrendingReviewResponseDto from 'apis/response/review/get-trending-review.response.dto';

export default function Main() {
  
  //      function: navigate        //
  const navigate = useNavigate();
  
  // //      Component: Hightlight content       //
  // const HighLightContent = () => {

  //   //         state: title        //
  //   const[titleEmo, setTitleEmo] = useState<string>('🔥');
  //   const[title, setTitle] = useState<string>('Trending Reviews');
  //   const[starCount, setStarCount] = useState<number>(2.4);

  //   function StarRating({ starCount } : { starCount: number }) {
  //     const stars = Array.from({ length: 5 }, (_, idx) => {
  //         const position = idx + 1;
  
  //         let overlayClass = null;
  
  //         if (starCount >= position - 0.25) {
  //             overlayClass = 'star';
  //         } else if (starCount >= position - 0.75) {
  //             overlayClass = 'half-star';
  //         }
  
  //         return (
  //             <div key={idx} className="star-wrapper">
  //                 <div className="empty-star"></div>
  //                 {overlayClass && <div className={overlayClass}></div>}
  //             </div>
  //         );
  //     });
  
  //     return <div className="content-rate">{stars}</div>;
  // }

  //   return(
  //     <div className='high-light-content'>
  //       <div className='high-light-content-top'>
  //         <div className='high-light-content-top-emo'>
  //           {titleEmo}
  //         </div>
  //         <div className='high-light-content-top-message'>
  //           {title}
  //         </div>
  //       </div>
  //       <div className='high-light-content-bot'>
  //         <div className='contentCard'>
  //           <div className='content-card-top'>
  //             <div className='content-card-top-left'>
  //               <div className='content-course-name'>COMPSCI 220</div>
  //               <StarRating starCount={starCount} />
  //             </div>
  //             <div className='content-card-top-right'>
  //               <div className='content-card-right-content'>
  //                 <div className='content-card-time'>17:31</div>
  //                 <div className='divider'></div>
  //                 <div className='content-card-likes'>
  //                   <div className='content-card-icon empty-heart'></div>
  //                   <div className='favortite-count'>16</div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className='content-card-bot'>
  //               <div className='content-card-content'>I really loved what i have learnt in this lecture. It is usefull!!</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

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
        <MainContainer />
        <MainRight />
      </div>
    </div>
    </>
  );
}