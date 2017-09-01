import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../reducers';

export class NewCampusForm extends Component {
  constructor(props) {
    super(props)

    // maintain local state for input while writing
    this.state = {
      name: '',
      image: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
        <div className="form-group">
          <fieldset>
            <legend>New Campus</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.name}
                  className="form-control"
                  type="text"
                  onChange={this.handleChangeName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-2 control-label">Image File Name</label>
              <div className="col-xs-10">
                <input
                  value={this.state.image}
                  className="form-control"
                  onChange={this.handleChangeImage}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={this.state.name.length ? false : true}
                >
                  Add Campus
                  </button>
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    )
  }

  handleSubmit(e, state) {
    this.setState({name: '', image: ''});
    this.props.handleSubmit(e, state);
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeImage(e) {
    this.setState({ image: e.target.value });
  }

}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit: function (evt, state) {
      evt.preventDefault();
      dispatch(postCampus(state, ownProps.history));
    }
  }
}

const NewCampusFormContainer = connect(mapStateToProps, mapDispatchToProps)(NewCampusForm);

export default NewCampusFormContainer;

