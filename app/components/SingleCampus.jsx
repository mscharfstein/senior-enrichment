import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {chooseStudent, chooseCampus, deleteCampus} from '../reducers';

export function SingleCampus(props) {
  // load the students for a given campus
  return (
    <div>
    <h3>{props.selectedCampus.name} Campus</h3>
    {props.students.map((student, idx)=> {
      return (
        <div key={student.id}>
          <span>{1+idx}-</span>
          <NavLink
          to={`/students/${student.id}`}
          onClick={(e)=>props.handleClick(e,student)}
          >
          {student.name}
          </NavLink>
        </div>
      )
    })}
    <button
    type="delete" className="btn btn-delete"
    onClick={(e)=>props.handleDelete(e,props.selectedCampus)}
    >
      Delete
    </button>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    selectedCampus: state.selectedCampus,
    students: state.students.filter(student=>student.campusId===state.selectedCampus.id),
    selectedStudent: state.selectedStudent
  }
}

const mapDispatchToProps = function(dispatch,ownProps) {
  return {
    handleClick: function(e,student) {
      dispatch(chooseStudent(student));
      dispatch(chooseCampus(student.campus));
    },
    handleDelete: function(e,campus) {
      dispatch(deleteCampus(campus,ownProps.history));
    }

  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;

