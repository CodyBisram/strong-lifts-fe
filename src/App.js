import React, { Component } from 'react';

import LineChart from './components/LineChart';
import './App.css';

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric", timeZone: 'UTC' }
  return new Date(dateString).toLocaleDateString("en-US", options)
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {

    fetch('http://localhost:3000/workouts')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      })

  }

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
              <LineChart data={items}/>
            </div>
          </div>
        );
      }
  }
}

export default App;
