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

  const { totalResults } = useResultsContext();

  useEffect(() => {
    console.log('inside useEffect of final results');
    const totalScore = calculateTotalScore(totalResults);
    const severity = getSeverity(totalScore);
    setFinalResultsData(() => {
      return { totalScore, severity };
    });
    console.log(finalResultsData);
  }, []);

  return (
    <div>
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
