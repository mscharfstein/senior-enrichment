import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {chooseCampus} from '../reducers';
import ContentEditable from 'react-contenteditable';


export class SingleStudent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false
    }
    this.clickEdit = this.clickEdit.bind(this)
  }

  render() {
  // load the info for a given student
    return (
      <div>
        <h3>
          {this.props.selectedStudent.name}
        </h3>
        <div>Email: {this.props.selectedStudent.email}</div>
        <NavLink
          to={`/campuses/${this.props.selectedCampus.id}`}
          onClick={(e)=>{this.props.handleClick(e,this.props.selectedCampus)}}>Campus:  {this.props.selectedCampus.name}
        </NavLink>
        <div>
          <button
          type="edit"
          className="btn"
          onClick={this.clickEdit}
          >Edit
          </button>
        </div>
      </div>
    );
  }

  clickEdit(e) {
    this.setState({editable:true})
  }
}

const mapStateToProps = function(state) {
  return {
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleClick: function(evt, campus) {
      const action = chooseCampus(campus);
      dispatch(action);
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;

