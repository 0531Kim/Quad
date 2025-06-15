import { useEffect, useState } from "react";
import './style.css';
import HighlightReviewListItem from "types/interface/hightlight-review-list-item.interface";
import { takenSemesterMapper } from "types/mapper/taken-semester.mapper";
import { examTypeMapper } from "types/mapper/exam-type.mapper";
import useLikedReviewStore from "stores/liked-review.store";
import { useLoginUserStore } from "stores";

//          interface          //
interface Props{
    icon: React.ReactNode;
    title: string;
    highlightReviewListItem: HighlightReviewListItem[];
}

//          interface          //
interface ContentCardProps {
    highlightReviewItem: HighlightReviewListItem;
  }


//      Component: Content Card        //
  const ContentCard = (props : ContentCardProps) => {

  const{highlightReviewItem} = props;

  const { reviewNumber, courseName, username, rate, content, time, likeCount, exam, takenSemester } = highlightReviewItem;

  const [isLiked, setIsLiked] = useState(false);

  const { likedReviewIndexList, isLoaded } = useLikedReviewStore();
  //          effect          //
  useEffect(() => {
      if(!isLoaded) return;
      setIsLiked(likedReviewIndexList.includes(reviewNumber));
  }, [isLoaded]);

  function StarRating({ starCount }: { starCount: number }) {
    return (
        <div style={{ position: 'relative', display: 'inline-block', width: 'auto' }}>
            {/* Gray background stars */}
            <div style={{ color: '#e0e0e0', position: 'absolute', left: 0, top: 0, pointerEvents: 'none', display: 'flex' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                    <i key={idx} className="fa-solid fa-star" style={{ fontSize: '0.9rem', marginRight: 1 }} />
                ))}
            </div>
            {/* Green overlay stars */}
            <div style={{ color: '#00804b', position: 'relative', pointerEvents: 'none', display: 'flex' }}>
                {Array.from({ length: 5 }).map((_, idx) => {
                    const position = idx + 1;
                    let iconClass = '';
                    if (starCount >= position - 0.25) {
                        iconClass = 'fa-solid fa-star';
                    } else if (starCount >= position - 0.75) {
                        iconClass = 'fa-solid fa-star-half';
                    } else {
                        iconClass = '';
                    }
                    return iconClass ? (
                        <i key={idx} className={iconClass} style={{ fontSize: '0.9rem', marginRight: 1 }} />
                    ) : (
                        <span key={idx} style={{ display: 'inline-block', width: '0.9rem', marginRight: 1 }} />
                    );
                })}
            </div>
        </div>
    );
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
                  {/* <div className='divider'></div> */}
                  <div className='content-card-likes'>
                    <div className='content-card-icon'>
                      {
                        isLiked ? (
                          <i className="fa-solid fa-heart"></i>
                        ) : (
                          <i className="fa-regular fa-heart"></i>
                        )
                      }
                    </div>
                    <div className='favortite-count'>{likeCount}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='review-highlight-box-middle'>
                <div className='review-highlight-date'>
                    <div className='review-highlight-date-text'>{takenSemesterMapper[takenSemester]}
                </div>
                </div>
                <div className='review-highlight-exam'>
                  <div className='review-highlight-exam-text'>{examTypeMapper[exam]}</div>
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

    const{icon, title, highlightReviewListItem} = props;

    return(
      <div className='high-light-content'>
        <div className='high-light-content-top'>
          <div className='high-light-content-top-emo'>
            {/* {titleEmo} */}
            {icon}
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