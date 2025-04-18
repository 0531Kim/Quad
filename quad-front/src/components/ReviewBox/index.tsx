import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

//          component: Input Box component          //
const ReviewBox = () => {

    //          render: Input Box component         //
    return(
        <>
        <div className='review-box'>
            <div className='review-box-top'>
                <div className='review-username-box'>StiAndre</div>
                <div className='review-star-container'>
                    <div className='review-star-icon star'></div>
                    <div className='review-rate'>3.2</div>
                </div>
                <div className='review-div'></div>
                <div className='review-date'>2024 S1</div>
                <div className='review-div'></div>
                <div className='review-exam'>
                    <div className='review-exam-text'>No Exam</div>
                </div>
            </div>
            <div className='review-box-bottom'>
                <div className='review-rating-box'>
                    <div className='review-rating-individual'>

                    </div>
                    <div className='review-rating-individual'>

                    </div>
                    <div className='review-rating-individual'>

                    </div>
                    <div className='review-rating-individual'>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default ReviewBox;