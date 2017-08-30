import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {chooseStudent, chooseCampus, deleteCampus, reviseCampus} from '../reducers';

export class SingleCampus extends Component {
  // load the students for a given campus
  constructor(props) {
    super(props);
    this.state = {
      beingEdited: false,
      id: this.props.selectedCampus.id,
      name: this.props.selectedCampus.name,
      image: this.props.selectedCampus.image
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateImage = this.updateImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <div>
      <h3>
      {this.state.beingEdited ?
            <input
              value={this.state.name}
              onChange={this.updateName}>
            </input> :
            this.props.selectedCampus.name}
            Campus</h3>
      <div>Students:
      {this.props.students.map((student, idx)=> {
        return (
          <div key={student.id}>
            <span>{1+idx}-</span>
            <NavLink
            to={`/students/${student.id}`}
            onClick={(e)=>this.props.handleClick(e,student)}
            >
            {student.name}
            </NavLink>
          </div>
        )
      })}
      </div>

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

  updateImage(e) {
    this.setState({ image: e.target.value })
  }
}

const mapStateToProps = function(state) {
  return {
    selectedCampus: state.selectedCampus,
    students: state.students.filter(student=>student.campusId===state.selectedCampus.id),
    selectedStudent: state.selectedStudent,
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch,ownProps) {
  return {
    handleClick: function(e,student) {
      dispatch(chooseStudent(student));
      dispatch(chooseCampus(student.campus));
    },
    updateOnSubmit: function (evt, state) {
      dispatch(reviseCampus(state));
    },
    handleDelete: function(e,campusId) {
      dispatch(deleteCampus(campusId,ownProps.history));
    }

  }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;

