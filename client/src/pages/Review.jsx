import React, { useContext, useState } from 'react';
import axios from 'axios';
import StarRating from '../components/Rating';
import Context from '../context/Context';

const ReviewForm = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(1);
  const [photos, setPhotos] = useState([]);
  const { token, buyCarId } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('comment', text);
      formData.append('rating', rating);
      formData.append('id', buyCarId);

      photos.forEach((photo, index) => {
        formData.append('Images', photo); // Use 'Images' here to match server's expectation
      });

      const response = await axios.post(
        `http://localhost:8000/car/review`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Review posted successfully');
      } else {
        alert('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      alert('Failed to post review');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    setPhotos([...photos, ...files]); // Append new files to existing photos array
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
        <input type="file" name='Images' accept="image/*" onChange={handleFileChange} multiple />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
