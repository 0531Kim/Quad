import { useState } from 'react';
import './style.css'
import ReviewBox from 'components/ReviewBox';

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

    const [activeIndex, setActiveIndex] = useState<number | null>(Math.floor(Math.random() * departments.length));

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
        <ReviewBox />
    </div>
    );
}