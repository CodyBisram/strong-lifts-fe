import React from 'react';
import { Line } from 'react-chartjs-2';

import { formatDate } from '../App.js';

const LineChart = (props) => {

  const labels = props.data.map(data => formatDate(data.date))
  const squats = []
  props.data.map((data) => 
    {return data.exercises.map(data => data.name === "Squat" ? squats.push(data.weight) : null)}
  )

  return (
    <div>
      <Line
        data={{
          labels:labels,
          datasets: [{
            label: "Squats",
            data: squats,
            borderColor: 'red',
            backgroundColor: 'red',
          }]
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