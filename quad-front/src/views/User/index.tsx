import React from "react";
import "./style.css";

const UserView = () => {
  // 예시 데이터 (실제 데이터는 props 또는 API로 받아오세요)
  const user = {
    username: "Username",
    email: "abc@gmail.com",
    reviewCount: 7,
    myReviews: ["review1"],
    likedReviews: ["review2"],
    stats: {
      questions: 3,
      posts: 0,
      answers: 1,
      comments: 0,
      hearts: 3,
      endorsements: 0,
      daysVisited: 11,
    }
  };

  return (
    <div className="user-center-container">
      <div className="user-profile-block">
        <div className="user-profile-row">
          <div className="user-avatar" />
          <div className="user-profile-info">
            <div className="user-username">{user.username}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <button className="user-edit-profile-btn">edit profile</button>
        </div>
      </div>

      {/* 활동 통계 박스 */}
      <div className="user-stats-container">
        <div className="user-stats-box">
          <div className="user-stat">
            <div className="user-stat-value">{user.stats.questions}</div>
            <div className="user-stat-label">Reviews</div>
          </div>
          <div className="user-stat">
          <div className="user-stat-value">{user.stats.hearts}</div>
            <div className="user-stat-label">Likes</div>
          </div>
        </div>
      </div>

      <div className="user-section">
        <h2>My Reviews</h2>
        <div className="user-review-box">review</div>
      </div>
      <div className="user-section">
        <h2>Liked Review</h2>
        <div className="user-review-box">review</div>
      </div>
    </div>
  );
};

export default UserView;
