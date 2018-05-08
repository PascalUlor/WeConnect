import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';


const browserHistory = createBrowserHistory();

export default class Home extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        {/* Section For Main Div Start */}
        <section id="cover">
          <div id="cover-caption">
            <h1 className="display-3">WeConnect</h1>
            <p>Enhance Your Business Reach With Just One Click</p>
            <div className="container">
              <div className="col-sm-10 offset-sm-2">

                <div className="cover-form col-sm-10">
                  <form action="">
                    <div className="input-group input-group-lg">
                      <label className="sr-only">Name</label>
                      <input type="text" className="form-control form-control-lg" placeholder="Search Businesses" />
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-primary btn-lg">Search</button>
                      </span>
                    </div>
                  </form>
                  <div className="row offset-sm-2">
                    <div className="offset-sm-2">
                      <small htmlFor="gridCheck">By Location</small>
                      <input type="checkbox" id="gridCheck" />
                    </div>
                    <div className="offset-sm-2">
                      <small htmlFor="gridCheck">By Category</small>
                      <input type="checkbox" id="gridCheck" />
                    </div>
                  </div>
                </div>

                <br />

                <Link to="nav-main" className="btn btn-secondary-outline btn-sm" role="button">&darr;</Link>
              </div>

            </div>
          </div>
        </section>
        {/* Section For Main Div End */}
      </Router>
    )
  }
}