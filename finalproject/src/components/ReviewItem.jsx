
import React from 'react';
import '../style/ReviewItem.css';

const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-header">
        <span className="reviewer-name">{review.User?.display_name || 'Anonymous'}</span>
        <span className="review-rating">⭐ {review.rating}/5</span>
        <span className="review-date">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;