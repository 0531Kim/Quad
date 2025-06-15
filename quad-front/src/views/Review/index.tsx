import { JSX, useEffect, useState, memo, useMemo } from 'react';
import './style.css'
import ReviewBox from 'components/ReviewBox';
import getAllFacultyReviewResponseDto from 'apis/response/review/get-all-faculty-review.response.dto';
import { ResponseDto } from 'apis/response';
import { getAllFacultyReview, getCourseDescription, getCourseReview, postReviewRequest } from 'apis';
import ReviewListItem from 'types/interface/review-list-item.interface';
import { useNavigate, useParams } from 'react-router-dom';
import FacultyListBox from 'components/FacultyListBox';
import { codeToSubjectMap } from 'constant';
import getCourseReviewResponseDto from 'apis/response/review/get-course-review.response.dto';
import getCourseDescriptionResponseDto from 'apis/response/review/get-course-description.response.dto';
import CourseDescription from 'types/interface/course-description.interface';
import ReactDOM from 'react-dom';
import ReviewSummaryBarChart from './ReviewSummaryBarChart';
import ReviewOverallTable, { TableData } from './ReviewOverallTable';
import PostReviewResponseDto from 'apis/response/review/post-review.response.dto';
import PostReviewRequestDto from 'apis/request/review/post-review.request.dto';
import { useCookies } from 'react-cookie';
import useLikedReviewStore from 'stores/liked-review.store';

// Add these utility functions at the top of the file, after imports
const calculateOverallAverage = (reviews: ReviewListItem[]): number => {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => {
    return acc + (review.difficulty + review.workload + review.enjoyable + review.quality) / 4;
  }, 0);
  
  return Number((sum / reviews.length).toFixed(1));
};

type RatingDistribution = {
  [key: number]: number;
};

type CategoryDistribution = {
  difficulty: RatingDistribution;
  workload: RatingDistribution;
  enjoyable: RatingDistribution;
  quality: RatingDistribution;
};

const calculateRatingDistribution = (reviews: ReviewListItem[]): CategoryDistribution => {
  if (!reviews || reviews.length === 0) return {
    difficulty: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    workload: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    enjoyable: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    quality: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };

  const distribution: CategoryDistribution = {
    difficulty: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    workload: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    enjoyable: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    quality: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  };

  reviews.forEach(review => {
    distribution.difficulty[review.difficulty as keyof RatingDistribution]++;
    distribution.workload[review.workload as keyof RatingDistribution]++;
    distribution.enjoyable[review.enjoyable as keyof RatingDistribution]++;
    distribution.quality[review.quality as keyof RatingDistribution]++;
  });

  return distribution;
};

const transformDataForCharts = (reviews: ReviewListItem[]) => {
  const distribution = calculateRatingDistribution(reviews);
  const totalReviews = reviews.length;

  const getOptions = (category: 'difficulty' | 'workload' | 'enjoyable' | 'quality') => {
    const labels = {
      difficulty: ['Very Hard', 'Hard', 'Moderate', 'Easy', 'Very Easy'],
      workload: ['Very Heavy', 'Heavy', 'Moderate', 'Light', 'Very Light'],
      enjoyable: ['Very Boring', 'Boring', 'Moderate', 'Enjoyable', 'Very Enjoyable'],
      quality: ['Very Poor', 'Poor', 'Moderate', 'Good', 'Very Good']
    };

    const counts = distribution[category];
    const maxCount = Math.max(...Object.values(counts));

    return Object.entries(counts).map(([rating, count], index) => ({
      label: labels[category][index],
      percent: Math.round((count / totalReviews) * 100),
      isHighlighted: count === maxCount
    }));
  };

  // For ReviewOverallTable
  const tableData: TableData[] = [
    {
      category: "Quality",
      options: getOptions('quality')
    },
    {
      category: "Enjoyable",
      options: getOptions('enjoyable')
    },
    {
      category: "Difficulty",
      options: getOptions('difficulty')
    },
    {
      category: "Workload",
      options: getOptions('workload')
    }
  ];

  // For ReviewSummaryBarChart
  const barChartData = [
    {
      question: "Quality",
      options: getOptions('quality').reverse().map(({ label, percent }) => ({ label, percent }))
    },
    {
      question: "Enjoyable",
      options: getOptions('enjoyable').reverse().map(({ label, percent }) => ({ label, percent }))
    },
    {
      question: "Difficulty",
      options: getOptions('difficulty').reverse().map(({ label, percent }) => ({ label, percent }))
    },
    {
      question: "Workload",
      options: getOptions('workload').reverse().map(({ label, percent }) => ({ label, percent }))
    }
  ];

  return { tableData, barChartData };
};

//                Component              //
export default function ReviewView() {

    const facultyIconMap: { [key: string]: string } = {
        ART: "fa-earth-americas",
        BUS: "fa-money-bill-trend-up",
        CAI: "fa-palette",
        EDU: "fa-school",
        ENG: "fa-robot",
        LAW: "fa-scale-balanced",
        MED: "fa-syringe",
        SCI: "fa-flask-vial",
        GEN: "fa-graduation-cap",
      };

    const facultyKeyMap: { [key: string]: string } = {
        ART: "Arts",
        BUS: "Business and Economics",
        CAI: "Creative Arts and Industries",
        EDU: "Education and Social Work",
        ENG: "Engineering",
        LAW: "Law",
        MED: "Medical and Health Sciences",
        SCI: "Science",
        GEN: "General Education",
    };

    const facultyColorMap: { [key: string]: string } = {
        ART: "rgb(164, 30, 50)",
        BUS: "rgb(133, 0, 99)",
        CAI: "rgb(229, 102, 11)",
        EDU: "rgb(83, 161, 27)",
        ENG: "rgb(74, 42, 116)",
        LAW: "rgb(3, 97, 143)",
        MED: "rgb(2, 131, 132)",
        SCI: "rgb(0, 85, 160)",
        GEN: "rgb(207, 199, 10)",
      }

    const { faculty, studyCode, courseCode } = useParams()

    //          state: allFacultyReviewMap        //
    const [facultyFullName, setFacultyFullName] = useState<string>("");
    const [spacedCourseCode, setSpacedCourseCode] = useState<string>("");

    const[cookies, setCookie] = useCookies();

    const [reviewList, setReviewList] = useState<ReviewListItem[]>();
    const [notOfferedThisYear, setNotOfferedThisYear] = useState<boolean>(false);
    const [courseDescription, setCourseDescription] = useState<CourseDescription>({
      courseName: '',
      sem1: 0,
      sem2: 0,
      summer: 0,
      sem1_link: '',
      sem2_link: '',
      summer_link: '',
      description: ''
    });

    const { likedReviewIndexList } = useLikedReviewStore();

    //          function: getAllFacultyReview          //
    const getCourseReviewResponse = (responseBody: getCourseReviewResponseDto | ResponseDto | null) =>{
        if(!responseBody) return;
            const { code } = responseBody;
            if(code === 'DBE') alert('Database Error!');
            if(code !== 'SU') return;
        
        const { reviewList } = responseBody as getCourseReviewResponseDto;
        setReviewList(reviewList);
    }

    //          function: getAllFacultyReview          //
    const getCourseDescriptionResponse = (responseBody: getCourseDescriptionResponseDto | ResponseDto | null) =>{
      if(!responseBody) return;
          const { code } = responseBody;
          if(code === 'DBE') alert('Database Error!');
          if(code === 'NC'){
            setNotOfferedThisYear(true);
          }
          if(code !== 'SU') return;
      
      const { courseDescription } = responseBody as getCourseDescriptionResponseDto;
      setCourseDescription(courseDescription);
    }

    const postReviewResponse = (
      responseBody: PostReviewResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') {
        alert('Database Error!');
        return;
      }
      if (code !== 'SU') {
        alert('Review Writing Failed!');
        return;
      }

      alert('Review Writing Success!');
      setIsModalOpen(false);

      if (courseCode) {
        const cleanedCourseCode = courseCode.replace(/\s+/g, '');
          getCourseReview({ courseName: cleanedCourseCode }).then(getCourseReviewResponse);
      }

      setSelectedSort('newest');
    };

    function formatCourseDescription(description: string): JSX.Element[] {
      const keywords = ["Prerequisite:", "Restriction:", "Corequisite:"];
      let formatted = description;
    
      for (const keyword of keywords) {
        const regex = new RegExp(`${keyword}`, "g");
        formatted = formatted.replace(regex, `\n${keyword}`);
      }
    
      if (formatted.startsWith('\n')) {
        formatted = formatted.slice(1);
      }
    
      return formatted.split('\n').map((line, index) => {
        const keyword = keywords.find(k => line.includes(k));
        if (keyword) {
          const rest = line.replace(keyword, '').trim();
          return (
            <div key={index}>
              <span className="highlight-keyword">{keyword}</span> {rest}
            </div>
          );
        }
        return <div key={index}>{line}</div>;
      });
    }

    //          function: star rating function          //
    function StarRating({ starCount }: { starCount: number }) {
      return (
        <div style={{ position: 'relative', display: 'inline-block', width: 'auto' }}>
          <div style={{ color: '#e0e0e0', position: 'absolute', left: 0, top: 0, pointerEvents: 'none', display: 'flex' }}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <i key={idx} className="fa-solid fa-star" style={{ fontSize: '1.6rem', marginRight: 2 }} />
            ))}
          </div>
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
                <i key={idx} className={iconClass} style={{ fontSize: '1.6rem', marginRight: 2 }} />
              ) : (
                <span key={idx} style={{ display: 'inline-block', width: '1.6rem', marginRight: 2 }} />
              );
            })}
          </div>
        </div>
      );
    }

    //                Function              //
    function spaceCourseCode(code: string): string {
      return code.replace(/([A-Za-z]+)(\d+)/, '$1 $2');
    }

    useEffect(() => {
      if (courseCode) {
        const cleanedCourseCode = courseCode.replace(/\s+/g, '');
          getCourseReview({ courseName: cleanedCourseCode }).then(getCourseReviewResponse);
      }
    }, []);

    useEffect(() => {
      if (faculty && facultyKeyMap[faculty]) {
        setFacultyFullName(facultyKeyMap[faculty])
      }
    }, [faculty])

    useEffect(() => {
      if (courseCode) {
        const cleanedCourseCode = courseCode.replace(/\s+/g, '');
          getCourseDescription({ courseName: cleanedCourseCode }).then(getCourseDescriptionResponse);
      }
    }, [])

    useEffect(() => {
      setSpacedCourseCode(spaceCourseCode(courseCode ?? ""));
    }, [])


    const [isModalOpen, setIsModalOpen] = useState(false);

    //          Component: ReviewModal          //
    const ReviewModal = memo(({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
      const [starRating, setStarRating] = useState<number>(0);
      const [lectureQuality, setLectureQuality] = useState<string>("");
      const [enjoyment, setEnjoyment] = useState<string>("");
      const [workload, setWorkload] = useState<string>("");
      const [difficulty, setDifficulty] = useState<string>("");
      const [examType, setExamType] = useState<string>("");
      const [finalThoughts, setFinalThoughts] = useState<string>("");
      const [showConfirm, setShowConfirm] = useState(false);
      const [semester, setSemester] = useState<string>("2024 S1");

      const lectureQualityOptions = ["Very Poor", "Poor", "Fair", "Good", "Excellent"];
      const enjoymentOptions = ["Not at all", "Slightly", "Moderately", "Enjoyable", "Very Enjoyable"];
      const workloadOptions = ["Very Heavy", "Heavy", "Moderate", "Light", "Very Light"];
      const difficultyOptions = ["Very Hard", "Hard", "Moderate", "Easy", "Very Easy"];
      const examTypeOptions = ["In-person Exam", "Online Exam", "No Exam"];

      const StarRatingInput = ({ value, onChange }: { value: number, onChange: (v: number) => void }) => (
        <div className="review-modal-star-row">
          <div className="review-modal-star-label">
            How would you rate this course overall?
          </div>
          <div className="review-modal-star-group">
            {[1,2,3,4,5].map((star) => (
              <div
                key={star}
                className="write-review-star-overall-wrapper review-modal-star-clickable"
                onClick={() => onChange(star === value ? star - 1 : star)}
              >
                <div className="empty-star overall-star review-modal-star-large"></div>
                {value >= star && <div className="star overall-star overlay-star review-modal-star-large"></div>}
              </div>
            ))}
          </div>
        </div>
      );

      // Convert string values to numbers
      const getQualityNumber = (quality: string): number => {
        const index = lectureQualityOptions.indexOf(quality);
        return index + 1; // 1: Very Poor, 2: Poor, 3: Fair, 4: Good, 5: Excellent
      };

      const getEnjoymentNumber = (enjoyment: string): number => {
        const index = enjoymentOptions.indexOf(enjoyment);
        return index + 1; // 1: Not at all, 2: Slightly, 3: Moderately, 4: Enjoyable, 5: Very Enjoyable
      };

      const getWorkloadNumber = (workload: string): number => {
        const index = workloadOptions.indexOf(workload);
        return index + 1; // 1: Very Heavy, 2: Heavy, 3: Moderate, 4: Light, 5: Very Light
      };

      const getDifficultyNumber = (difficulty: string): number => {
        const index = difficultyOptions.indexOf(difficulty);
        return index + 1; // 1: Very Hard, 2: Hard, 3: Moderate, 4: Easy, 5: Very Easy
      };

      const getExamTypeNumber = (examType: string): number => {
        const index = examTypeOptions.indexOf(examType);
        return index + 1; // 1: In-person Exam, 2: Online Exam, 3: No Exam
      };

      const getSemesterNumber = (semester: string): number => {
        const semesterMap: { [key: string]: number } = {
          "2024 S1": 1,
          "2024 S2": 2,
          "2024 SS": 3,
          "2025 S1": 4
        };
        return semesterMap[semester] || 1;
      };

      const handleSubmitClick = () => {
        if (!spacedCourseCode) return;

        const reviewData: PostReviewRequestDto = {
          courseName: spacedCourseCode,
          score: starRating,
          semester: getSemesterNumber(semester),
          quality: getQualityNumber(lectureQuality),
          enjoyable: getEnjoymentNumber(enjoyment),
          difficulty: getDifficultyNumber(difficulty),
          workload: getWorkloadNumber(workload),
          exam: getExamTypeNumber(examType),
          content: finalThoughts
        };

        postReviewRequest(reviewData, cookies.accessToken).then(
          (response) => postReviewResponse(response)
        );
      };

      useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
        }
        return () => {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        };
      }, [isOpen]);

      const isFormValid = !!(starRating && lectureQuality && enjoyment && workload && difficulty && examType);

      if (!isOpen) return null;
      return ReactDOM.createPortal(
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="review-modal-header">
              <div className="review-modal-title">Write a Review</div>
              <button className="review-modal-close" onClick={() => setShowConfirm(true)}>&times;</button>
            </div>
            <ConfirmModal
              open={showConfirm}
              onCancel={() => setShowConfirm(false)}
              onConfirm={onClose}
            />
            <div className="review-modal-questions">
              <form className="review-modal-form">
                <div className="review-modal-question-group">
                  <StarRatingInput value={starRating} onChange={setStarRating} />
                  <div className="review-modal-question">Which semester did you take this course?</div>
                  <div className="review-modal-options-row">
                    {["2024 S1", "2024 S2", "2024 SS", "2025 S1"].map(option => (
                      <button
                        type="button"
                        key={option}
                        className={`review-modal-option-btn${semester === option ? ' selected' : ''}`}
                        onClick={() => setSemester(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-modal-question-group">
                  <div className="review-modal-question">How was the quality of the lectures and course materials?</div>
                  <div className="review-modal-options-row">
                    {lectureQualityOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        className={`review-modal-option-btn${lectureQuality === option ? ' selected' : ''}`}
                        onClick={() => setLectureQuality(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-modal-question-group">
                  <div className="review-modal-question">How much did you enjoy this course?</div>
                  <div className="review-modal-options-row">
                    {enjoymentOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        className={`review-modal-option-btn${enjoyment === option ? ' selected' : ''}`}
                        onClick={() => setEnjoyment(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-modal-question-group">
                  <div className="review-modal-question">How heavy was the coursework load for this course?</div>
                  <div className="review-modal-options-row">
                    {workloadOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        className={`review-modal-option-btn${workload === option ? ' selected' : ''}`}
                        onClick={() => setWorkload(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-modal-question-group">
                  <div className="review-modal-question">How difficult was this course?</div>
                  <div className="review-modal-options-row">
                    {difficultyOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        className={`review-modal-option-btn${difficulty === option ? ' selected' : ''}`}
                        onClick={() => setDifficulty(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-modal-question-group">
                  <div className="review-modal-question">What type of exam did this course have?</div>
                  <div className="review-modal-options-row">
                    {examTypeOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        className={`review-modal-option-btn${examType === option ? ' selected' : ''}`}
                        onClick={() => setExamType(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-modal-question-group">
                  <div className="review-modal-question">Any final thoughts or reflections on the course?</div>
                  <textarea
                    className="review-modal-textarea"
                    placeholder="Share your thoughts..."
                    value={finalThoughts}
                    onChange={e => setFinalThoughts(e.target.value)}
                    rows={5}
                  />
                </div>
              </form>
            </div>
            <div className="review-modal-submit-btn-container">
              <button
                type="submit"
                className={`review-modal-submit-btn${isFormValid ? ' enabled' : ''}`}
                disabled={!isFormValid}
                onClick={handleSubmitClick}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>,
        document.body
      );
    });

    // ConfirmModal component
    const ConfirmModal = ({ open, onCancel, onConfirm }: { open: boolean, onCancel: () => void, onConfirm: () => void }) => {
      useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
        }
        return () => {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        };
      }, [open]);
      if (!open) return null;
      return ReactDOM.createPortal(
        <div className="review-modal-overlay">
          <div className="confirm-modal">
            <div className="confirm-modal-title">Discard this review</div>
            <div className="confirm-modal-message">All your current input will be lost.<br />Do you want to continue?</div>
            <div className="confirm-modal-btns">
              <button className="confirm-modal-btn cancel" onClick={onCancel}>Cancel</button>
              <button className="confirm-modal-btn confirm" onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        </div>,
        document.body
      );
    };

    useEffect(() => {
      if (isModalOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      };
    }, [isModalOpen]);

    const [showSummaryBarChart, setShowSummaryBarChart] = useState(false);

    // Add these memoized calculations with proper type checking
    const overallAverage = useMemo(() => 
      calculateOverallAverage(reviewList || []), 
      [reviewList]
    );

    const { tableData, barChartData } = useMemo(() => {
      if (!reviewList || reviewList.length === 0) return { tableData: [], barChartData: [] };
      return transformDataForCharts(reviewList);
    }, [reviewList]);

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('newest');

    const handleSort = (value: string) => {
        const sortedReviews = [...(reviewList || [])];
        switch(value) {
            case 'newest':
                sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'oldest':
                sortedReviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case 'highest':
                sortedReviews.sort((a, b) => b.score - a.score);
                break;
            case 'lowest':
                sortedReviews.sort((a, b) => a.score - b.score);
                break;
            case 'mostLiked':
                sortedReviews.sort((a, b) => b.likeCount - a.likeCount);
                break;
        }
        setReviewList(sortedReviews);
        setSelectedSort(value);
        setIsSortOpen(false);
    };

    //          render          //
    return (
        <div className="review-container">
        <FacultyListBox setHoveredFaculty={() => {}} defaultFacultyKey={faculty} notHoverClick={1} />
        <div className='faculty-view-container-top'>
          <div className='faculty-view-text-box'>
            <i className={`fa-solid ${facultyIconMap[faculty ?? "ART"]} faculty-icon`} style={{ color: facultyColorMap[faculty ?? "ART"] }}></i>
            <div className='faculty-view-text-container'>
              <div className='faculty-view-title'>{facultyFullName}</div>
            </div>
            <div className='right-dir'>
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <div className='top-study-name'>
              {codeToSubjectMap[studyCode ?? "LAWENVIR"]}
            </div>
            <div className='right-dir'>
              <i className="fa-solid fa-angles-right"></i>
            </div>
            <div className='top-course-name fade-in'>{spacedCourseCode}</div>
          </div>
        </div>
        <div className='review-description-container'>
          <div className='review-description-info'>
            <div className='review-description-top-title'>{spacedCourseCode}</div>
            <div className='review-description-semester-box'>
              {courseDescription.sem1 === 1 && (
                <div className='review-description-semester-container'>
                  <div className='review-descripiton-container-text'>Sem1</div>
                </div>
              )}
              {courseDescription.sem2 === 1 && (
                <div className='review-description-semester-container'>
                  <div className='review-descripiton-container-text'>Sem2</div>
                </div>
              )}
              {courseDescription.summer === 1 && (
                <div className='review-description-semester-container'>
                  <div className='review-descripiton-container-text'>Summer school</div>
                </div>
              )}
            </div>
          </div>
          {
            notOfferedThisYear === true &&(
              <div className='review-not-exist-container'>
                <div className="review-not-exist-text-box">
                This course is not available in 2025
                </div>
              </div>
            )
          }
          <div className='review-description-restriction-container'>
            <div className="review-description-restriction-text">
              {formatCourseDescription(courseDescription.description)}
            </div>
          </div>
          <div className='review-description-link-box'>
          {courseDescription?.sem1_link && (
            <a
              href={courseDescription.sem1_link}
              target="_blank"
              rel="noopener noreferrer"
              className='review-description-link-item'
            >
              <div className='review-description-link-text'>Visit Semester 1 Course Outline</div>
              <div className='review-description-link-icon'>
              <i className="fa-sharp fa-regular fa-xs fa-arrow-up-right-from-square"></i>
              </div>
            </a>
          )}

          {courseDescription?.sem2_link && (
            <a
              href={courseDescription.sem2_link}
              target="_blank"
              rel="noopener noreferrer"
              className='review-description-link-item'
            >
              <div className='review-description-link-text'>Visit Semester 2 Course Outline</div>
              <div className='review-description-link-icon'>
              <i className="fa-sharp fa-regular fa-xs fa-arrow-up-right-from-square"></i>
              </div>
            </a>
          )}

          {courseDescription?.summer_link && (
            <a
              href={courseDescription.summer_link}
              target="_blank"
              rel="noopener noreferrer"
              className='review-description-link-item'
            >
              <div className='review-description-link-text'>Visit Summer School Course Outline</div>
              <div className='review-description-link-icon'>
                <i className="fa-sharp fa-regular fa-xs fa-arrow-up-right-from-square"></i>
              </div>
            </a>
          )}
          </div>
          <div className='review-description-overall'>
            <div className='review-description-overall-bot'>
              <div className='review-description-overall-score-box'>
                <div className='review-description-overall-title-container'>
                    <i className="fa-solid fa-stars overall-icon"></i>
                    <div className ='review-description-overall-title'>Overall Statistics</div>
                </div>
                <div className='review-description-overall-score-container'>
                  <div className='review-description-overall-rating-container'>
                      <div className='review-description-overall-star-container'>
                        <div className='review-description-overall-score-row'>
                          <div className='review-description-overall-score'>
                            {overallAverage}
                            <span className='review-description-overall-review-numbers'>
                              ({reviewList?.length || 0})
                            </span>
                          </div>
                        </div>
                        <div className='review-description-overall-star'>
                          <StarRating starCount={overallAverage} />
                        </div>
                      </div>
                  </div>
                  <div className='review-description-overall-table'>
                    <ReviewOverallTable data={tableData} />
                  </div>
                </div>
              </div>
              <div className='review-description-view-detail' onClick={() => setShowSummaryBarChart((prev) => !prev)}>
                <span className='review-description-view-detail-text' >View Details</span>
                <button
                  className="review-description-view-detail-toggle"
                  aria-label="Toggle summary bar chart"
                >
                  <i className={`fa-regular ${showSummaryBarChart ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
              </div>
              {showSummaryBarChart && <ReviewSummaryBarChart data={barChartData} />}
            </div>
          </div>
        </div>
        <button className="review-modal-open-btn" onClick={() => setIsModalOpen(true)}>
          Write Review
        </button>
        <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="review-box-container">
          <div className="review-box-container-top">
            <div className="review-box-container-title">
              <i className="fa-solid fa-comments-question-check"></i>
              All Reviews
            </div>
            <div className="review-box-container-sort">
              <div className="sort-select" onClick={() => setIsSortOpen(!isSortOpen)}>
                <span>{selectedSort === 'newest' ? 'Newest' :
                       selectedSort === 'oldest' ? 'Oldest' :
                       selectedSort === 'highest' ? 'Highest Rating' :
                       selectedSort === 'lowest' ? 'Lowest Rating' :
                       'Most Liked'}</span>
                <i className={`fa-solid fa-chevron-${isSortOpen ? 'up' : 'down'} chevron-icon`}></i>
              </div>
              {isSortOpen && (
                <div className="sort-options">
                    <div className="sort-option" onClick={() => handleSort('newest')}>Newest</div>
                    <div className="sort-option" onClick={() => handleSort('oldest')}>Oldest</div>
                    <div className="sort-option" onClick={() => handleSort('highest')}>Highest Rating</div>
                    <div className="sort-option" onClick={() => handleSort('lowest')}>Lowest Rating</div>
                    <div className="sort-option" onClick={() => handleSort('mostLiked')}>Most Liked</div>
                </div>
              )}
            </div>
          </div>
          {reviewList?.map((review, index) => (
            <ReviewBox 
              key={index} 
              review={review} 
              isLiked={likedReviewIndexList.includes(review.reviewNumber)}
            />
          ))}
        </div>
      </div>
    );
}