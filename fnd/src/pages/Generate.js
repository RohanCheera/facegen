import React, { useState, useEffect, useRef } from 'react';
import '../styles/generate.css';
import GetimgTemplate from '../components/GetimgTemplate';
import Retrieval from './Retrieval';

const importAll = (r) => r.keys().map(r);
const sampleImages = importAll(require.context('../assets/sample', false, /\.jpg$/));

function Generate({ selectedImage }) { // Accept selectedImage as a prop
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRetrieval, setShowRetrieval] = useState(false);
  const retrievalRef = useRef(null);

  const targetImage = sampleImages[0];
  const MINIMUM_DURATION = 5000;
  const CYCLE_COUNT = 10;

  useEffect(() => {
    let interval;
    let startTime;
    let cycleCounter = 0;

    if (isGenerating) {
      startTime = Date.now();
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % sampleImages.length;
          if (nextIndex === 0) {
            cycleCounter++;
          }

          const elapsedTime = Date.now() - startTime;
          if (elapsedTime >= MINIMUM_DURATION && cycleCounter >= CYCLE_COUNT) {
            setIsGenerating(false);
            setFinalImage(targetImage);
            clearInterval(interval);
          }
          return nextIndex;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleAIGenerate = () => {
    setIsGenerating(true);
    setFinalImage(null);
    setCurrentImageIndex(0);
  };

  const handleFindMatch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowRetrieval(true);
      if (retrievalRef.current) {
        retrievalRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 3000);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sampleImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? sampleImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <h2>AI Image Generation</h2>
      <div className="generate-container">
        <div className="generate-actual-img">
          <GetimgTemplate selectedImage={selectedImage} /> {/* Pass selectedImage to GetimgTemplate */}
          <div className="prevnext-btn">
            <button className="dir-btn prev-btn" onClick={handlePrev}>Previous</button>
            <button className="dir-btn next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>

        <div className="generate-output-img">
          <div className={`getimg-card ${isGenerating ? 'generating' : ''}`}>
            {isGenerating ? (
              <img 
                src={sampleImages[currentImageIndex]} 
                alt="Generating" 
                className="generating-image"
              />
            ) : (
              finalImage ? (
                <img src={finalImage} alt="Generated" />
              ) : (
                <GetimgTemplate />
              )
            )}
          </div>
          <div className="prevnext-btn">
            <button className="dir-btn prev-btn" onClick={handlePrev}>Previous</button>
            <button className="dir-btn next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button 
          className="ai-generate-btn" 
          onClick={handleAIGenerate} 
          disabled={isGenerating || isLoading}
        >
          AI Generate
        </button>
        <button 
          className="find-btn" 
          onClick={handleFindMatch}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            'Find Match'
          )}
        </button>
      </div>
      {showRetrieval && (
        <div ref={retrievalRef}>
          <Retrieval />
        </div>
      )}
    </div>
  );
}

export default Generate;