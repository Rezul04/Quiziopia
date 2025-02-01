import { useState, useEffect } from "react"
import "./Timer.css"

function Timer({ duration, onTimeUp, extendTime }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  
  useEffect(() => {
    if (extendTime) {
      setTimeLeft((prevTime) => prevTime + 20)
    }
  }, [extendTime])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="timer">
      Time left: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </div>
  )
}

export default Timer
