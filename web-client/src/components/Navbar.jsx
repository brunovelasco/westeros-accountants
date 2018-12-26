import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    let tableSelected = "";
    let chartsSelected = "";

    switch (this.props.redirectTo) {
      case "table":
        tableSelected = "selected";
        chartsSelected = "not-selected";
        break;
      case "charts":
        tableSelected = "not-selected";
        chartsSelected = "selected";
        break;
      case "rowData":
        tableSelected = "not-selected";
        chartsSelected = "not-selected";
        break;
      default:
        break;
    }
    return (
      <nav className="nav justify-content-end">
        <ul className="nav">
          <li className={"nav-item item-left " + tableSelected}>
            <button className="nav-link" onClick={() => this.props.handleRender("table")}>Tabela</button>
          </li>
          <p className="nav-link" id="divider">|</p>
          <li className={"nav-item item-right " + chartsSelected}>
            <button className="nav-link" onClick={() => this.props.handleRender("charts")}>Gráficos e Estatísticas</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar