import React, { useState, useEffect } from 'react';
import { usePagination } from '../contexts/PaginationContext';

export default function Question() {
  const [answer, setAnswer] = useState('no');
  const { setTotalPages } = usePagination();

  useEffect(() => {
    if (answer === 'yes') {
      setTotalPages(4); // 4 pages if answer is yes
    } else {
      setTotalPages(3); // 3 pages if answer is no
    }
  }, [answer, setTotalPages]);

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
