import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';

class CSVTable extends Component {
  onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        console.log('It was in this row:', rowInfo.original)
        this.props.handleRender("rowData");
        this.props.handleRowData(rowInfo.original);
      }
    }
  }
  
  render() {
    return (
      <div className="row pb-4 d-flex justify-content-center">
        <div className="col-12 reactTableColumn noMargins">    
          <ReactTable
            data={this.props.csvData}
            columns={this.props.csvColumns}
            className="-striped -highlight"
            showPagination={true}
            showPaginationTop={false}
            showPaginationBottom={true}
            showPageSizeOptions={true}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}
            previousText='Anterior'
            nextText='Próximo'
            loadingText='Carregando...'
            noDataText='Nenhuma linha encontrada'
            pageText='Página'
            ofText='de'
            rowsText='linhas'
            getTdProps={this.onRowClick}
          />
        </div>
      </div>
    );
  }
}

export default CSVTable;