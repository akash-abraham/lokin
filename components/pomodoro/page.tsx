import { useState, useEffect } from 'react';
import {Button} from '@/components/ui/button'; // Adjust this based on your actual file name

const Home = () => {
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const playSound = () => {
    const audio = new Audio('/alarm.mp3'); // Ensure alarm.mp3 is in the public folder
    audio.play();
  };

  useEffect(() => {
    let interval : NodeJS.Timeout | undefined;
    if (isRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      playSound();
      setIsRunning(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, countdown]);

  const handleStart = () => {
    setCountdown(time);
    setIsRunning(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Countdown Timer</h1>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
        disabled={isRunning}
        style={{
          width: '100px',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      />
      <Button onClick={handleStart} disabled={isRunning || time <= 0}>
        Start
      </Button>
      {countdown !== null && (
        <h2 style={{ marginTop: '20px', fontSize: '1.5rem', color: '#333' }}>
          {countdown} seconds remaining
        </h2>
      )}
    </div>
  );
};

export default Home;
