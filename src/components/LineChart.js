import React from 'react';
import { Line } from 'react-chartjs-2';

import { formatDate } from '../App';

const LineChart = (props) => {

  const dates = props.data.map(data => formatDate(data.date))
  
  const squats = []
  const barbell_rows = []
  const bench_press = []
  const overhead_press = []
  const deadlift = []

  props.data.map((data) => data.workout_type === "A" ? data.exercises.map(data => data.name === "Barbell Row" ? 
    barbell_rows.push(data.weight) : null) : barbell_rows.push(null))
  props.data.map((data) => data.workout_type === "A" ? data.exercises.map(data => data.name === "Bench Press" ? 
    bench_press.push(data.weight) : null) : bench_press.push(null))
  props.data.map((data) => data.workout_type === "B" ? data.exercises.map(data => data.name === "Overhead Press" ? 
    overhead_press.push(data.weight) : null) : overhead_press.push(null))
  props.data.map((data) => data.workout_type === "B" ? data.exercises.map(data => data.name === "Deadlift" ? 
    deadlift.push(data.weight) : null) : deadlift.push(null))
  props.data.map((data) => data.exercises.map(data => data.name === "Squat" ? 
    squats.push(data.weight) : null))

  return (
    <div>
      <div>
        <Line
          data={{
            labels: dates,
            datasets: [{
              label: "Barbell Row",
              data: barbell_rows,
              borderColor: 'blue',
              backgroundColor: 'blue',
              borderWidth: 1,
            },{
              label: "Bench Press",
              data: bench_press,
              borderColor: 'green',
              backgroundColor: 'green',
              borderWidth: 1,
            },{
              label: "Deadlift",
              data: deadlift,
              borderColor: 'orange',
              backgroundColor: 'orange',
              borderWidth: 1,
            },{
              label: "Squats",
              data: squats,
              borderColor: 'red',
              backgroundColor: 'red',
              borderWidth: 1,
            },{
              label: "Overhead Press",
              data: overhead_press,
              borderColor: 'purple',
              backgroundColor: 'purple',
              borderWidth: 1,
            },]
          }}
          height={400}
          width={600}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            spanGaps: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Workout A Progression'
              }
            }        
          }}
          redraw={props.redraw}
        />
      </div>
    </div>
  )
}

export default LineChart;