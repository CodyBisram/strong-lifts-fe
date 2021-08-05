import React from 'react';
import { Line } from 'react-chartjs-2';

import { formatDate } from '../App.js';

const LineChart = (props) => {

  const squat_dates = props.data.map(data => formatDate(data.date))
  const squats = []
  const barbell_rows = []
  const bench_press = []
  const overhead_press = []
  const deadlift = []
  props.data.map((data) => 
    {return data.exercises.map(data => data.name === "Squat" ? squats.push(data.weight) : 
      (data.name === "Barbell Row" ? barbell_rows.push(data.weight) : 
      (data.name === "Bench Press" ? bench_press.push(data.weight) : 
      (data.name === "Overhead Press" ? overhead_press.push(data.weight) : 
      (data.name === "Deadlift" ? deadlift.push(data.weight) : null)))))}
  )

  const workout_a_dates = []
  const workout_b_dates = []
  props.data.map(data => {return data.workout_type === "A" ? workout_a_dates.push(formatDate(data.date)) : 
    data.workout_type === "B" ? workout_b_dates.push(formatDate(data.date)) : null  
  })

  return (
    <div>
      <div>
        <Line
          data={{
            labels:squat_dates,
            datasets: [{
              label: "Squats",
              data: squats,
              borderColor: 'red',
              backgroundColor: 'red',
              borderWidth: 1,
            },]
          }}
          height={400}
          width={600}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Overall Squat Progression'
              }
            }    
          }}
        />
      </div>
      <div>
        <Line
          data={{
            labels: workout_a_dates,
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
            }]
          }}
          height={400}
          width={600}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
        />
      </div>
      <div>
        <Line
          data={{
            labels: workout_b_dates,
            datasets: [{
              label: "Deadlift",
              data: deadlift,
              borderColor: 'brown',
              backgroundColor: 'brown',
              borderWidth: 1,
            },{
              label: "Overhead Press",
              data: overhead_press,
              borderColor: 'orange',
              backgroundColor: 'orange',
              borderWidth: 1,
            }]
          }}
          height={400}
          width={600}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Workout B Progression'
              }
            }        
          }}
        />
      </div>
    </div>
  )
}

export default LineChart;