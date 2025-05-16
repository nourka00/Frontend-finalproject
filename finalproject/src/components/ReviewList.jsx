// ReviewList.jsx
import React from 'react';
import ReviewItem from './ReviewItem';
import '../style/ReviewList.css';

const ReviewList = ({ reviews }) => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="review-list">
      <div className="rating-summary">
        <h3>Average Rating: {averageRating.toFixed(1)} ⭐</h3>
        <span>({reviews.length} reviews)</span>
      </div>
      
      <div className="reviews-container">
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
