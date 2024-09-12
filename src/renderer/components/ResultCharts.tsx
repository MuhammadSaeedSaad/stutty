import React from 'react';
import BarChart from './BarChart';

export default function ResultsCharts({ fluentData, dysFluentData }) {
  console.log('fluentData:', fluentData);
  console.log('dysFluentData:', dysFluentData);
  return (
    <div>
      <BarChart chartingData={dysFluentData} />
      <BarChart chartingData={fluentData} />
    </div>
  );
}
