import React, { Component } from 'react';

import LineChart from './components/LineChart';
import './App.css';

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
        console.log(json)
        this.setState({
          isLoaded: true,
          items: json,
        })
      })

  }

  render() {

      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

      var { isLoaded, items } = this.state;

      if (!isLoaded) {
        return<div>Loading...</div>
      }

      else{
        return (
          <div className="App">
            <div>
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    {formatDate(item.date)}
                    <ul>
                      {item.exercises.map(exercise => (
                        <li>{exercise.name}: {exercise.weight}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <LineChart/>
            </div>
          </div>
        );
      }
  }
}

export default App;
