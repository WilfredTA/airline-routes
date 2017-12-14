import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

class App extends Component {
  render() {
    const columns = ['Airline', 'Source Airport', 'Destination Airport'];
    const rows = DATA.routes;
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <RoutesTable
            columns={columns}
            rows={rows}
            />
        </section>
      </div>
    );
  }
}

class RoutesTable extends Component {

  render(){
    const columns = this.props.columns.map((col) => {
      return (
        <th>
          {col}
        </th>
      )
    })
    const rows = this.props.rows.map((row) => {
      return (<tr>
        <td>{row.airline}</td>
        <td>{row.src}</td>
        <td>{row.dest}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            {columns}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default App;
