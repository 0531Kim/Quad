import React from 'react';

type Option = {
  label: string;
  percent: number;
};

type TopChoiceData = {
  label: string;
  options: Option[];
};

interface ReviewOverallTopChoicesProps {
  data: TopChoiceData[];
}

const ReviewOverallTopChoices: React.FC<ReviewOverallTopChoicesProps> = ({ data }) => {
  return (
    <div className="review-description-overall-top-choices-container">
      {data.map((item, idx) => (
        <div className="review-description-overall-top-choice-item" key={idx}>
          <div className="review-description-overall-top-choice-label">{item.label}</div>
          <div className="review-description-overall-top-choice-bars">
            {item.options.map((opt, j) => (
              <div className="review-description-overall-top-choice-bar-item" key={j}>
                <div className="review-description-overall-top-choice-bar-label">{opt.label}</div>
                <div className="review-description-overall-top-choice-bar-container">
                  <div className="review-description-overall-top-choice-bar" style={{ width: `${opt.percent}%` }}></div>
                </div>
                <div className="review-description-overall-top-choice-bar-percentage">{opt.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewOverallTopChoices; 