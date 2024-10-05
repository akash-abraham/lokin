"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; 

const Timer = () => {
  const [time, setTime] = useState(0); 
  const [countdown, setCountdown] = useState(null); 
  const [isRunning, setIsRunning] = useState(false); 

  // Play sound when timer hits zero
  const playSound = () => {
    const audio = new Audio('/alarm.wav'); 
    audio.play();
  };

  // Countdown logic
  useEffect(() => {
    let interval = null;
    if (isRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Decrease every second
    } else if (countdown === 0) {
      playSound(); // Play sound when countdown reaches zero
      setIsRunning(false);
      clearInterval(interval); // Stop the interval
    }

    return () => clearInterval(interval); // Cleanup the interval
  }, [isRunning, countdown]);

  // Start the timer
  const handleStart = () => {
    setCountdown(time); // Set countdown value from user input
    setIsRunning(true); // Start the timer
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Countdown Timer</h1>
      
      {/* Input for user to set time */}
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
        disabled={isRunning} // Disable input when timer is running
        style={{
          width: '100px',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      />
      
      {/* ShadCN Button Component */}
      <Button 
        onClick={handleStart} 
        disabled={isRunning || time <= 0} 
        className="m-2" 
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Start
      </Button>

      {/* Display remaining time */}
      {countdown !== null && (
        <h2 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#333' }}>
          {countdown} seconds remaining
        </h2>
      )}
    </div>
  );
};

export default Timer;