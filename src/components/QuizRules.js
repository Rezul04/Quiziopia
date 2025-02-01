import { Link } from "react-router-dom"
import "./QuizRules.css"

function QuizRules() {
  return (
    <div className="quiz-rules fade-in">
      <h1>Quiz Rules</h1>
      <ul>
        <li>There is negative marking: +5 for each correct answer and -2 for each wrong answer.</li>
        <li>You are given 1:30 minutes for each question.</li>
        <li>You can skip questions using the Next button. Skipped questions are counted as unattempted.</li>
        <li>The timer restarts when you submit an answer or move to the next question.</li>
        <li>Earn XP and level up as you complete quizzes!</li>
        <li>Unlock achievements and badges for your quiz performance.</li>
        <li>Keep a streak going for bonus rewards!</li>
      </ul>
      <Link to="/quiz" className="start-button">
        Start Quiz
      </Link>
    </div>
  )
}

export default QuizRules

