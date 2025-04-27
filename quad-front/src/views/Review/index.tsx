import { useEffect, useState } from 'react';
import './style.css'
import ReviewBox from 'components/ReviewBox';
import getAllFacultyReviewResponseDto from 'apis/response/review/get-all-faculty-review.response.dto';
import { ResponseDto } from 'apis/response';
import { getAllFacultyReview } from 'apis';
import ReviewListItem from 'types/interface/review-list-item.interface';
import MainTop from 'components/MainTop';
import SidebarBox from 'components/SideBar';
import MainRight from 'components/MainRight';
import { useNavigate, useParams } from 'react-router-dom';
import FacultyListBox from 'components/FacultyListBox';

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

    const navigate = useNavigate();

    const handleFacultyClick = (facultyKey: string) => {
        navigate(`/review/${facultyKey}`);        
    };

    const { faculty, studyCode } = useParams()

    //          state: btn active           //
    const [activeIndex, setActiveIndex] = useState<number | null>(Math.floor(Math.random() * departments.length));
    //          state: allFacultyReviewMap        //
    const [allFacultyReview, setAllFacultyReview] = useState<{ [faculty: string]: ReviewListItem[] }>({});

    //          state: extract faculty name         //
    const activeFacultyKey = activeIndex !== null ? departments[activeIndex].name : null;
    const mappedFacultyName = activeFacultyKey ? facultyKeyMap[activeFacultyKey] : null;
    const activeReviewList = mappedFacultyName ? allFacultyReview[mappedFacultyName] || [] : [];

    //          function: getAllFacultyReview          //
    const getAllFacultyReviewResponse = (responseBody: getAllFacultyReviewResponseDto | ResponseDto | null) =>{
        if(!responseBody) return;
            const { code } = responseBody;
            if(code === 'DBE') alert('Database Error!');
            if(code !== 'SU') return;
        
        const { allFacultyReview } = responseBody as getAllFacultyReviewResponseDto;
        setAllFacultyReview(allFacultyReview);
    }

    useEffect(() => {
        getAllFacultyReview().then((res) => {
          const response = res as getAllFacultyReviewResponseDto;
          if (!response || !response.allFacultyReview) {
            return;
          }
      
          getAllFacultyReviewResponse(response);
        });
      }, []);

    //          render          //
    return (
    <div className="review">
        <MainTop />
        <div className="review-bottom">
            <SidebarBox />
        <div className="review-container">
        <FacultyListBox setHoveredFaculty={() => {}} defaultFacultyKey={faculty} notHoverClick={1} />
        <div className="review-box-container">
            {activeReviewList.map((review, index) => (
            <ReviewBox key={index} review={review} />
            ))}
        </div>
        </div>
        <MainRight />
        </div>
    </div>
    );
}