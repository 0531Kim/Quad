import React from 'react';

export type Option = {
  label: string;
  percent: number;
  isHighlighted: boolean;
};

export type TableData = {
  category: string;
  options: Option[];
};

interface ReviewOverallTableProps {
  data: TableData[];
}

const ReviewOverallTable: React.FC<ReviewOverallTableProps> = ({ data }) => {
  return (
    <table className="review-overall-table">
      <tbody>
        {data.map((cat, i) => {
          const maxIdx = cat.options.reduce(
            (maxIdx, opt, idx, arr) => opt.percent > arr[maxIdx].percent ? idx : maxIdx,
            0
          );
          return (
            <tr key={i}>
              <td className="review-overall-table-category">{cat.category}</td>
              {cat.options.map((opt, j) => (
                <td
                  key={j}
                  className={
                    "review-overall-table-choice" +
                    (opt.isHighlighted ? " review-overall-table-choice--highlight" : "")
                  }
                >
                  {opt.label}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReviewOverallTable; 