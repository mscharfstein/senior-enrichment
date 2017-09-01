import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { chooseStudent, chooseCampus, deleteCampus, reviseCampus } from '../reducers';
import axios from 'axios';

export class SingleCampus extends Component {

  constructor(props) {
    super(props);

    this.state = {
      beingEdited: false,
      selectedCampus: {},
      id: '',
      name: '',
      image: 'Enter Image Name',
      relevantStudents: []
    }

    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateImage = this.updateImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderStudents = this.renderStudents.bind(this)
  }

  componentDidMount() {
    const campusId = this.props.getCampusId()

    // get campus
    axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        this.setState({ selectedCampus: campus, name: campus.name, id: campus.id, image: campus.image })
      })
      .catch(() => {
        throw new Error("problem getting campus")
      })

    // get students
    axios.get(`/api/campuses/${campusId}/students`)
      .then(res => res.data)
      .then(students => {
        console.log('printing students', students)
        this.setState({ relevantStudents: students })
      })
      .catch(() => {
        throw new Error("problem getting students")
      })

  }

  render() {

    return (
      <div>
        <h2 className="text-center">
          {this.state.beingEdited ?
            <input
              value={this.state.name}
              onChange={this.updateName}>
            </input> :
            this.state.name}
        </h2>
        <div className="text-center">
          {this.state.beingEdited ?
            <input
              value={this.state.image}
              onChange={this.updateImage}>
            </input> :
            <img src={`/${this.state.image}`} />}
        </div>
        <div className="px-2">
          <h3> Students: </h3>
          <div> {this.renderStudents(this.state.relevantStudents)} </div>
        </div>

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
            >Delete Campus
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
    );
  }

  renderStudents(students) {
    return (
      <div className="studentBox">
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
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
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

  updateImage(e) {
    this.setState({ image: e.target.value })
  }
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses,
    students: state.students,
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {

  return {
    updateOnSubmit: function (evt, state) {
      dispatch(reviseCampus(state));
    },
    handleDelete: function (e, campusId) {
      dispatch(deleteCampus(campusId, ownProps.history));
    },
    getCampusId: function () {
      return ownProps.match.params.campusid;
    }
  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;

