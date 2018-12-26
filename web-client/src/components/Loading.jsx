import React, { Component } from "react";
import ReactLoading from "react-loading";

class Loading extends Component {
  render() {
    return (
      <div className="centerContent">
        <ReactLoading type="spin" color="blue" height={100} width={100} />
      </div>
    );
  }
}

export default Loading;
