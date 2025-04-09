# Quiz App

Web-based quiz application with gamification features, built using React and Next.js.

## Features

- Fetches quiz data from an external API (https://api.jsonserve.com/Uw5CrX)
- Dynamic quiz questions with multiple-choice answers
- Timer for each question (1:30 minutes)
- Hint system for each question
- Progress bar to track quiz completion
- Scoring system with negative marking (+5 for correct, -2 for incorrect)
- User profile with XP, levels, and badges
- Streak tracking for consistent quiz-taking
- 3D animated background using React Three Fiber
- Responsive design for mobile and desktop
- Pie chart to visualize quiz results
- Local storage to persist quiz progress and user profile
- Quiz state persistence on page refresh during the quiz
- Quiz restart on refresh at the results page

## Refresh Behavior

- During the quiz: If the browser is refreshed, the quiz data and progress are preserved.
- On the results page: If the browser is refreshed, the quiz restarts with no stored data.

## Setup Instructions

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Server instantiate
    \`\`\`
   node server.js
   \`\`\`
4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
   
6. Or use the deployed link to access the website - https://quiziopia.netlify.app/
## Project Structure

- `src/`: Contains the main application code
  - `components/`: Reusable React components
  - `App.js`: Main application component
  - `index.js`: Entry point of the application
- `public/`: Static assets

## Technologies Used

- React
- Next.js
- React Three Fiber (for 3D animations)
- Chart.js (for result visualization)
- localStorage (for data persistence)

## How does the Quiz Website looks 
# Front Page 
![image](https://github.com/user-attachments/assets/9cb77bdf-7e79-4cd4-8b83-2961653136a6)
# Question Page (Questions via API)
![image](https://github.com/user-attachments/assets/a526b8c2-e5a5-4669-b150-435d62e4379c)
# Added Timer and Hint Effect
![image](https://github.com/user-attachments/assets/ae39d600-3c6b-419e-8a28-0eca03782360)
# Progress Tracker
![image](https://github.com/user-attachments/assets/31a44976-e03c-4921-acc1-5f6489254d81)
# Result Page 
![image](https://github.com/user-attachments/assets/b1c274df-a260-4d86-83bf-40dba2b403c4)

## Future Improvements

- Implement user authentication
- Add more quiz categories
- Create a leaderboard feature
- Enhance 3D animations and interactions
- Implement more diverse achievements and badges

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

