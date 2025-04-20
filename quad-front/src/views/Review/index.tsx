import { useEffect, useState } from 'react';
import './style.css'
import ReviewBox from 'components/ReviewBox';
import getAllFacultyReviewResponseDto from 'apis/response/review/get-all-faculty-review.response.dto';
import { ResponseDto } from 'apis/response';
import { getAllFacultyReview } from 'apis';
import ReviewListItem from 'types/interface/review-list-item.interface';

//          Component: ReviewContainer          //
export default function ReviewContainer() {

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

    const facultyKeyMap: { [key: string]: string } = {
        ART: "Arts",
        BUS: "Business and Economics",
        CAI: "Creative Arts and Industries",
        EDU: "Education and Social Work",
        ENG: "Engineering",
        LAW: "Law",
        MED: "Medical and Health Sciences",
        SCI: "Science",
        GEN: "General",
    };

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


    // //      effect: executed on the first mount       //
    // useEffect(() => {
    //     getAllFacultyReview().then(getAllFacultyReviewResponse);
    // }, []);

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
    <div className="review-container">
        <div className="review-faculty-list-box">
            {departments.map((department, index) => (
            <div
                key={index}
                className={`department-container ${activeIndex === index ? department.colorClass : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
            >
            <div className="department-text">{department.name}</div>
            </div>
            ))}
        </div>
        <div className="review-box-container">
            {activeReviewList.map((review, index) => (
            <ReviewBox key={index} review={review} />
            ))}
        </div>
    </div>
    );
}