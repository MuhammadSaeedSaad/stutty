import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionProps {
  setHasReadingResults: (value: boolean) => void;
}

export default function Question({ setHasReadingResults }: QuestionProps) {
  const [answer, setAnswer] = useState('no');
  const navigate = useNavigate();

  const handleNext = () => {
    setHasReadingResults(answer === 'yes');
    navigate('/results');
  };

  return (
    <div>
      <h1>Do you have reading stuttering results of the patient?</h1>
      <label>
        <input
          type="radio"
          value="yes"
          checked={answer === 'yes'}
          onChange={() => setAnswer('yes')}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="no"
          checked={answer === 'no'}
          onChange={() => setAnswer('no')}
        />
        No
      </label>
      <div className="footer-buttons">
        <button disabled>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
