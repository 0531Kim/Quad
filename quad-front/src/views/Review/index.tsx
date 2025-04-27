import { useEffect, useState } from 'react';
import './style.css'
import ReviewBox from 'components/ReviewBox';
import getAllFacultyReviewResponseDto from 'apis/response/review/get-all-faculty-review.response.dto';
import { ResponseDto } from 'apis/response';
import { getAllFacultyReview, getCourseReview } from 'apis';
import ReviewListItem from 'types/interface/review-list-item.interface';
import MainTop from 'components/MainTop';
import SidebarBox from 'components/SideBar';
import MainRight from 'components/MainRight';
import { useNavigate, useParams } from 'react-router-dom';
import FacultyListBox from 'components/FacultyListBox';
import { codeToSubjectMap } from 'constant';
import getCourseReviewResponseDto from 'apis/response/review/get-course-review.response.dto';

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
    const [facultyFullName, setFacultyFullName] = useState<string>("")

    //          state: extract faculty name         //
    const activeFacultyKey = activeIndex !== null ? departments[activeIndex].name : null;
    const mappedFacultyName = activeFacultyKey ? facultyKeyMap[activeFacultyKey] : null;
    const activeReviewList = mappedFacultyName ? allFacultyReview[mappedFacultyName] || [] : [];

    const [reviewList, setReviewList] = useState<ReviewListItem[]>();

    // //          function: getAllFacultyReview          //
    // const getAllFacultyReviewResponse = (responseBody: getAllFacultyReviewResponseDto | ResponseDto | null) =>{
    //     if(!responseBody) return;
    //         const { code } = responseBody;
    //         if(code === 'DBE') alert('Database Error!');
    //         if(code !== 'SU') return;
        
    //     const { allFacultyReview } = responseBody as getAllFacultyReviewResponseDto;
    //     setAllFacultyReview(allFacultyReview);
    // }

    //          function: getAllFacultyReview          //
    const getCourseReviewResponse = (responseBody: getCourseReviewResponseDto | ResponseDto | null) =>{
        if(!responseBody) return;
            const { code } = responseBody;
            if(code === 'DBE') alert('Database Error!');
            if(code !== 'SU') return;
        
        const { reviewList } = responseBody as getCourseReviewResponseDto;
        setReviewList(reviewList);
    }

    useEffect(() => {
      if (courseCode) {
        const cleanedCourseCode = courseCode.replace(/\s+/g, '');
          getCourseReview({ courseName1: cleanedCourseCode }).then(getCourseReviewResponse);
      }
    }, []);

      useEffect(() => {
        if (faculty && facultyKeyMap[faculty]) {
          setFacultyFullName(facultyKeyMap[faculty])
        }
      }, [faculty])

    //          render          //
    return (
    <div className="review">
        <MainTop />
        <div className="review-bottom">
            <SidebarBox />
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
                        <div className='top-course-name fade-in'>{courseCode}</div>
                    </div>
                  </div>    
        <div className="review-box-container">
          {reviewList?.map((review, index) => ( <ReviewBox key={index} review={review} /> ))}
        </div>
        </div>
        <MainRight />
        </div>
    </div>
    );
}