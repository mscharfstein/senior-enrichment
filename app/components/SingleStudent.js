import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { chooseCampus, reviseStudent, deleteStudent } from '../reducers';
import ContentEditable from 'react-contenteditable';


export class SingleStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beingEdited: false,
      id: this.props.selectedStudent.id,
      name: this.props.selectedStudent.name,
      email: this.props.selectedStudent.email,
      campusId: this.props.selectedStudent.campus.id
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateCampus = this.updateCampus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    // load the info for a given student
    return (
      <div>
        <h3>
          {this.state.beingEdited ?
            <input
              value={this.state.name}
              onChange={this.updateName}>
            </input> :
            this.props.selectedStudent.name}
        </h3>
        <div>Email:
        {this.state.beingEdited ?
            <input
              value={this.state.email}
              onChange={this.updateEmail}>
            </input> :
            this.props.selectedStudent.email}

        </div>
        <div>Campus:
        {this.state.beingEdited ?
            <select className="form-control" name="campus"
            value={this.state.campusId}
            onChange={this.updateCampus}>
              {this.props.campuses.map(campus => {
                return (
                  <option key={campus.id} value={campus.id}>{campus.name}
                  </option>
                )
              })}
            </select>
            :

            <NavLink
              to={`/campuses/${this.props.selectedCampus.id}`}
              onClick={(e) => { this.props.handleClick(e, this.props.selectedCampus) }}>  {this.props.selectedCampus.name}
            </NavLink>}
        </div>
        <div>

        {this.state.beingEdited ?
          <div><button
            type="submit"
            className="btn"
            onClick={this.handleSubmit}
          >Submit
          </button>
          <button
            type="delete"
            className="btn"
            onClick={(e)=>this.props.handleDelete(e,this.state.id)}
          >Delete
          </button>
          </div> :
          <div><button
            type="edit"
            className="btn"
            onClick={this.toggleEdit}
          >Edit
          </button>
        </div>}
        </div>
      </div>
    );
  }

  toggleEdit(e) {
    this.setState({ beingEdited: true })
  }

  handleSubmit(e) {
    this.props.updateOnSubmit(e, this.state);
    this.setState({ beingEdited: false })
  }

  updateName(e) {
    this.setState({ name: e.target.value })
  }

  updateEmail(e) {
    this.setState({ email: e.target.value })
  }

  updateCampus(e) {
    this.setState({ campusId: e.target.value })
  }
}

const mapStateToProps = function (state) {
  return {
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus,
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleClick: function (evt, campus) {
      const action = chooseCampus(campus);
      dispatch(action);
    },
    updateOnSubmit: function (evt, state) {
      dispatch(reviseStudent(state));
    },
    handleDelete: function(evt, studentId) {
      dispatch(deleteStudent(studentId, ownProps.history));
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;

