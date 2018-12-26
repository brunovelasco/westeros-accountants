import React, { Component } from "react";
import { Pie } from 'react-chartjs-2';

class ChartPie extends Component {
  render() {
    const data = this.props.csvABC;
    return (
      <div className="row pb-5 d-flex justify-content-center">
        <div className="col-12 chartWidth">
          <h4 className="d-flex justify-content-center chartTitle">Curva ABC (pessoas por grupo)</h4>
          <Pie
            data={{
              labels: ['Pessoas em A', 'Pessoas em B', 'Pessoas em C'],
              datasets: [{
                data: [data.peopleA, data.peopleB, data.peopleC],
                backgroundColor: [
                  '#4DC733',
                  '#EFDD3D',
                  '#EF8A3D',
                ],
              }],
            }}
            options={{
              maintainAspectRadio: false,
              legend: { display: true },
              scales: {
                yAxes: [{
                  ticks: {
                     max: data.peopleAll,
                     min: 0,
                     stepSize: 226,
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

export default ChartPie;
