import React from 'react';

interface FinalResultsProps {
  resultsData: { header: string; value: string }[];
}

export default function FinalResults({ resultsData }: FinalResultsProps) {
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
          {resultsData.map((row, index) => (
            <tr key={index}>
              <td>{row.header}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
