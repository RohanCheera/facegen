import React, { useState, useEffect } from 'react';
import '../styles/retrieve.css';

// Dynamically import all sample images
const importAll = (r) => r.keys().map(r);
const sampleImages = importAll(require.context('../assets/sample', false, /\.jpg$/));

function Retrieval() {
  const flag = true; // Simulating API success; set to false to test "not found"
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resultImages, setResultImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track which image's details to show

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      if (flag) {
        const shuffled = [...sampleImages].sort(() => 0.5 - Math.random());
        setResultImages(shuffled.slice(0, 5));
      }
    }, 3000);

    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % sampleImages.length
        );
      }, 100);
    }

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, [isLoading, flag]);

  // Fake data for each image
  const fakeData = [
    {
      accuracy: "90%",
      criminalName: "John Doe",
      features: [
        { name: "Eyes", accuracy: "95%" },
        { name: "Nose", accuracy: "92%" },
        { name: "Mouth", accuracy: "88%" },
        { name: "Jawline", accuracy: "87%" },
        { name: "Ears", accuracy: "85%" },
      ]
    },
    {
      accuracy: "87%",
      criminalName: "Jane Smith",
      features: [
        { name: "Eyes", accuracy: "90%" },
        { name: "Nose", accuracy: "88%" },
        { name: "Mouth", accuracy: "85%" },
        { name: "Cheekbones", accuracy: "84%" },
        { name: "Hairline", accuracy: "82%" },
      ]
    },
    {
      accuracy: "85%",
      criminalName: "Bob Johnson",
      features: [
        { name: "Eyes", accuracy: "89%" },
        { name: "Nose", accuracy: "87%" },
        { name: "Mouth", accuracy: "83%" },
        { name: "Chin", accuracy: "82%" },
        { name: "Forehead", accuracy: "80%" },
      ]
    },
    {
      accuracy: "82%",
      criminalName: "Alice Brown",
      features: [
        { name: "Eyes", accuracy: "87%" },
        { name: "Nose", accuracy: "85%" },
        { name: "Mouth", accuracy: "80%" },
        { name: "Jawline", accuracy: "79%" },
        { name: "Ears", accuracy: "77%" },
      ]
    },
    {
      accuracy: "80%",
      criminalName: "Mike Wilson",
      features: [
        { name: "Eyes", accuracy: "85%" },
        { name: "Nose", accuracy: "83%" },
        { name: "Mouth", accuracy: "78%" },
        { name: "Cheekbones", accuracy: "76%" },
        { name: "Hairline", accuracy: "75%" },
      ]
    }
  ];

  const handleInfoClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index); // Toggle details
  };

  return (
    <div className="retrieval-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="getimg-card generating">
            <img 
              src={sampleImages[currentImageIndex]} 
              alt="Loading" 
              className="generating-image"
            />
          </div>
          <p>Loading Results...</p>
        </div>
      ) : flag ? (
        <div className="results-display">
          <h2>Retrieved Matches</h2>
          <div className="results-grid">
            {resultImages.map((img, index) => (
              <div key={index} className="result-card">
                <div className="image-wrapper">
                  <img 
                    src={img} 
                    alt={`Result ${index + 1}`} 
                    className="result-image"
                  />
                  <button 
                    className="info-btn" 
                    onClick={() => handleInfoClick(index)}
                  >
                    i
                  </button>
                </div>
                {selectedImage === index && (
                  <div className="details-box">
                    <p><strong>Accuracy:</strong> {fakeData[index].accuracy}</p>
                    <p><strong>Criminal Name:</strong> {fakeData[index].criminalName}</p>
                    <p><strong>Top 5 Features Matched:</strong></p>
                    <ul>
                      {fakeData[index].features.map((feature, i) => (
                        <li key={i}>
                          {feature.name}: {feature.accuracy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2>Matches Not Found</h2>
          <div className="notfound-res">
            "Results Not Found"
          </div>
        </>
      )}
    </div>
  );
}

export default Retrieval;