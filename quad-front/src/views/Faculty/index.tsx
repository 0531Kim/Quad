import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { useEffect, useMemo, useState } from "react";
import { getStudiesByFaculty } from "apis";
import getStudiesByFacultyResponseDto from "apis/response/review/get-studies-by-faculty.response.dto";
import { ResponseDto } from "apis/response";
import StudiesByFaculty from "types/interface/studies-by-faculty-item.interface";
import FacultyListBox from "components/FacultyListBox";
import {subjectCodeMap, STUDY_PATH } from "constant";

export default function FacultyView() {

    const navigator = useNavigate();

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

    const { facultyName } = useParams();

    const defaultFacultyKey = useMemo(() => {
        if (facultyName && facultyKeyMap[facultyName]) {
        return facultyName;
        }
        const keys = Object.keys(facultyKeyMap);
        return keys[Math.floor(Math.random() * keys.length)];
    }, []);

    const [hoveredFaculty, setHoveredFaculty] = useState<string>(defaultFacultyKey);
    const [faculty, setFaculty] = useState<string>("");
    const [studies, setStudies] = useState<StudiesByFaculty>({});

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
      };

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
      };

    //          function          //
    const getStudiesByFacultyResponse = (responseBody : getStudiesByFacultyResponseDto | ResponseDto | null) => {
        if(!responseBody) return;
        const { code } = responseBody;
        if(code === 'DBE') alert('Database Error!');
        if(code !== 'SU') return;
        
        const { studyList } = responseBody as getStudiesByFacultyResponseDto;
        setStudies(studyList);
    }

    const onStudyonClick = (studyCode: string) => {
        navigator(STUDY_PATH(hoveredFaculty, studyCode));
    }

    //          effect          //
    useEffect(() => {
        if (hoveredFaculty && facultyKeyMap[hoveredFaculty]) {
            setFaculty(facultyKeyMap[hoveredFaculty]);
        }
    }, [hoveredFaculty]);

    useEffect(() => {
        getStudiesByFaculty().then(getStudiesByFacultyResponse)
    }, [])

    useEffect(() => {
        if(facultyName && facultyKeyMap[facultyName]) {
        setHoveredFaculty(facultyName);
        setFaculty(facultyKeyMap[facultyName]);
        }
    }, [facultyName]);
    
    const currentFacultyKey = hoveredFaculty ?? 'ART';

    return(
                <div className='faculty-view-container'>
                    <FacultyListBox setHoveredFaculty={setHoveredFaculty} defaultFacultyKey={hoveredFaculty} notHoverClick = {0}/>
                    <div className='faculty-view-container-top'>
                        <div className='faculty-view-review-text-container'>
                            {/* <i className="fa-regular fa-lg fa-pencil"></i> */}
                            <div className='faculty-view-review-text-title'>
                                Course Review
                            </div>
                        </div>
                        <div className='faculty-view-text-box'>
                            <i className={`fa-solid ${facultyIconMap[hoveredFaculty]} faculty-icon`} style={{ color: facultyColorMap[hoveredFaculty] }}></i>
                            <div className='faculty-view-text-container'>
                                <div className='faculty-view-title'>{facultyKeyMap[hoveredFaculty]}</div>
                                <div className="faculty-view-description">
                                    {facultyDescriptionMap[hoveredFaculty]}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='faculty-view-container-mobile-text-container'>
                        <div className='faculty-view-container-mobile-text'>
                            {facultyKeyMap[hoveredFaculty]}
                        </div>
                    </div>
                    <div className='faculty-view-container-bot'>
                    {faculty && studies && studies[faculty] && [...studies[faculty]]
                        .sort((a, b) => a.localeCompare(b))
                        .map((studyName, index) => (
                        <div key={index} className='study-name-box' onClick={() => {
                            const mappedCode = subjectCodeMap[studyName];
                            onStudyonClick(mappedCode);
                        }}>
                            <div className='study-name-box-dot' style={{ backgroundColor: facultyColorMap[hoveredFaculty as string] }}></div>
                            <div className='studies-in-faculty'>{studyName}</div>
                        </div>
                        ))
                        }
</div>
                </div>
    )
}