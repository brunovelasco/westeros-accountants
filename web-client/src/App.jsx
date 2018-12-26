import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Logo from './components/Logo.jsx';
import Content from './components/Content.jsx';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid noMargins">
        {<BrowserRouter>
          <Switch>
            <Route exact path="/" component={withNavbarAndLogo(Content)} />
          </Switch>
        </BrowserRouter>}
      </div>
    );
  }
}

export default App;

//HOC to wrap component in the Navbar and Logo components
function withNavbarAndLogo(WrappedComponent) {
  class withNavbarAndLogo extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        redirectTo: "table", // default option
      }
    }
  
    // Method used to control redirect within application
    // It is passed via props to other methods too
    handleRender = (state) => {
      this.setState({ redirectTo: state });
    }

    render() {
      return (
        <Fragment>
          <div className="container">
            <div className="row my-4">
              <div className="col-lg-6">
                <Logo handleRender={this.handleRender} redirectTo={this.state.redirectTo}/>
              </div>
              <div id="align-middle" className="col-lg-6">
                <Navbar handleRender={this.handleRender} redirectTo={this.state.redirectTo}/>
              </div>
            </div>
            <WrappedComponent handleRender={this.handleRender} redirectTo={this.state.redirectTo}/>
          </div>
        </Fragment>
      );
    }
  }

  withNavbarAndLogo.displayName = `withNavbarAndLogo(${getDisplayName(WrappedComponent)})`;
  return withNavbarAndLogo;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
