import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';

class ChartBar extends Component {
  render() {
    const data = this.props.csvABC;
    return (
      <div className="row pb-5 d-flex justify-content-center">
        <div className="col-12 chartWidth">
          <h4 className="d-flex justify-content-center chartTitle">Curva ABC (patrimônio em %)</h4>
          <Bar
            data={{
              labels: ['Patrimônio em A', 'Patrimônio em B', 'Patrimônio em C'],
              datasets: [{
                data: [data.totalAPercent, data.totalBPercent, data.totalCPercent],
                backgroundColor: [
                  '#2E6F99',
                  '#892C9D',
                  '#DE3959',
                ],
              }],
            }}
            options={{
              maintainAspectRadio: false,
              legend: { display: false },
              scales: {
                yAxes: [{
                  ticks: {
                     max: 100,
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

export default ChartBar;
