import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';


const browserHistory = createBrowserHistory();

class Navbar extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <nav className="navbar navbar-toggleable-md navbar-light fixed-top" id="nav-main">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="./index.html" className="navbar-brand">
            {/* <img src="./public/images/logo.jpg" width="50" height="40" class="d-inline-block align-center" alt="WeConnect Logo"> */}
            <span id="site-name">WeConnect</span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarItems">
            <ul className="navbar-nav mr-auto text-center">
              <li className="nav-item active">
                <Link to="./index.html" className="nav-link" id="homenav" style={{ color: "#0288D1" }}>Home
                            <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="./signin.html" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="./signup.html" className="nav-link">signup</Link>
              </li>
            </ul>
            <div className="nav-item">
              <Link to="./business-reg.html" className="nav-link btn btn-primary btn-sm" style={{ color: "white" }}>Register Business</Link>
            </div>
          </div>
        </nav>
      </Router>
    )
  }
}

export default Navbar;
