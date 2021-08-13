import React, { Component } from 'react';

import LineChart from './components/LineChart';
import PostForm from './components/PostForm';
import './App.css';

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric", timeZone: 'UTC' }
  return new Date(dateString).toLocaleDateString("en-US", options)
}
class App extends Component {

  constructor(props) {
    super(props);
    this.fetchWorkouts = this.fetchWorkouts.bind(this)
    this.state = {
      items: [],
      isLoaded: false,
      shouldRedraw: false,
    }
  }

  componentDidMount() {

    fetch('http://localhost:3000/workouts')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          shouldRedraw: false,
          items: json,
        })
      })

  }

  fetchWorkouts = () => fetch('http://localhost:3000/workouts')
  .then(res => res.json())
  .then(json => {
    this.setState({
      isLoaded: true,
      items: json,
    })
  })

  render() {

      var { isLoaded, items } = this.state;

      if (!isLoaded) {
        return<div>Loading...</div>
      }

      else{
        return (
          <div className="App">
            {/* <div>
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    {formatDate(item.date)}
                    <ul>
                      {item.exercises.map(exercise => (
                        <li key={exercise.id}>{exercise.name}: {exercise.weight}lbs</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
              <PostForm minDate={items[items.length-1].date} fetchWorkouts={this.fetchWorkouts} />
            </div>
            <div>
              <LineChart data={this.state.items} redraw={this.state.shouldRedraw} />
            </div>
          </div>
        );
      }
  }
}

export default App;
