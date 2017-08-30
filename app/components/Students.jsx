import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteStudent, chooseStudent, chooseCampus} from '../reducers'

export function Students(props) {
  // loop through all of the students and call student component for each
  return (
    <div className="studentBox">
      {props.students.map((student, idx)=> {
        return (
          <span key={student.id}>
            <span>{idx}</span>
            <NavLink to={`/students/${student.id}`}
            onClick={(e) => {props.handleClickLink(e, student)}}
            >
            {student.name}
            </NavLink>
            <span>{student.campus.name}</span>
            <button onClick={(e)=>{props.handleClick(e,student)}}>X</button>
          </span>
        )
      })}
    <button>
      <NavLink to="/students/new-student">Add Student</NavLink>
    </button>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    students: state.students
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleClick: function(evt,student) {
      dispatch(deleteStudent(student));
    },
    handleClickLink: function(evt, student) {
      console.log("handling click!")
      dispatch(chooseStudent(student));
      dispatch(chooseCampus(student.campus));
    }
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default StudentsContainer;
