import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {chooseCampus} from '../reducers';

export function Campuses(props) {
  // loop through all of the campuses and call campus component for each

  return (
    <div>
      {props.campuses.map(campus=> {

        return (
          <div className='col-md-6' className="campusBox" key={campus.id}>
            <NavLink
              to={`/campuses/${campus.id}`}
              onClick={(e) => {props.handleClick(e, campus)}}
              value={campus.id}>
              {campus.name}
            </NavLink>
          </div>
        )

      })}
      <button>
        <NavLink to="/campuses/new-campus">Add Campus</NavLink>
      </button>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleClick: function(evt, campus) {
      // const campus = state.campuss.find(campus=>campus.id===evt.target.value)
      const action = chooseCampus(campus);
      dispatch(action);
    }
  }
}

const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses);

export default CampusesContainer;


