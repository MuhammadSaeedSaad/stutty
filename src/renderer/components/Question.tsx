/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { usePagination } from '../contexts/PaginationContext';
import { handleFileSelect } from '../utils';
import { useResultsContext } from '../contexts/ResultsContext';

export default function Question() {
  const [answer, setAnswer] = useState('no');
  const { setTotalPages } = usePagination();
  const { setTotalResults } = useResultsContext();

  const handleFileSelection = async (event, type) => {
    const file = event.target.files[0];
    const fileData = await file.text(); // Assuming the file content is text
    const result = handleFileSelect(event, {
      filePath: file.name,
      data: fileData,
    });

    console.log(result);

    if (type === 'description') {
      setTotalResults((prevResults) => ({
        first: {
          min: {
            dRatio: result.tableData.dRatio,
            dAvgTime: result.tableData.dAvgTime,
          },
          all: result, // Save the result to totalResults.first.all
        },
        second: prevResults.second,
      }));
    } else if (type === 'reading') {
      setTotalResults((prevResults) => ({
        first: prevResults.first,
        second: {
          min: {
            dRatio: result.tableData.dRatio,
            dAvgTime: result.tableData.dAvgTime,
          },
          all: result, // Save the result to totalResults.first.all
        },
      }));
    }
  };

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
      <div className="radio-container">
        <label className="radio-label">
          <input
            type="radio"
            value="yes"
            checked={answer === 'yes'}
            onChange={() => setAnswer('yes')}
          />
          Yes
        </label>
        <label className="radio-label">
          <input
            type="radio"
            value="no"
            checked={answer === 'no'}
            onChange={() => setAnswer('no')}
          />
          No
        </label>
      </div>

      {answer === 'yes' && (
        <div className="selection-container">
          <button
            onClick={() => document.getElementById('description-file')?.click()}
            type="button"
            className="green-button"
          >
            Select Description File
          </button>
          <input
            type="file"
            id="description-file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelection(e, 'description')}
          />
          <button
            onClick={() => document.getElementById('reading-file')?.click()}
            type="button"
            className="green-button"
          >
            Select Reading File
          </button>
          <input
            type="file"
            id="reading-file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelection(e, 'reading')}
          />
        </div>
      )}
      {answer === 'no' && (
        <div className="selection-container">
          <button
            onClick={() => document.getElementById('description-file').click()}
            type="button"
            className="green-button"
          >
            Select Description File
          </button>
          <input
            type="file"
            id="description-file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelection(e, 'description')}
          />
        </div>
      )}
    </div>
  );
}
