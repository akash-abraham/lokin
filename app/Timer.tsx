"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function CountdownClock() {
  const { data: session } = useSession();
  console.log(session?.user?.email);
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [remainingTime, setRemainingTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0) // Store minutes as coins

  const playSound = () => {
    const audio = new Audio('alarm.wav') 
    audio.play()
  }

  const sendAmountToServer = useCallback(async (earnedCoins: number) => {
    try {
      const response = await fetch(`/api/coinadder?id=${session?.user?.email}&amount=${earnedCoins}`, {
        method: "GET"
      });
      const data = await response.json();
      console.log("Amount updated:", data);
    } catch (error) {
      console.error("Failed to update amount:", error);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && isRunning) {
      setIsRunning(false);
      playSound(); // Play sound when countdown reaches 0

      // Send the amount (coins) to the server based on minutes counted
      sendAmountToServer(amount);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingTime, amount, sendAmountToServer]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    setAmount(totalMinutes); // Set coins equivalent to the total minutes
    setRemainingTime(totalMinutes * 60); // Convert to seconds for countdown
  }

  const startCountdown = () => {
    if (remainingTime > 0) {
      setIsRunning(true);
    }
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  const { hours: hoursAngle, minutes: minutesAngle, seconds: secondsAngle } = (() => {
    const totalSeconds = remainingTime;
    const hours = (totalSeconds / 3600) % 12;
    const minutes = (totalSeconds % 3600) / 60;
    const seconds = totalSeconds % 60;

    return {
      hours: (hours * 30) + (minutes * 0.5), // 30 degrees per hour, 0.5 degrees per minute
      minutes: minutes * 6, // 6 degrees per minute
      seconds: seconds * 6, // 6 degrees per second
    }
  })();

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedTime ? selectedTime : "Select Time"}
            <Clock className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Set countdown time</h4>
              <p className="text-sm text-muted-foreground">Select the time for the countdown</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                className="col-span-2 h-8"
                onChange={(e) => handleTimeSelect(e.target.value)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clock UI */}
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="10"
              x2="50"
              y2="15"
              transform={`rotate(${i * 30} 50 50)`}
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="25"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${hoursAngle} 50 50)`}
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${minutesAngle} 50 50)`}
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="red"
            strokeWidth="1"
            strokeLinecap="round"
            transform={`rotate(${secondsAngle} 50 50)`}
          />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="text-2xl font-bold">{formatTime(remainingTime)}</div>

      <Button onClick={startCountdown} disabled={isRunning || remainingTime === 0}>
        {isRunning ? "Counting Down" : "Start Countdown"}
      </Button>
    </div>
  )
}

