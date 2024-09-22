/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import ResultsCharts from './ResultCharts';
import ResultsTable from './ResultsTable';
import { handleFileSelect, MinSheetResults, Results } from '../utils';
// import '../styles/ResultsPane.css';
import { useResultsContext } from '../contexts/ResultsContext';

export default function ReadingResultsPane() {
  const [results, setResults] = useState<Results>({
    tableData: null,
    chartsData: null,
  }); // State to hold results

  const { totalResults, setTotalResults } = useResultsContext();

  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    // Function to handle the file-opened event
    const handleFileOpened = (
      event: { preventDefault: () => void; readonly defaultPrevented: boolean },
      fileData: { filePath: string; data: string },
    ) => {
      const result = handleFileSelect(event, fileData); // Process file data
      setResults(result); // Update state with the results
      setState({ loading: false });
      setTotalResults(() => {
        totalResults.second = {
          dRatio: result.tableData.dRatio,
          dAvgTime: result.tableData.dAvgTime,
        };
        return totalResults;
      });
      console.log(totalResults);
    };

    // Listen for file-opened events
    window.electron.onFileOpened(handleFileOpened);

    // Clean up the listener on component unmount
    return () => {
      window.electron.onFileOpened((...args) => {}); // Remove the listener
    };
  }, []);

  if (state.loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
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
  );
}
