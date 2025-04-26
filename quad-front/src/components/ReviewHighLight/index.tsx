import { useState } from "react";
import './style.css';
import HighlightReviewListItem from "types/interface/hightlight-review-list-item.interface";

//          interface          //
interface Props{
    titleEmo: string;
    title: string;
    highlightReviewListItem: HighlightReviewListItem[];
    // starCount: number;
    // content: string;

    // onNameClick?: () => void;
    // onBoxClick?: () => void;
}

//          interface          //
interface ContentCardProps {
    // courseName?: string;
    // star?: number;
    // content?: string;
    // time?: string;
    // likeCount?: number;
    highlightReviewItem: HighlightReviewListItem;
  }

//      Component: Content Card        //
  const ContentCard = (props : ContentCardProps) => {

  const{highlightReviewItem} = props;

  const { courseName, rate, content, time, likeCount } = highlightReviewItem;

  function StarRating({ starCount } : { starCount: number }) {
    const stars = Array.from({ length: 5 }, (_, idx) => {
        const position = idx + 1;

        let overlayClass = null;

        if (starCount >= position - 0.25) {
            overlayClass = 'star highlight-star';
        } else if (starCount >= position - 0.75) {
            overlayClass = 'half-star highlight-star';
        }

        return (
            <div key={idx} className="star-wrapper">
                <div className="empty-star highlight-star"></div>
                {overlayClass && <div className={overlayClass}></div>}
            </div>
        );
    });

    return <div className="content-rate">{stars}</div>;
}

  return(
    <div className='contentCard'>
            <div className='content-card-top'>
              <div className='content-card-top-left'>
                <div className='content-course-name'>{courseName}</div>
                <StarRating starCount={rate} />
              </div>
              <div className='content-card-top-right'>
                <div className='content-card-right-content'>
                  <div className='content-card-time'>{time}</div>
                  <div className='divider'></div>
                  <div className='content-card-likes'>
                    <div className='content-card-icon empty-heart'></div>
                    <div className='favortite-count'>{likeCount}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='content-card-bot'>
                <div className='content-card-content'>{content}</div>
            </div>
          </div>
  )
}

//      Component: Hightlight content       //
  const HighLightContent = (props: Props) => {

    const{titleEmo, title, highlightReviewListItem} = props;

    return(
      <div className='high-light-content'>
        <div className='high-light-content-top'>
          <div className='high-light-content-top-emo'>
            {titleEmo}
          </div>
          <div className='high-light-content-top-message'>
            {title}
          </div>
        </div>
        <div className="high-light-content-bot">
        {highlightReviewListItem.map((item) => (<ContentCard key={item.reviewNumber} highlightReviewItem={item} />))}
      </div>
      </div>
    )
  }

  
export default HighLightContent;