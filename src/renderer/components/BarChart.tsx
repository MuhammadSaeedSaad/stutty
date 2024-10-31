import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale, // Import the category scale
  LinearScale, // Import the linear scale for y-axis
  BarElement, // Import the bar element for bar charts
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  aspectRatio: 3.1,
  responsive: true,
  tension: 0.4,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Frequency',
      },
    },
    x: {
      title: {
        display: true,
        text: 'syllable time (s)',
      },
    },
  },
};

export default function BarChart({ chartingData }) {
  return <Bar data={chartingData} options={options} />;
}
