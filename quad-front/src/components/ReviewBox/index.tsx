import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef, useEffect, useState } from 'react';
import './style.css';
import ReviewListItem from 'types/interface/review-list-item.interface';
import StudiesByFaculty from 'types/interface/studies-by-faculty-item.interface';
import { getStudiesByFaculty } from 'apis';
import getStudiesByFacultyResponseDto from 'apis/response/review/get-studies-by-faculty.response.dto';
import { ResponseDto } from 'apis/response';

//          interface         //
interface Props {
    review: ReviewListItem;
}

//          component: Input Box component          //
const ReviewBox = ({review}: Props) => {

    const {
        username, courseName, date, noExam, difficulty, leniency, entertaining, quality, content, faculty
    } = review;

    //          state           //
    const [avgRate, setAvgRate] = useState<number>(0);
    const [studiesByFaculty, setStudiesByFaculty] = useState<StudiesByFaculty>({});

    //          function: star rating function          //
    function StarRating({ starCount }: { starCount: number }) {
        const stars = Array.from({ length: 5 }, (_, idx) => {
          const position = idx + 1;
      
          let overlayClass = '';
          if (starCount >= position - 0.25) {
            overlayClass = 'star review-star';
          } else if (starCount >= position - 0.75) {
            overlayClass = 'half-star review-star';
          }
      
          return (
            <div key={idx} className="star-wrapper">
              <div className="empty-star review-star"></div>
              {overlayClass && <div className={overlayClass}></div>}
            </div>
          );
        });
      
        return <div className="star-rating">{stars}</div>;
      }

    //          function: avg rate calculator          //
    function avgRateCalculator(
        difficulty: number,
        leniency: number,
        entertaining: number,
        quality: number
      ): number {
        const sum = difficulty + leniency + entertaining + quality;
        const avg = sum / 4;
        return Math.round(avg * 10) / 10; // 소수점 첫째 자리까지 반올림
    }

    //          effect          //
    useEffect(() => {
        const rate = avgRateCalculator(difficulty, leniency, entertaining, quality);
        setAvgRate(rate);
      }, []);

    //          render: Input Box component         //
    return(
        <>
        <div className='review-box'>
            <div className='review-box-top'>
                <div className='review-coursename-box'>{courseName}</div>
                <div className='review-star-container'>
                    <div className='review-star-icon star'></div>
                    <div className='review-rate'>{avgRate.toFixed(1)}</div>
                </div>
                <div className='review-div'></div>
                <div className='review-date'>2024 S1</div>
                <div className='review-div'></div>
                <div className='review-written-date'>{date}</div>
                {noExam === 1 && (
                    <div className='review-div'></div>
                )}
                {noExam === 1 && (
                    <div className='review-exam'>
                        <div className='review-exam-text'>No Exam</div>
                    </div>
                )}
            </div>
            <div className='review-box-bottom'>
                <div className='review-rating-box'>
                    <div className='review-rating-individual'>
                        <div className='review-rating-text'>Content difficulty</div>
                        <StarRating starCount={difficulty} />
                    </div>
                    <div className='review-rating-individual'>
                        <div className='review-rating-text'>Grade leniency</div>
                        <StarRating starCount={leniency} />
                    </div>
                    <div className='review-rating-individual'>
                        <div className='review-rating-text'>Engaging</div>
                        <StarRating starCount={entertaining} />
                    </div>
                    <div className='review-rating-individual'>
                        <div className='review-rating-text'>Usefulness</div>
                        <StarRating starCount={quality} />
                    </div>
                </div>
                <div className='review-content-box'>
                    <div className='review-content-container'>{content}</div>
                </div>
            </div>
        </div>
        </>
    )
};

export default ReviewBox;