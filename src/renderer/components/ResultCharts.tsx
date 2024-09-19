import React from 'react';
import BarChart from './BarChart';

export default function ResultsCharts({ fluentData, dysFluentData }) {
  return (
    <div>
      <BarChart chartingData={dysFluentData} />
      <BarChart chartingData={fluentData} />
    </div>
  );
}
