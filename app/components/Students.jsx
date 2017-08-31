import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent, chooseStudent, chooseCampus } from '../reducers'

export function Students(props) {
  // loop through all of the students and call student component for each
  return (
    <div >
      <button className="btn btn-default">
        <NavLink to="/students/new-student">Add Student</NavLink>
      </button>
      <table className="table table-condensed">
        <thead>
          <tr >
            <th className="text-center">
              <h3>#</h3>
            </th>
            <th className="text-center">
              <h3>Name</h3>
            </th>
            <th className="text-center">
              <h3>Email</h3>
            </th>
            <th className="text-center">
              <h3>Campus</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((student, idx) => {
            return (
              <tr key={student.id}>
                <td className="text-center">
                  <h4>{1 + idx}</h4>
                </td>
                <td className="text-center">
                  <NavLink to={`/students/${student.id}`}
                  >
                    <h4>{student.name}</h4>
                  </NavLink>
                </td>
                <td className="text-center">
                  <h4>{student.email}</h4>
                </td>
                <td className="text-center">
                  <Link to={`/campuses/${student.campus.id}`}>
                    <div>
                      <img width="5%" src={`/${student.campus.image}`} />
                      <h4 className="vcenter"> {student.campus.name}</h4>
                    </div>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>

    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    students: state.students
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleClick: function (evt, student) {
      dispatch(deleteStudent(student));
    }
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default StudentsContainer;
