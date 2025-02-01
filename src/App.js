import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import QuizRules from "./components/QuizRules"
import QuizQuestion from "./components/QuizQuestion"
import QuizResults from "./components/QuizResults"
import Background3D from "./components/Background3D"
import UserProfile from "./components/UserProfile"
import "./App.css"

function App() {
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userProfile, setUserProfile] = useState({
    xp: 0,
    level: 1,
    badges: [],
    streak: 0,
  })

  useEffect(() => {
    fetchQuizData()
    loadUserProfile()
    loadQuizProgress()
  }, [])

  const fetchQuizData = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/quiz")
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data")
      }
      const data = await response.json()
       // Add hints to each question
       const dataWithHints = {
        ...data,
        questions: data.questions.map((q) => ({
          ...q,
          hint: `Hint: Consider ${q.options.find((o) => o.is_correct).description.toLowerCase()}.`,
        })),
      }
      setQuizData(dataWithHints)
      setUserAnswers(new Array(dataWithHints.questions.length).fill(null))
      setLoading(false)
    } catch (error) {
      setError("Error fetching quiz data. Please try again later.")
      setLoading(false)
    }
  }

  const loadUserProfile = () => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
    }
  }

  const saveUserProfile = (newProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(newProfile))
    setUserProfile(newProfile)
  }

  const loadQuizProgress = () => {
    const savedProgress = localStorage.getItem("quizProgress")
    if (savedProgress) {
      const { currentQuestion, userAnswers, score } = JSON.parse(savedProgress)
      setCurrentQuestion(currentQuestion)
      setUserAnswers(userAnswers)
      setScore(score)
    }
  }

  const saveQuizProgress = () => {
    const progress = {
      currentQuestion,
      userAnswers,
      score,
    }
    localStorage.setItem("quizProgress", JSON.stringify(progress))
  }

  const handleAnswer = (answer) => {
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = answer
    setUserAnswers(newUserAnswers)
    saveQuizProgress()
  }

  const handleSubmit = () => {
    const currentQuestionData = quizData.questions[currentQuestion]
    const selectedAnswer = userAnswers[currentQuestion]
    const correctAnswer = currentQuestionData.options.find((option) => option.is_correct)

    if (selectedAnswer === correctAnswer.description) {
      setScore((prevScore) => prevScore + 5)
    } else if (selectedAnswer !== null) {
      setScore((prevScore) => prevScore - 2)
    }

    moveToNextQuestion()
  }

  const handleNext = () => {
    moveToNextQuestion()
  }

  const moveToNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeQuiz()
    }
    saveQuizProgress()
  }

  const completeQuiz = () => {
    setQuizCompleted(true)
    updateUserProfile()
    localStorage.removeItem("quizProgress")
  }

  const updateUserProfile = () => {
    const xpGained = score * 10
    const newProfile = {
      ...userProfile,
      xp: userProfile.xp + xpGained,
      streak: userProfile.streak + 1,
    }

    if (newProfile.xp >= newProfile.level * 1000) {
      newProfile.level += 1
    }

    if (newProfile.streak % 7 === 0) {
      newProfile.badges.push("Weekly Warrior")
    }
    if (score === quizData.questions.length * 5) {
      newProfile.badges.push("Perfect Score")
    }

    saveUserProfile(newProfile)
  }

  if (loading) {
    return <div className="loading">Loading quiz data...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <Router>
    <div className="app-container">
      <Canvas className="background-canvas">
        <Background3D />
      </Canvas>
      <Routes>
        <Route path="/" element={<QuizRules />} />
        <Route
          path="/quiz"
          element={
            quizCompleted ? (
              <QuizResults
                score={score}
                totalQuestions={quizData.questions.length}
                userAnswers={userAnswers}
                userProfile={userProfile}
                quizData={quizData}
              />
            ) : (
              <QuizQuestion
                question={quizData.questions[currentQuestion]}
                questionNumber={currentQuestion + 1}
                totalQuestions={quizData.questions.length}
                userAnswer={userAnswers[currentQuestion]}
                onAnswer={handleAnswer}
                onSubmit={handleSubmit}
                onNext={handleNext}
              />
            )
          }
        />
        <Route path="/profile" element={<UserProfile userProfile={userProfile} />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
