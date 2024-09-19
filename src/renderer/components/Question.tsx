import React, { useState } from 'react';

export default function Question() {
  const [answer, setAnswer] = useState('no');

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
    </div>
  );
}
