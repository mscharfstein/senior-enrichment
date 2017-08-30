import React, { Component } from 'react';
import {connect} from 'react-redux';
import {postStudent} from '../reducers';

export class NewStudentForm extends Component {
  constructor(props) {
    super(props)
    // maintain local state for input while writing
    this.state = {
      name: '',
      email: '',
      campusId: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeCampus = this.handleChangeCampus.bind(this);
  }

  render () {
    return (
      <form onSubmit={(e)=>this.props.handleSubmit(e,this.state)}>
        <div className="form-group">
          <fieldset>
            <legend>New Student</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Email</label>
              <div className="col-xs-10">
                <input
                  className="form-control"
                  type="email"
                  onChange={this.handleChangeEmail}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Campus</label>
              <select value={this.state.campusId} onChange={this.handleChangeCampus} className="form-control" name="campus">
              <option>Choose Campus</option>
                {this.props.campuses.map(campus => {
                  return (
                    <option key={campus.id} value={campus.id}>{campus.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  >
                  Add Student
                  </button>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    )
  }

  handleChangeName (e) {
    this.setState({name:e.target.value});
  }

  handleChangeEmail (e) {
    this.setState({email:e.target.value});
  }

  handleChangeCampus (e) {
    this.setState({campusId:e.target.value});
  }

}

const mapStateToProps = function(state) {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleSubmit: function(evt, state) {
      evt.preventDefault();
      dispatch(postStudent(state, ownProps.history));
    }
  }
}

const NewStudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudentForm);

export default NewStudentFormContainer;

