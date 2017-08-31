import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { chooseCampus } from '../reducers';

export class Campuses extends Component {
  // loop through all of the campuses and call campus component for each
  constructor(props) {
    super(props);
    this.renderAddCampusButton = this.renderAddCampusButton.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    console.log('props when i go back to campuses', this.props);
    return (
      <div>
        <div className="p10">
        {this.renderAddCampusButton()}
        </div>
        <div className="container">
          {this.props.campuses.map(campus => {
            return (
              <div key={campus.id}>
                {this.renderRow(campus)}
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  renderAddCampusButton() {
    return (
      <button className="btn btn-default">
        <NavLink to="/campuses/new-campus">Add Campus</NavLink>
      </button>
    )
  }

  renderRow(campus) {

    return (
      <div className='col-md-4 text-center' >
        <NavLink to={`/campuses/${campus.id}`}
          value={campus.id}
        >
          <h3>{campus.name}</h3>
          <img src={`/${campus.image}`} />
        </NavLink>
      </div>
    )
  }

}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses,
    selectedCampus: state.selectedCampus
  }
}

const CampusesContainer = connect(mapStateToProps)(Campuses);

export default CampusesContainer;


