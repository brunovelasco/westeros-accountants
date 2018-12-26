import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';

class ChartDoughnut extends Component {
  render() {
    const data = this.props.csvGenders;
    return (
      <div className="row pb-5 d-flex justify-content-center">
        <div className="col-12 chartWidth">
          <h4 className="d-flex justify-content-center chartTitle">Sexo das pessoas</h4>
          <Doughnut
            data={{
              labels: Object.keys(data),
              datasets: [{
                data: Object.values(data),
                backgroundColor: [
                  '#C3327E',
                  '#006498',
                ],
              }],
            }}
            options={{
              maintainAspectRadio: false,
              legend: { display: true },
            }}
          />
        </div>
      </div>
    );
  }
}

export default ChartDoughnut;
