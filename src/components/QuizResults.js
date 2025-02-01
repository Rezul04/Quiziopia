import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import "./QuizResults.css"

ChartJS.register(ArcElement, Tooltip, Legend)

function QuizResults({ score, totalQuestions, userAnswers, userProfile, quizData }) {
  const attempted = userAnswers.filter((answer) => answer !== null).length
  const notAttempted = totalQuestions - attempted
  const correct = Math.floor(score / 5)
  const incorrect = attempted - correct

  const data = {
    labels: ["Correct", "Incorrect", "Not Attempted"],
    datasets: [
      {
        data: [correct, incorrect, notAttempted],
        backgroundColor: ["#4CAF50", "#F44336", "#9E9E9E"],
        hoverBackgroundColor: ["#45a049", "#da190b", "#7d7d7d"],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }

  return (
    <div className="quiz-results fade-in">
      <h2>Quiz Results</h2>
      <p className="score">
        Your score: {score} out of {totalQuestions * 5}
      </p>
      <div className="chart-container">
        <Pie data={data} options={chartOptions} />
      </div>
      <div className="results-summary">
        <div>
          <p>Total Questions: {totalQuestions}</p>
          <p>Attempted: {attempted}</p>
          <p>Not Attempted: {notAttempted}</p>
        </div>
        <div>
          <p>Correct Answers: {correct}</p>
          <p>Incorrect Answers: {incorrect}</p>
        </div>
      </div>
      <div className="user-progress">
        <h3>Your Progress</h3>
        <p>XP Gained: {score * 10}</p>
        <p>Current Level: {userProfile.level}</p>
        <p>Total XP: {userProfile.xp}</p>
        <p>Streak: {userProfile.streak} days</p>
      </div>
      <div className="badges">
        <h3>Badges Earned</h3>
        {userProfile.badges.map((badge, index) => (
          <span key={index} className="badge">
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

export default QuizResults

