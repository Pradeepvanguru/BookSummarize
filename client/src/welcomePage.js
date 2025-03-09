import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const fullText = "Summarize books effortlessly and extract key insights instantly.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-text">
      <h1 className="welcome-title">📚 Book Summarization Platform</h1>
      <p className="ai-text">{displayText}</p>
      <button className="start-button" onClick={() => navigate('/summury')}>Get Started 🚀</button>
      </div>

      

     <style>
  {
    `
    .welcome-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-image: url('https://t4.ftcdn.net/jpg/10/89/30/47/240_F_1089304782_SJUVE3Q7Qjmuit9PCExyQAynZxKmsVWI.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      text-align: center;
      font-family: 'Arial', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .welcome-title {
      font-size: 3rem;
      font-weight: bold;
      animation: fadeIn 2s ease-in-out;
    }

    .welcome-text {
      padding:20px;
      color: #fff;
      text-shadow: 0 0 15px  rgba(241, 4, 4, 0.5);
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 1.5;
      margin-bottom: 20px;
     background-color: rgba(20, 14, 7, 0.28);
      box-shadow:0 0 5px 10px rgba(228, 184, 184, 0.5),0 0 50px 10px rgb(11, 254, 201);
    }

    .ai-text {
      font-size: 1.2rem;
      margin-top: 10px;
      animation: typingEffect 3s steps(40, end);
      overflow: hidden;
      white-space: nowrap;
      border-right: 2px solid white;    
    }

    .start-button {
      margin-top: 20px;
      padding: 12px 24px;
      font-size: 1.2rem;
      background:rgb(255, 51, 0);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.1s;
      animation: slideUp 1.5s ease-in-out;
    }

    .start-button:hover {
      background: rgb(72, 77, 34);
      transform: scale(1.05);
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes typingEffect {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }

    @keyframes slideUp {
      0% {
        transform: translateY(20px);
      }
      100% {
        transform: translateY(0);
      }
    }
  `
  }
</style>
    </div>
  );
}

export default WelcomePage;