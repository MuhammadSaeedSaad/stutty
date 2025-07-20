/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { usePagination } from '../contexts/PaginationContext';
import { handleFileSelect } from '../utils';
import { useResultsContext } from '../contexts/ResultsContext';

export default function Question() {
  const [answer, setAnswer] = useState('no');
  const { setTotalPages, goToPage } = usePagination();
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

  const handleClick = async (
    event: any,
    isReadingTest: boolean,
  ): Promise<void> => {
    if (isReadingTest) setTotalPages(4);
    else setTotalPages(3);
    goToPage(2);
  };

  return (
    <div>
      <h1>Please select a Test</h1>
      <div className="selection-container">
        <button
          onClick={(e) => handleClick(e, false)}
          type="button"
          className="green-button"
        >
          Description Test Only
        </button>
        <button
          onClick={(e) => handleClick(e, true)}
          type="button"
          className="green-button"
        >
          Description and reading tests
        </button>
      </div>
    </div>
  );
}
