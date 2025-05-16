import { JSX, useEffect, useState } from 'react';
import './style.css'
import ReviewBox from 'components/ReviewBox';
import getAllFacultyReviewResponseDto from 'apis/response/review/get-all-faculty-review.response.dto';
import { ResponseDto } from 'apis/response';
import { getAllFacultyReview, getCourseDescription, getCourseReview } from 'apis';
import ReviewListItem from 'types/interface/review-list-item.interface';
import { useNavigate, useParams } from 'react-router-dom';
import FacultyListBox from 'components/FacultyListBox';
import { codeToSubjectMap } from 'constant';
import getCourseReviewResponseDto from 'apis/response/review/get-course-review.response.dto';
import getCourseDescriptionResponseDto from 'apis/response/review/get-course-description.response.dto';
import CourseDescription from 'types/interface/course-description.interface';

//          Component: ReviewContainer          //
export default function ReviewView() {

    const departments = [
        { name: 'ART', colorClass: 'art-color' },
        { name: 'BUS', colorClass: 'bus-color' },
        { name: 'CAI', colorClass: 'cai-color' },
        { name: 'EDU', colorClass: 'edu-color' },
        { name: 'ENG', colorClass: 'eng-color' },
        { name: 'LAW', colorClass: 'law-color' },
        { name: 'MED', colorClass: 'med-color' },
        { name: 'SCI', colorClass: 'sci-color' },
        { name: 'GEN', colorClass: 'gen-color' },
    ];

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

    const facultyDescriptionMap: { [key: string]: string } = {
        ART: "Exploring people, culture, and creative expression.",
        BUS: "Understanding markets, money, and how the world trades.",
        CAI: "Designing, performing, and bringing ideas to life.",
        EDU: "Helping people learn, grow, and care for others.",
        ENG: "Solving real-world problems with smart solutions.",
        LAW: "Studying laws, rights, and how society is governed.",
        MED: "Studying health, medicine, and how we care for people.",
        SCI: "Learning about nature, technology, and everything in between.",
        GEN: "A bit of everything to broaden your thinking.",
    }

    const navigate = useNavigate();

    const handleFacultyClick = (facultyKey: string) => {
        navigate(`/review/${facultyKey}`);        
    };

    const { faculty, studyCode, courseCode } = useParams()

    //          state: btn active           //
    const [activeIndex, setActiveIndex] = useState<number | null>(Math.floor(Math.random() * departments.length));
    //          state: allFacultyReviewMap        //
    const [allFacultyReview, setAllFacultyReview] = useState<{ [faculty: string]: ReviewListItem[] }>({});
    const [facultyFullName, setFacultyFullName] = useState<string>("");
    const [spacedCourseCode, setSpacedCourseCode] = useState<string>("");

    //          state: extract faculty name         //
    const activeFacultyKey = activeIndex !== null ? departments[activeIndex].name : null;
    const mappedFacultyName = activeFacultyKey ? facultyKeyMap[activeFacultyKey] : null;
    const activeReviewList = mappedFacultyName ? allFacultyReview[mappedFacultyName] || [] : [];

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
      description: '',
      in_person: 0,
      online: 0,
      noExam: 0,
    });


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
      const stars = Array.from({ length: 5 }, (_, idx) => {
        const position = idx + 1;
    
        let overlayClass = '';
        if (starCount >= position - 0.25) {
          overlayClass = 'star overall-star';
        } else if (starCount >= position - 0.75) {
          overlayClass = 'half-star overall-star';
        }
    
        return (
          <div key={idx} className="star-overall-wrapper">
            <div className="empty-star overall-star"></div>
            {overlayClass && <div className={overlayClass}></div>}
          </div>
        );
      });
    
      return <div className="overall-rating-container">{stars}</div>;
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
            <div className='review-description-top-exam-container'>
              <div className='review-description-top-exam-text'>
              {courseDescription && courseDescription.in_person === 1 ? 'Final exam' : 'No Exam'}
              </div>
            </div>
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
            <div className='review-description-overall-top'>
              <div className='review-description-ai-icon'><i className="fa-solid fa-user-astronaut fa-lg"></i></div>
              <div className='review-description-ai-text'>Overall Score</div>
            </div>
            <div className='review-description-overall-bot'>
            <div className='review-description-overall-score-box'>
              <div className='review-description-overall-score'>4.3</div>
              <div className='review-description-overall-stars'>
                <StarRating starCount={3.5} />
              </div>
              <div className='review-description-overall-review-numbers'>(6)</div>
            </div>
            <div className='review-description-overall-chart-box'>
              <div className='review-description-overall-chart-top'>
                <div className='review-description-overall-comment-text'>DIFFICULT</div>
                <div className='grey-dot'></div>
                <div className='review-description-overall-comment-text'>GOOD GRADE</div>
                <div className='grey-dot'></div>
                <div className='review-description-overall-comment-text'>FUN</div>
                <div className='grey-dot'></div>
                <div className='review-description-overall-comment-text'>NOT USEFUL</div>
              </div>
              <div className='review-description-overall-item'>
                <div className='review-description-overall-text'>
                  <div className='review-description-overall-name'>Content Difficulty</div>
                </div>
                <div className='review-description-overall-number'>1.7</div>
                <div className="review-description-overall-bar-container">
                  <div className="review-description-overall-bar-grey">
                    <div className="review-description-overall-bar-yellow" style={{ width: `${(1.7 / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className='review-description-description'>
                *Content Difficulty: Higher means easier, lower means harder.
              </div>
              <div className='review-description-overall-item'>
                <div className='review-description-overall-text'>
                  <div className='review-description-overall-name'>Grade Leniency</div>
                </div>
                <div className='review-description-overall-number'>4.2</div>
                <div className="review-description-overall-bar-container">
                  <div className="review-description-overall-bar-grey">
                    <div className="review-description-overall-bar-yellow" style={{ width: `${(4.2 / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className='review-description-overall-item'>
                <div className='review-description-overall-text'>
                  <div className='review-description-overall-name'>Engaging</div>
                </div>
                <div className='review-description-overall-number'>3.7</div>
                <div className="review-description-overall-bar-container">
                  <div className="review-description-overall-bar-grey">
                    <div className="review-description-overall-bar-yellow" style={{ width: `${(3.7 / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className='review-description-overall-item'>
                <div className='review-description-overall-text'>
                  <div className='review-description-overall-name'>Usefulness</div>
                </div>
                <div className='review-description-overall-number'>0.9</div>
                <div className="review-description-overall-bar-container">
                  <div className="review-description-overall-bar-grey">
                    <div className="review-description-overall-bar-yellow" style={{ width: `${(0.9 / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              {/* <div className='review-description-description'>
              *Content Difficulty: higher = easier, lower = harder.
              </div> */}
            </div>
            </div>
          </div>
          <div className='review-description-ai-container'>
            <div className='review-description-ai-top'>
              <div className='review-description-ai-icon'><i className="fa-solid fa-head-side-brain fa-lg"></i></div>
              <div className='review-description-ai-text'>AI Summary</div>
            </div>
            <div className='review-description-ai-content'>
            COMPSCI 210 is a foundational and intellectually challenging course that explores how computers work at a low level, covering topics like logic gates, assembly language, and CPU architecture. Many students find it demanding but rewarding, as it bridges the gap between software and hardware. 
            </div>
          </div>
        </div>
        <div className="review-box-container">
          {reviewList?.map((review, index) => ( <ReviewBox key={index} review={review} /> ))}
        </div>
      </div>
    );
}