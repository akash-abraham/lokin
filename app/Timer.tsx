"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Count from'@/components/cnmbr/Count'

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

  
  const sendAmountToServer = async (earnedCoins: number) => {
    try {
      const response = await fetch(`/api/coinadder?id=${session?.user?.email}&amount=${earnedCoins}`, {
        method: "GET"
      })
      const data = await response.json()
      console.log("Amount updated:", data)
    } catch (error) {
      console.error("Failed to update amount:", error)
    }
  }

  useEffect(() => {
    let interval: any

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (remainingTime === 0 && isRunning) {
      setIsRunning(false)
      playSound() // Play sound when countdown reaches 0
      
      // Send the amount (coins) to the server based on minutes counted
      sendAmountToServer(amount)
    }

    return () => clearInterval(interval)
  }, [isRunning, remainingTime, amount])

  // Handles time selection from the popover input
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    
    const [hours, minutes] = time.split(":").map(Number)
    const totalMinutes = hours * 60 + minutes
    setAmount(totalMinutes) // Set coins equivalent to the total minutes
    setRemainingTime(totalMinutes * 60) // Convert to seconds for countdown
  }

  // Starts the countdown
  const startCountdown = () => {
    if (remainingTime > 0) {
      setIsRunning(true)
    }
  }

  // Formats remaining time to HH:MM:SS format
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Calculate the angles of the clock hands
  const calculateHandAngles = () => {
    const totalSeconds = remainingTime
    const hours = (totalSeconds / 3600) % 12
    const minutes = (totalSeconds % 3600) / 60
    const seconds = totalSeconds % 60

    return {
      hours: (hours * 30) + (minutes * 0.5), // 30 degrees per hour, 0.5 degrees per minute
      minutes: minutes * 6, // 6 degrees per minute
      seconds: seconds * 6, // 6 degrees per second
    }
  }

  const { hours: hoursAngle, minutes: minutesAngle, seconds: secondsAngle } = calculateHandAngles()

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Time selection popover */}
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
              <p className="text-sm text-muted-foreground">
                Select the time for the countdown
              </p>
            </div>
            <div className="grid gap-2">
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
          </div>
        </PopoverContent>
      </Popover>

      {/* Clock UI */}
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Clock face */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          
          {/* Hour markers */}
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

          {/* Hour hand */}
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

          {/* Minute hand */}
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

          {/* Second hand */}
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

          {/* Center dot */}
          <circle cx="50" cy="50" r="2" fill="currentColor" />
        </svg>
      </div>

      {/* Time remaining display */}
      <div className="text-2xl font-bold">{formatTime(remainingTime)}</div>

      {/* Start Countdown Button */}
      <Button onClick={startCountdown} disabled={isRunning || remainingTime === 0}>
        {isRunning ? "Counting Down" : "Start Countdown"}
      </Button>
    </div>
  )
}
