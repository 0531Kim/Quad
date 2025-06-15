import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { FACULTY_PATH_WITH_CODE } from 'constant';

const facultyColorMap = {
  ART: 'rgb(164, 30, 50)',
  BUS: 'rgb(133, 0, 99)',
  CAI: 'rgb(229, 102, 11)',
  EDU: 'rgb(83, 161, 27)',
  ENG: 'rgb(74, 42, 116)',
  LAW: 'rgb(3, 97, 143)',
  MED: 'rgb(2, 131, 132)',
  SCI: 'rgb(0, 85, 160)',
  GEN: 'rgb(207, 199, 10)',
};

const departments = [
  'ART', 'BUS', 'CAI', 'EDU', 'ENG', 'LAW', 'MED', 'SCI', 'GEN'
];

interface FacultyTreeProps {
  selectedFaculty: string;
  onSelectFaculty: (facultyKey: string) => void;
  className?: string;
}

const FacultyTree: React.FC<FacultyTreeProps> = ({ selectedFaculty, onSelectFaculty, className }) => {
  const navigate = useNavigate();
  return (
    <div className={`faculty-tree-list ${className || ''}`}>
      {departments.map((faculty) => {
        const key = faculty as keyof typeof facultyColorMap;
        return (
          <div
            key={faculty}
            className={`faculty-tree-item${selectedFaculty === faculty ? ' selected' : ''}`}
            onClick={() => {
              onSelectFaculty(faculty);
              navigate(`/${FACULTY_PATH_WITH_CODE(faculty)}`);
            }}
          >
            <span
              className="faculty-tree-dot"
              style={{ backgroundColor: facultyColorMap[key] }}
            />
            <span className="faculty-tree-label">{faculty}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FacultyTree;
