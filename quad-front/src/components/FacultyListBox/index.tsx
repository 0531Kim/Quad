import { useEffect, useState } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import { FACULTY_PATH_WITH_CODE } from "constant";

interface FacultyListBoxProps {
  setHoveredFaculty: (facultyKey: string) => void;
  defaultFacultyKey?: string;
  notHoverClick: number;
}


const FacultyListBox = ({ setHoveredFaculty, defaultFacultyKey, notHoverClick }: FacultyListBoxProps) => {
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

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleMouseEnter = (index: number, name: string) => {
    if (notHoverClick === 0) {
      setActiveIndex(index);
      setHoveredFaculty(name);
    }
  };

  const handleClick = (index: number, name: string) => {
    setActiveIndex(index);
    setHoveredFaculty(name);
    if (notHoverClick === 1) {
      navigate(`/${FACULTY_PATH_WITH_CODE(name)}`);
    }
  };

  useEffect(() => {
    if (defaultFacultyKey) {
      const index = departments.findIndex(dept => dept.name === defaultFacultyKey);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [defaultFacultyKey]);

  return (
    <div className='review-faculty-wrapper'>
    <div className="review-faculty-list-box">
      {departments.map((department, index) => (
        <div
          key={index}
          className={`department-container ${activeIndex === index ? department.colorClass : ''}`}
          onMouseEnter={() => handleMouseEnter(index, department.name)}
          onClick={() => handleClick(index, department.name)}
        >
          <div className="department-text">{department.name}</div>
        </div>
      ))}
    </div>
          
    </div>
  );
};

export default FacultyListBox;