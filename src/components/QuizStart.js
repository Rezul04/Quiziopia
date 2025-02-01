function QuizStart({ onStart, description }) {
    return (
      <div className="quiz-start">
        <p>{description}</p>
        <button onClick={onStart}>Start Quiz</button>
      </div>
    )
  }
  
  export default QuizStart
  
  