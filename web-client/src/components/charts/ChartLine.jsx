import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

class ChartLine extends Component {
  render() {
    const data = this.props.csvHouses;
    return (
      <div className="row pb-5 d-flex justify-content-center">
        <div className="col-12 chartWidth">
          <h4 className="d-flex justify-content-center chartTitle">Pessoas por casa</h4>
          <Line
            data={{
              labels: Object.keys(data),
              datasets: [{
                data: Object.values(data),
                backgroundColor: [
                  'rgba(0, 0, 0, 0)',
                ],
                borderColor: [ "#303030" ],
              }],
            }}
            options={{
              maintainAspectRadio: false,
              legend: { display: false },
              scales: {
                yAxes: [{
                  ticks: {
                     max: 40,
                     min: 0,
                     stepSize: 10,
                  }
                }]
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default ChartLine;
