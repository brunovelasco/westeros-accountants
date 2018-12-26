import React, { Component } from "react";

class Logo extends Component {
  // If user clicks on Logo, then it must redirect to table page
  handleRender = () => {
    this.props.handleRender("table");
  }

  render() {
    return (
      <div className="d-flex justify-content-center pointer" onClick={this.handleRender}>
        <img id="westeros-logo" src="images/westeros-logo.png" alt="Westeros Accountants logo"/>
        <img id="westeros-logo2" src="images/westeros-logo2.png" alt="Westeros Accountants logo"/>
      </div>
    );
  }
}

export default Logo;
