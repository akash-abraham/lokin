"use client"
import React, { useRef, useState, useEffect,useCallback } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const WebcamObjectDetection = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [, setDetections] = useState([]);
  const [phoneWarning, setPhoneWarning] = useState(false); 

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

  
  // const detectObjects = async () => {
  //   if (
  //     webcamRef.current &&
  //     webcamRef.current.video.readyState === 4 &&
  //     model
  //   ) {
  //     const video = webcamRef.current.video;
  //     const predictions = await model.detect(video);
  //     setDetections(predictions);

  //     // Check if "cell phone" is detected
  //     const phoneDetected = predictions.some(
  //       (prediction) => prediction.class === 'cell phone'
  //     );

  //     if (phoneDetected) {
  //       setPhoneWarning(true); 
  //     } else {
  //       setPhoneWarning(false); 
  //     }
  //   }
  // };
  const detectObjects = useCallback(async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
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
        setPhoneWarning(true); 
      } else {
        setPhoneWarning(false); 
      }
    }
  }, [webcamRef, model]);
  
  useEffect(() => {
    detectObjects(); // Call the memoized function
  }, [detectObjects]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      detectObjects();
    }, 1000); // Detect objects every second
    return () => clearInterval(interval);
  }, [model,detectObjects]);

  return (
    <div>
      
      <Webcam
        ref={webcamRef}
        audio={false}
        style={{
          width: '340px',
          height: '280px',
          borderRadius: '30px',
          border: phoneWarning ? '4px solid red' : '4px solid green', 
        }}
      />
 
 
 
 
 
 
 

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
