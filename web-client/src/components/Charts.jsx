import React, { Component } from "react";
import axios from 'axios';
import Loading from './Loading.jsx';
import ChartBar from './charts/ChartBar.jsx';
import ChartPie from './charts/ChartPie.jsx';
import ChartLine from './charts/ChartLine.jsx';
import ChartDoughnut from './charts/ChartDoughnut.jsx';

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csvABC:  [{ }],
      csvHouses: [{ }],
      csvGenders: [{ }],
    }
  }

  componentDidMount() {
    const apiCall = axios.create({
      baseURL: 'http://localhost:3001',
    });

    // Gets data calculations regarding ABC curve
    apiCall.get('/get_csv_abc_analysis')
      .then((response) => {
        this.setState({ csvABC: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

      // Gets quantity of people from each major house
      apiCall.get('/get_csv_houses')
      .then((response) => {
        this.setState({ csvHouses: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

      // Gets gender data
      apiCall.get('/get_csv_genders')
      .then((response) => {
        this.setState({ csvGenders: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // Returns Loading in case states haven't received API data
    if (this.state.csvABC === [{ }] && this.state.csvHouses === [{ }] && this.state.csvGenders === [{ }]) {
      return <Loading />
    }
    return (
      <div>
        <ChartPie csvABC={this.state.csvABC}/>
        <ChartBar csvABC={this.state.csvABC}/>
        <ChartLine csvHouses={this.state.csvHouses}/>
        <ChartDoughnut csvGenders={this.state.csvGenders}/>
      </div>
    );
  }
}

export default Charts;
