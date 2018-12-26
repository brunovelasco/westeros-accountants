import React, { Component } from "react";
import axios from 'axios';
import Loading from './Loading.jsx';
import CSVTable from './CSVTable.jsx';
import Charts from './Charts.jsx';
import RowData from './RowData.jsx';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csvData:  [{ }],
      csvColumns: [{ }],
      rowData: [],
    }
  }

  componentDidMount() {
    // Set which API to call
    const apiCall = axios.create({
      baseURL: 'http://localhost:5000',
    });

    // Gets json
    apiCall.get('/get_csv_data')
      .then((response) => {
        this.setState({ csvData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

      // Gets columns names and its accessors
      apiCall.get('/get_csv_columns')
      .then((response) => {
        this.setState({ csvColumns: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Method used to control redirect within application
  handleRender = (state) => {
    this.props.handleRender(state);
  }

  // CSVTable uses this method so RowData knows which row to show to user
  handleRowData = (state) => {
    this.setState({ rowData: state });
  }

  render() {
    // Returns Loading in case states haven't received API data
    if (this.state.csvData === [{ }] && this.state.csvColumns === [{ }] && this.state.rowData === []) {
      return <Loading />
    }

    let component;

    // Conditional render
    if (this.props.redirectTo === "table") {
      component = <CSVTable 
        csvData={this.state.csvData} 
        csvColumns={this.state.csvColumns} 
        handleRender={this.handleRender} 
        handleRowData={this.handleRowData} />;
    } else if (this.props.redirectTo === "charts") {
      component = <Charts 
        csvData={this.state.csvData} 
        csvColumns={this.state.csvColumns}/>
    } else if (this.props.redirectTo === "rowData") {
      component = <RowData data={this.state.rowData} />
    }

    return (
      <div className="container">
        {component}
      </div>
    );
  }
}

export default Content;
