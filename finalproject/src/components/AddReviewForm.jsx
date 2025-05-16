import React, { useState } from 'react';
import '../style/AddReviewForm.css';

const AddReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setComment('');
  };

  return (
    <form className="add-review-form" onSubmit={handleSubmit}>
      <h3>Add Your Review</h3>
      
      <div className="rating-input">
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} ⭐</option>
          ))}
        </select>
      </div>
      
      <div className="comment-input">
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this course..."
          required
        />
      </div>
      
      <button type="submit" className="submit-review-btn">Submit Review</button>
    </form>
  );
};

export default AddReviewForm;