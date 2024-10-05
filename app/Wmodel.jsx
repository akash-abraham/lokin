// src/WebcamObjectDetection.js
"use client"
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const WebcamObjectDetection = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);

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
          borderRadius:'30px'
        }}
      />
      <div>
        {detections.map((detection, index) => (
          <div key={index}>
            {detection.class} - {Math.round(detection.score * 100)}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebcamObjectDetection;
