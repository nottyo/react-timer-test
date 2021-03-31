import React from 'react';
import './App.css';

type AppProps = {};

type AppState = {
  name: string;
  count: number;
}
export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      name: '',
      count: 9
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: React.MouseEvent) {
    event.preventDefault();
    try {
      let counter = 9;
      const id = setInterval(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        const json = await response.json();
        if (counter === 0) {
          clearInterval(id);
          return;
        }
        counter--;
        this.setState(state => ({
            name: json.title,
            count: counter,
        }));
      }, 1000);
    } catch (error) {
      alert('error');
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <span>Count: </span>
          <span data-testid="counter">{this.state.count}</span>
        </div>
        <div>
          <span>Name: </span>
          <span data-testid="name">{this.state.name}</span>
        </div>
        <div>
          <button onClick={this.handleClick} data-testid="click-me">Click Me</button>
        </div>
      </div>
    );
  }
}
  
