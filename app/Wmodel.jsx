"use client"
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const WebcamObjectDetection = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [phoneWarning, setPhoneWarning] = useState(false); // State for phone warning

  const playSound = () => {
    const audio = new Audio('/warn.wav'); 
    audio.play();
  };

  useEffect(() => {
    // Load the COCO-SSD model
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Function to run object detection
  const detectObjects = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 && // Check if the video is ready
      model
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);
      setDetections(predictions);

      // Check if "cell phone" is detected
      const phoneDetected = predictions.some(
        (prediction) => prediction.class === 'cell phone'
      );

      if (phoneDetected) {
        setPhoneWarning(true); // Set warning state if phone is detected
      } else {
        setPhoneWarning(false); // Reset warning if no phone is detected
      }
    }
  };

  // Use useEffect to repeatedly run detection at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      detectObjects();
    }, 1000); // Detect objects every second
    return () => clearInterval(interval);
  }, [model]);

  return (
    <div>
      <h1>Object Detection with COCO-SSD</h1>
      <Webcam
        ref={webcamRef}
        audio={false}
        style={{
          width: '340px',
          height: '280px',
          borderRadius: '30px',
          border: phoneWarning ? '4px solid red' : '4px solid green', // Conditional border
        }}
      />
      <div>
        {detections.map((detection, index) => (
          <div key={index}>
            {detection.class} - {Math.round(detection.score * 100)}%
          </div>
        ))}
      </div>

      {/* Display warning if a phone is detected */}
      {phoneWarning && (
        
        <div style={{ color: 'red', marginTop: '20px' }}>
            {playSound()}
          🚫 Please avoid using your phone!
        </div>
      )}
      {(phoneWarning)}
    </div>
  );
};

export default WebcamObjectDetection;
