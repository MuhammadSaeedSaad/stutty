/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import { useResultsContext } from '../contexts/ResultsContext';
import { calculateTotalScore, getSeverity } from '../utils';

type FinalResultsData = { totalScore: number; severity: string };

export default function FinalResults() {
  const [finalResultsData, setFinalResultsData] = useState<FinalResultsData>(
    {},
  );
  const [state, setState] = useState({ loading: true });

  const { totalResults } = useResultsContext();

  useEffect(() => {
    if (totalResults.first?.min) {
      setState(() => ({
        loading: false,
      }));
      let totalScore: number;
      let severity: string;
      totalScore = calculateTotalScore(totalResults);
      severity = getSeverity(totalScore);
      console.log('totalScore', totalScore, 'severity', severity);
      setFinalResultsData(() => {
        return { totalScore, severity };
      });
      // window.electron
      //   .loadCsv()
      //   .then((csvData: any[]) => {
      //     console.log('csvData', csvData);
      //     totalScore = calculateTotalScore(totalResults, csvData);
      //     severity = getSeverity(totalScore, csvData);
      //     console.log('totalScore', totalScore, 'severity', severity);
      //     setFinalResultsData(() => {
      //       return { totalScore, severity };
      //     });
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    }
  }, [totalResults]);

  if (state.loading) {
    return (
      <div>
        <h1>Final Results</h1>
        <br />
        <br />
        <br />
        <h2>Please select the analysis files first</h2>
      </div>
    );
  }

  return (
    <div className="final-results-table">
      <h1>Final Results</h1>
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1}>
            <td>Total score</td>
            <td>{finalResultsData.totalScore}</td>
          </tr>
          <tr key={2}>
            <td>Severity</td>
            <td>{finalResultsData.severity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
