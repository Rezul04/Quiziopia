import { Link } from "react-router-dom"
import "./UserProfile.css"

function UserProfile({ userProfile }) {
  return (
    <div className="user-profile fade-in">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p>Level: {userProfile.level}</p>
        <p>XP: {userProfile.xp}</p>
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
      <Link to="/" className="back-button">
        Back to Quiz
      </Link>
    </div>
  )
}

export default UserProfile

