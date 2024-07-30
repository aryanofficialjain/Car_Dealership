import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import Navbar from '../components/Navbar';
import Rating from '../components/Rating'; // Import Rating component

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const [suggestedCars, setSuggestedCars] = useState([]);
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const { id } = useParams();
  const { isAdmin, token, cartItems, setCartItems, setbuyCarId } = useContext(Context);
  const [isInCart, setIsInCart] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`https://car-dealership-server-utt2.onrender.com/car/car/${id}`);
        setCar(response.data);

        // Fetch reviews for the car based on car ID
        const reviewsResponse = await axios.get(`https://car-dealership-server-utt2.onrender.com/car/car/review/${id}`);
        setReviews(reviewsResponse.data);

        if (Array.isArray(cartItems)) {
          const foundInCart = cartItems.some(item => item._id === response.data._id);
          setIsInCart(foundInCart);
        } else {
          setCartItems([]); // Initialize cartItems as an empty array if not fetched correctly
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to fetch car details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetail();
  }, [id]);

  useEffect(() => {
    const fetchSuggestedCars = async () => {
      try {
        const response = await axios.get('https://car-dealership-server-utt2.onrender.com/car/allcars');
        const filteredCars = response.data.filter(c => c._id !== id);
        setSuggestedCars(filteredCars);
      } catch (error) {
        console.error('Error fetching suggested cars:', error);
        setError('Failed to fetch suggested cars.');
      }
    };

    fetchSuggestedCars();
  }, [id]);

  const handleAddToCart = async carId => {
    try {
      const response = await axios.post(
        'https://car-dealership-server-utt2.onrender.com/cart/additem',
        { carid: carId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data);
      setIsInCart(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setError('Failed to add item to cart.');
    }
  };

  const handleRemoveFromCart = async carId => {
    try {
      const response = await axios.delete('https://car-dealership-server-utt2.onrender.com/cart/deleteitem', {
        headers: { Authorization: `Bearer ${token}` },
        data: { itemId: carId }
      });
      setCartItems(response.data);
      setIsInCart(false);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove item from cart.');
    }
  };

  const handleBuyNow = (id) => {
    navigate('/address');
    setbuyCarId([id]) // Navigate to /address route when Buy Now button is clicked
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleclick = (id) => {
    navigate(`/car/car/${id}`);
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Car Details</h2>
        <div className="p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center mb-4">
              {car.carImages && car.carImages.length > 0 && (
                <img
                  src={`https://car-dealership-server-utt2.onrender.com/car/${car.carImages[0]}`}
                  alt={`${car.brand} ${car.type}`}
                  className="max-w-full h-auto rounded-lg"
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {car.carImages &&
                car.carImages.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    <img
                      src={`https://car-dealership-server-utt2.onrender.com/car/${image}`}
                      alt={`${car.brand} ${car.type} ${index}`}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold mb-2">{car.brand}</p>
            <p className="text-gray-300 mb-2">{car.type}</p>
            <p className="text-gray-400 mb-4">{car.description}</p>
            <p className="text-white mb-4">${car.price}</p>
            {!isAdmin && token && (
              <>
                {isInCart ? (
                  <button
                    onClick={() => handleRemoveFromCart(car._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAddToCart(car._id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 mr-4"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(car._id)}
                      className="bg-purple-900 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      Buy Now
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {reviews.map(review => (
                <div key={review._id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Rating rating={review.rating} /> {/* Display star rating */}
                    <span className="ml-2 text-white">Rating: {review.rating}</span>
                  </div>
                  <p className="text-gray-300 mb-2">{review.comment}</p>
                  <div className="flex space-x-2">
                    {/* {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={`https://car-dealership-server-utt2.onrender.com/car/${image[index]}`}
                        alt={`Review Images ${index}`}
                        className="max-w-full h-auto rounded-lg"
                      />
                    ))} */}
                  </div>
                  <p className="text-gray-400 mt-2">
                    Reviewed by: {review.reviewedBy.username} ({review.reviewedBy.email})
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Suggested Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suggestedCars.map(car => (
              <div
                key={car._id} onClick={ () => handleclick(car._id)}
                className="bg-black rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
              >
                <img
                  src={`https://car-dealership-server-utt2.onrender.com/car/${car.carImages[0]}`}
                  alt={`${car.brand} ${car.type}`}
                  className="max-w-full h-auto rounded-lg"
                />
                <div className="mt-2">
                  <p className="text-xl font-semibold">{car.brand}</p>
                  <p className="text-gray-300">{car.type}</p>
                </div>  
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
