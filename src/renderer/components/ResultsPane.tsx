/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import ResultsCharts from './ResultCharts';
import ResultsTable from './ResultsTable';
import { handleFileSelect, Results } from '../utils';
import '../styles/ResultsPane.css';

export default function ResultsPane() {
  const [results, setResults] = useState<Results>({
    tableData: null,
    chartsData: null,
  }); // State to hold results

  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    // Function to handle the file-opened event
    const handleFileOpened = (
      event: { preventDefault: () => void; readonly defaultPrevented: boolean },
      fileData: { filePath: string; data: string },
    ) => {
      const result = handleFileSelect(event, fileData); // Process file data
      // console.log('results.chartsData:', results.chartsData);
      setResults(result); // Update state with the results
      setState({ loading: false });
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
