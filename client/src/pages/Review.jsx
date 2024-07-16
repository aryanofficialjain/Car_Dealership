import React, { useContext, useState } from 'react';
import axios from 'axios';
import StarRating from '../components/Rating'; 
import Context from '../context/Context';

const ReviewForm = ({ carId }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(1); // Default rating
  const [photo, setPhoto] = useState(null);
  const { token, buyCarId } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('comment', text);
      formData.append('rating', rating);
      if (photo) {
        formData.append('Images', photo);
      }

      const response = await axios.post(`http://localhost:8000/car/review`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        {data: buyCarId}
      });

      if (response.status === 200) {
        alert('Review posted successfully');
        // Handle navigation or refresh to show updated reviews
      } else {
        alert('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      alert('Failed to post review');
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your review..." required />
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
