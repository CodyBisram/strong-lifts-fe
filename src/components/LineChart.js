import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  return (
    <div>
      <Line
        data={{
          labels:['Squat'],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}

export default LineChart;