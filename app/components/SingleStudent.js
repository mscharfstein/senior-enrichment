import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { chooseCampus, reviseStudent, deleteStudent } from '../reducers';
import ContentEditable from 'react-contenteditable';
import axios from 'axios';

export class SingleStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beingEdited: false,
      id: '',
      name: '',
      email: '',
      campus: { name: '', id: '' },
      campusId: '',
      selectedStudent: { campus: { name: '' } }
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateCampus = this.updateCampus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const studentId = this.props.getStudentId()

    axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        this.setState({ name: student.name, id: student.id, email: student.email, campus: student.campus, selectedStudent: student, campusId: student.campus.id })
      })
      .catch(() => {
        throw new Error("problem getting student")
      })
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.beingEdited ?
            <input
              value={this.state.name}
              onChange={this.updateName}>
            </input> :
            this.state.name}
        </h3>
        <div>
          <h4>Email: <small>
            {this.state.beingEdited ?
              <input
                value={this.state.email}
                onChange={this.updateEmail}>
              </input> :
              this.state.email}
          </small>
          </h4>
        </div>
        <div>
          <h4>Campus:
        <small>
              {this.state.beingEdited ?
                <form className="form-inline">
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
                </form>
                :

                <NavLink
                  to={`/campuses/${this.state.campusId}`}>  {this.state.campus.name}
                </NavLink>}
            </small>
          </h4>
        </div>
        <div>

          {this.state.beingEdited ?
            <div><button
              type="submit"
              className="btn btn-default"
              onClick={this.handleSubmit}
            >Submit
          </button>
              <button
                type="delete"
                className="btn btn-default"
                onClick={(e) => this.props.handleDelete(e, this.state.id)}
              >Delete
          </button>
            </div> :
            <div><button
              type="edit"
              className="btn btn-default"
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
    const campus = this.props.campuses.filter(campus => +campus.id === +e.target.value)
    this.setState({ campus: campus[0], campusId: campus[0].id })
  }
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses,
    students: state.students
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    updateOnSubmit: function (evt, state) {
      dispatch(reviseStudent(state));
    },
    handleDelete: function (evt, studentId) {
      dispatch(deleteStudent(studentId, ownProps.history));
    },
    getStudentId: function () {
      return ownProps.match.params.studentid;
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;

