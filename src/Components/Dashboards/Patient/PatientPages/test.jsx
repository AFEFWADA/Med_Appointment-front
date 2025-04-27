import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserImages = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the images when the component mounts
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/appointments/images/${userId}`);
        setImages(response.data.images); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching images');
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId]); // Run the effect when the userId changes

  // Show loading or error message
  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>User Images</h3>
      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={image} alt={`User Image ${index + 1}`} />
          ))
        ) : (
          <p>No images found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserImages;
