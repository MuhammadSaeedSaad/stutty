import React, { useEffect, useState } from 'react';
import { useResultsContext } from '../contexts/ResultsContext';
import { calculateTotalScore, getSeverity } from '../utils';

type TableData = { header: string; value: string }[];
type FinalResultsData = { totalScore: number; severity: string };

const tableData: TableData = [{ header: '', value: '' }];

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
      const totalScore = calculateTotalScore(totalResults);
      const severity = getSeverity(totalScore);
      setFinalResultsData(() => {
        return { totalScore, severity };
      });
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
          {/* {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.header}</td>
              <td>{row.value}</td>
            </tr>
          ))} */}
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
