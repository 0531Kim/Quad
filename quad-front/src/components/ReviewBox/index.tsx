import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef, useEffect, useState } from 'react';
import './style.css';
import ReviewListItem from 'types/interface/review-list-item.interface';
import StudiesByFaculty from 'types/interface/studies-by-faculty-item.interface';
import { getStudiesByFaculty, postReviewLikeRequest, deleteReviewLikeRequest, deleteReviewRequest, reportReviewRequest } from 'apis';
import getStudiesByFacultyResponseDto from 'apis/response/review/get-studies-by-faculty.response.dto';
import { ResponseDto } from 'apis/response';
import { takenSemesterMapper } from 'types/mapper/taken-semester.mapper';
import { useCookies } from 'react-cookie';
import LikeReviewResponseDto from 'apis/response/review/like-review.response.dto';
import DeleteReviewResponseDto from 'apis/response/review/remove-like-review.response.dto';
import useLikedReviewStore from 'stores/liked-review.store';
import { examTypeMapper } from 'types/mapper/exam-type.mapper';
import { useLoginUserStore } from 'stores';
import RemoveLikeReviewResponseDto from 'apis/response/review/remove-like-review.response.dto';
import { dateAgoMapper } from 'types/mapper/date-ago.mapper';
import DeleteReviewRequestDto from 'apis/request/review/delete-review.request.dto';
import ReportReviewRequestDto from 'apis/request/review/report-review.request.dto';
import ReportReviewResponseDto from 'apis/response/review/report-review.response.dto';

//          interface         //
interface Props {
    review: ReviewListItem;
    isLiked?: boolean;
}

//          component: Input Box component          //
const ReviewBox = ({review, isLiked: initialIsLiked}: Props) => {

    const {
        username, courseName, date, exam, difficulty, workload, enjoyable, quality, content, likeCount, takenSemester, score, reviewNumber 
    } = review;

    //          state           //
    const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked || false);
    const [currentLikeCount, setCurrentLikeCount] = useState<number>(likeCount);
    const [myComment, setMyComment] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const[cookies, setCookie] = useCookies();

    const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

    const [showModal, setShowModal] = useState<'delete' | 'report' | null>(null);
    const [reportReason, setReportReason] = useState('');

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

    const { likedReviewIndexList, isLoaded } = useLikedReviewStore();
    //          effect          //
    useEffect(() => {
        if(!isLoaded) return;
        setIsLiked(likedReviewIndexList.includes(reviewNumber));
        if (loginUser) {
            setMyComment(loginUser.nickname === username);
        }
    }, [isLoaded]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [showModal]);

    //          function: handle like response          //
    const getLikeReviewResponse = (responseBody: LikeReviewResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('Database Error!');
        if (code !== 'SU') return;

        const { updatedLikeCount } = responseBody as LikeReviewResponseDto;
        setCurrentLikeCount(updatedLikeCount);
    }

    //          function: handle remove like response          //
    const removeLikeReviewResponse = (responseBody: RemoveLikeReviewResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('Database Error!');
        if (code !== 'SU') return;

        const { updatedLikeCount } = responseBody as RemoveLikeReviewResponseDto;
        setCurrentLikeCount(updatedLikeCount);
    }

    //          function: handle like toggle          //
    const onClickLike = async () => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            alert('You need to login to like a review.');
            return;
        }
    
        const nextIsLiked = !isLiked;
        setIsLiked(nextIsLiked);
    
        if (nextIsLiked) {
            postReviewLikeRequest({ reviewNumber }, accessToken).then(getLikeReviewResponse);
        } else {
            deleteReviewLikeRequest({ reviewNumber }, accessToken).then(removeLikeReviewResponse);
        }
    };

    //          function: handle report          //
    const handleReport = () => {
        setShowModal('report');
    };

    //          function: handle delete          //
    const handleDelete = () => {
        setShowModal('delete');
    };

    //          function: close modal          //
    const closeModal = () => {
        setShowModal(null);
        setReportReason('');
    };

    //          function: handle response          //
    const deleteReviewResponse = (responseBody: DeleteReviewResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('Database Error!');
        if (code === 'AF') alert('Authentication Error!');
        if (code !== 'SU') return;

        setIsDeleted(true);
        alert('Review Deleted!');
    }

    //          function: handle report response          //
    const reportReviewResponse = (responseBody: ReportReviewResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        console.log(responseBody);
        const { code } = responseBody;
        if (code === 'DBE') alert('Database Error!');
        if (code === 'AF') alert('Authentication Error!');
        if (code !== 'SU') return;

        alert('Review Reported!');
    }

    //          function: handle delete          //
    const confirmDelete = () => {
        const requestBody: DeleteReviewRequestDto = { reviewNumber };
        deleteReviewRequest(requestBody, cookies.accessToken).then(deleteReviewResponse);
        closeModal();
    };

    //          function: handle report          //
    const confirmReport = () => {
        const requestBody: ReportReviewRequestDto = { reviewNumber,  reportReason };
        reportReviewRequest(requestBody, cookies.accessToken).then(reportReviewResponse);
        closeModal();
    };

    //          render: Input Box component         //
    return(
        <>
        {!isDeleted && (
            <div className='review-box'>
                <div className='review-box-top'>
                    <div className='review-coursename-box'>{username}</div>
                    <div className='review-star-container'>
                        <div className='review-rate'>{StarRating({starCount: score})}</div>
                    </div>
                    <div className='review-div mobile-none'></div>
                    <div className='review-written-date mobile-none'>{dateAgoMapper(date)}</div>
                    <div className='review-actions review-actions-desktop'>
                        {myComment && (
                            <button className='review-action-button' onClick={handleDelete}>
                                <i className="fa-regular fa-trash"></i>
                            </button>
                        )}
                        <button className='review-action-button' onClick={handleReport}>
                            <i className="fa-regular fa-flag"></i>
                        </button>
                        <div className='like-container'>
                            <button className='review-action-button' onClick={onClickLike}>
                                <i className={isLiked ? "fa-solid fa-heart": "fa-regular fa-heart"}></i>
                            </button>
                            <span className='like-count'>{currentLikeCount}</span>
                        </div>
                    </div>
                </div>
                {/* <div className='review-star-container'>
                    <div className='review-rate'>{StarRating({starCount: score})}</div>
                </div> */}
                <div className='review-box-middle'>
                    <div className='review-date'>
                        <div className='review-date-text'>{takenSemesterMapper[takenSemester]}
                    </div>
                    </div>
                    {exam && (
                        <div className='review-mid-div'></div>
                    )}
                    {exam && (
                        <div className='review-exam'>
                            <div className='review-exam-text'>{examTypeMapper[exam]}</div>
                        </div>
                    )}
                </div>
                <div className='review-box-bottom'>
                    <div className='review-content-box'>
                        <div className='review-content-container'>{content}</div>
                    </div>
                </div>
                <div className='review-box-bottom-mobile'> 
                <div className='review-actions review-actions-mobile'>
                        <div className='like-container'>
                            <button className='review-action-button' onClick={onClickLike}>
                                <i className={isLiked ? "fa-solid fa-heart": "fa-regular fa-heart"}></i>
                            </button>
                            <span className='like-count'>{currentLikeCount}</span>
                        </div>
                        <button className='review-action-button' onClick={handleReport}>
                            <i className="fa-regular fa-flag"></i>
                        </button>
                        {myComment && (
                            <button className='review-action-button' onClick={handleDelete}>
                                <i className="fa-regular fa-trash"></i>
                            </button>
                        )}
                    </div>
                    <div className='review-box-bottom-mobile-text-container'>
                        <div className='review-box-bottom-mobile-text'>Posted:</div>
                        <div className='review-box-bottom-date'>{dateAgoMapper(date)}</div>
                    </div>
                </div>
            </div>
        )}
        {showModal && (
            <div className="modal-overlay">
                <div className="modal-box">
                    {showModal === 'report' ? (
                        <>
                            <div className="modal-title">Report a Review</div>
                            <div className="modal-message">
                                Please let us know why you are reporting this review.
                            </div>
                            <textarea
                                className="modal-textarea"
                                value={reportReason}
                                onChange={e => setReportReason(e.target.value)}
                                placeholder="Enter your reason here..."
                            />
                            <div className="modal-btn-row">
                                <button className="modal-btn cancel" onClick={closeModal}>Cancel</button>
                                <button className="modal-btn confirm" onClick={confirmReport}>Confirm</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modal-title">Delete a Review</div>
                            <div className="modal-message">
                                Are you sure you want to remove this review?
                            </div>
                            <div className="modal-btn-row">
                                <button className="modal-btn cancel" onClick={closeModal}>Cancel</button>
                                <button className="modal-btn confirm" onClick={confirmDelete}>Confirm</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )}
        </>
    )
};

export default ReviewBox;