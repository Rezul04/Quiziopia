import { useState, useEffect } from "react"
import { LightBulbIcon } from "@heroicons/react/solid"
import Timer from "./Timer"
import "./QuizQuestion.css"

function QuizQuestion({ question, questionNumber, totalQuestions, userAnswer, onAnswer, onSubmit, onNext }) {
  const [selectedAnswer, setSelectedAnswer] = useState(userAnswer)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    setSelectedAnswer(userAnswer)
    setIsSubmitted(false)
    setShowHint(false)
    setTimeLeft(60) // Reset timer for each new question
  }, [question])

  const handleAnswerChange = (answer) => {
    if (!isSubmitted) {
      setSelectedAnswer(answer)
      onAnswer(answer)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null && !isSubmitted) {
      setIsSubmitted(true)
      onSubmit()
      setTimeLeft((prevTime) => prevTime + 20) // ✅ Add 20 seconds on submit
    }
  }

  const handleNext = () => {
    setTimeLeft((prevTime) => prevTime + 20) // ✅ Add 20 seconds on next
    onNext()
  }

  const handleTimeUp = () => {
    if (!isSubmitted) {
      handleSubmit()
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  return (
    <div className="quiz-question fade-in">
      <h2>
        Question {questionNumber} of {totalQuestions}
      </h2>
      <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
      <p className="question-text">{question.description}</p>
      <button onClick={toggleHint} className="hint-button">
        <LightBulbIcon className="h-5 w-5 mr-2" />
        Hint
      </button>
      {showHint && <p className="hint-text">{question.hint}</p>}
      <div className="options">
        {question.options.map((option) => (
          <label key={option.id} className="option">
            <input
              type="checkbox"
              checked={selectedAnswer === option.description}
              onChange={() => handleAnswerChange(option.description)}
              disabled={isSubmitted}
            />
            <span>{option.description}</span>
          </label>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} disabled={isSubmitted || selectedAnswer === null} className="submit-button">
          Submit
        </button>
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  )
}

export default QuizQuestion
