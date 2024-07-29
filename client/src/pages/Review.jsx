import React, { useContext, useState } from 'react';
import axios from 'axios';
import StarRating from '../components/Rating';
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ReviewForm = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(1);
  const [photos, setPhotos] = useState([]);
  const { token, buyCarId } = useContext(Context);
  const navigate = useNavigate();

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
        `https://car-dealership-server-03td.onrender.com/car/review`,
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
        navigate("/");
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <Navbar/>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Write a Review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Write your review..."
            required
          />
          
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
          
          <div className="flex items-center space-x-2">
            <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">Upload Photos:</label>
            <input
              type="file"
              id="fileInput"
              name="Images"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
