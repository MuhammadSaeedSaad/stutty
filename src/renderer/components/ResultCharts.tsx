import React from 'react';
import BarChart from './BarChart';

export default function ResultsCharts({ fluentData, dysFluentData }) {
  return (
    <>
      <BarChart chartingData={dysFluentData} />
      <BarChart chartingData={fluentData} />
    </>
  );
}
