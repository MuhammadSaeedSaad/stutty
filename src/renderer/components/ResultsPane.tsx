/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import ResultsCharts from './ResultCharts';
import ResultsTable from './ResultsTable';
import { handleFileSelect, Results } from '../utils';
// import '../styles/ResultsPane.css';
import { useResultsContext } from '../contexts/ResultsContext';
import { usePagination } from '../contexts/PaginationContext';

export default function ResultsPane() {
  const [results, setResults] = useState<Results>({
    tableData: null,
    chartsData: null,
  }); // State to hold results

  const { totalResults, setTotalResults } = useResultsContext();
  const { goToPage, currentPage } = usePagination();

  const [state, setState] = useState({ loading: true });

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

  // useEffect(() => {
  //   // Function to handle the file-opened event
  //   const handleFileOpened = (
  //     event: { preventDefault: () => void; readonly defaultPrevented: boolean },
  //     fileData: { filePath: string; data: string },
  //   ) => {
  //     const result = handleFileSelect(event, fileData); // Process file data
  //     setResults(result); // Update state with the results
  //     setState({ loading: false });
  //     setTotalResults(() => {
  //       totalResults.first.min = {
  //         dRatio: result.tableData.dRatio,
  //         dAvgTime: result.tableData.dAvgTime,
  //       };
  //       return totalResults;
  //     });
  //   };

  //   // Listen for file-opened events
  //   window.electron.onFileOpened(handleFileOpened);

  //   // Clean up the listener on component unmount
  //   return () => {
  //     window.electron.onFileOpened((...args) => {}); // Remove the listener
  //   };
  // }, []);

  useEffect(() => {
    if (totalResults.first?.all) {
      setResults(totalResults.first.all); // Update state with the results
      setState({ loading: false });
    }
  }, [totalResults]);

  if (state.loading) {
    return (
      <div>
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
        <h1>Description Results</h1>
        <br />
        <br />
        <br />
        <h2>Please select the description test data files</h2>
      </div>
    );
  }

  return (
    <>
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
      <div className="results-pane">
        <div className="results-table">
          <ResultsTable {...results.tableData} />
        </div>
        <div className="results-charts">
          <ResultsCharts
            fluentData={results.chartsData.fluentData}
            dysFluentData={results.chartsData.dysFluentData}
          />
        </div>
      </div>
      <div className="pagination">
        <button type="button" onClick={() => goToPage(currentPage + 1)}>
          Evaluate severity
        </button>
      </div>
    </>
  );
}
