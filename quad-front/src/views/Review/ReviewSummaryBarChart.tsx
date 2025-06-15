import React from 'react';

type Option = {
  label: string;
  percent: number;
};

type QuestionData = {
  question: string;
  options: Option[];
};

interface ReviewSummaryBarChartProps {
  data: QuestionData[];
}

const ReviewSummaryBarChart: React.FC<ReviewSummaryBarChartProps> = ({ data }) => {
  return (
    <div className="review-summary-bar-chart">
      <div className="review-summary-bar-chart-grid">
        {data.map((q, i) => (
          <div key={i} className="review-summary-bar-chart-item">
            <div className="review-summary-bar-chart-question">{q.question}</div>
            {q.options.map((opt, j) => (
              <div key={j} className="review-summary-bar-chart-row">
                <span className="review-summary-bar-chart-label">{opt.label}</span>
                <div className="review-description-overall-bar-container review-summary-bar-chart-bar-container">
                  <div className="review-description-overall-bar-grey">
                    <div className="review-description-overall-bar-yellow" style={{ width: `${opt.percent}%` }}></div>
                  </div>
                </div>
                <span className="review-summary-bar-chart-percent">{opt.percent}%</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummaryBarChart; 