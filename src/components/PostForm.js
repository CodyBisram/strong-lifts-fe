import React, { useState } from 'react';
import Axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const addDays = (dateString) => {
  var minDate = new Date(dateString)
  minDate.setDate(minDate.getDate() + 3)
  return minDate
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function PostForm(props) {
  const url = "http://localhost:3000/workouts"
  const [data, setData] = useState({
    date: "",
    workout_type: "",
    exercises: [
      {"name": "",
      "weight": 0},
      {"name": "",
      "weight": 0},
      {"name": "",
      "weight": 0}
    ],
  })

  const [selectedDate, setSelectedDate] = useState(null)
  const [workoutType, setWorkoutType] = useState(null)
  var minDate = addDays(props.minDate)

  const handleChange = (type) => {
    type === workoutType ? setWorkoutType(null) : setWorkoutType(type);
    setData(prevState => ({
      ...prevState,
      workout_type: type 
    }))
  };

  function handle(e){
    if(workoutType === "A"){
      setData(prevState => ({
        ...prevState,
        exercises: prevState.exercises.map(
          (el,index) => (index === parseInt(e.target.id) && index === 0) ? { ...el, name: "Bench Press", weight: parseInt(e.target.value) } : 
          (index === parseInt(e.target.id) && index === 1  ? { ...el, name: "Barbell Row", weight: parseInt(e.target.value) } : 
          (index === parseInt(e.target.id) && index === 2  ? { ...el, name: "Squat", weight: parseInt(e.target.value) } : el)))}))}

      if(workoutType === "B"){
        setData(prevState => ({
          ...prevState,
          exercises: prevState.exercises.map(
            (el,index) => (index === parseInt(e.target.id) && index === 0) ? { ...el, name: "Overhead Press", weight: parseInt(e.target.value) } : 
            (index === parseInt(e.target.id) && index === 1  ? { ...el, name: "Deadlift", weight: parseInt(e.target.value) } : 
            (index === parseInt(e.target.id) && index === 2  ? { ...el, name: "Squat", weight: parseInt(e.target.value) } : el)))}))}
  }

  function handleDate(date) {
    setSelectedDate(date)
    setData(prevState => ({
      ...prevState,
      date: formatDate(date) 
    }))
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      workout: {date: data.date,
      workout_type: data.workout_type,
      exercises: data.exercises}
    })
    .then(res => {
      console.log(res.data)
      props.fetchWorkouts();
    })
  }

  return(
    <div>
      <form onSubmit={(e) => submit(e)}>
        <DatePicker 
          selected={selectedDate} 
          onChange={date => handleDate(date)}
          dateFormat='yyyy-MM-dd'
          minDate={minDate}/>
          <label>
            Workout A
            <input type="checkbox" checked={workoutType === "A"} onChange={() => handleChange("A")} value={data.workout_type || ""}/>
          </label>
          <label>
            Workout B
            <input type="checkbox" checked={workoutType === "B"} onChange={() => handleChange("B")} value={data.workout_type || ""}/>
          </label>
          {workoutType === "A" && 
          <div>
            <div>
            Bench Press: <input id="0" onChange={(e)=>handle(e)} placeholder="Weight (lbs)" type="number"></input>
            </div>
            <div>
            Barbell Row: <input id="1" onChange={(e)=>handle(e)} placeholder="Weight (lbs)" type="number"></input>
            </div>
            <div>
            Squat: <input id="2" onChange={(e)=>handle(e)} placeholder="Weight (lbs)" type="number"></input>
            </div>
          </div>
          }
          {workoutType === "B" && 
          <div>
            <div>
            Overhead Press: <input id="0" onChange={(e)=>handle(e)} placeholder="Weight (lbs)" type="number"></input>
            </div>
            <div>
            Deadlift: <input id="1" onChange={(e)=>handle(e)} placeholder="Weight (lbs)" type="number"></input>
            </div>
            <div>
            Squat: <input id="2" onChange={(e)=>handle(e)} placeholder="Weight (lbs)" type="number"></input>
            </div>
          </div>
          }
          <button>Submit</button>
      </form>
    </div>
  );
}

export default PostForm;