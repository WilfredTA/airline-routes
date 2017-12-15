import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';

class App extends Component {


  formatValue(property, value){
    if (property==='airline'){
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }




  render() {
    const perPage = 25;
    const columns = [
      {name: "Airline", property: 'airline'},
      {name: "Source Airport", property: 'src'},
      {name: "Destination Airport", property: 'dest'}
    ];
    const rows = DATA.routes;
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <RoutesTable
            perPage={perPage}
            className="routes-table"
            columns={columns}
            rows={rows}
            format={this.formatValue}
            />
        </section>
      </div>
    );
  }
}

class RoutesTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  };

  nextPage = (event) => {
      event.preventDefault();
      console.log('next clicked')
      this.setState(function(prevState){
        return {page: prevState.page + 1};
      });
    }

    prevPage = (event) => {
      event.preventDefault();
      this.setState(function(prevState){
        return {page: prevState.page - 1};
      });
  }


  render(){
    const start = this.state.page * this.props.perPage;
    const columns = this.props.columns.map((col) => {
      return (
        <th>
          {col.name}
        </th>
      )
    })
    const rows = this.props.rows.slice(start, start + this.props.perPage).map((row) => {
      return (
        <tr>
          <td>{this.props.format('airline', row.airline)}</td>
          <td>{this.props.format('airport', row.src)}</td>
          <td>{this.props.format('airport', row.dest)}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              {columns}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      <div>  Showing {start + 1} - {start+25} of {this.props.rows.length} routes</div>
      <div className="pagination">
        <button disabled={this.state.page === 0} onClick={this.prevPage}>
          Previous
        </button>
        <button disabled={start + this.props.perPage >= this.props.rows.length} onClick={this.nextPage}>
          Next
        </button>
      </div>
    </div>
    )
  }
}

export default App;
