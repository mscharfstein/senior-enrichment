import axios from 'axios';

// ACTION TYPES
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// ACTION CREATORS
export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function dropCampus (campusId) {
  const action = { type: DELETE_CAMPUS, campusId };
  return action;
}

export function addCampus (campus) {
  const action = { type: ADD_CAMPUS, campus };
  return action;
}

export function updateCampus (campus) {
  const action = { type: UPDATE_CAMPUS, campus };
  return action;
}

// THUNK CREATORS
export function fetchCampuses () {

  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      })
  }
}

export function deleteCampus (campusId,history) {

  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(() => {
        const action = dropCampus(campusId);
        dispatch(action);
        history.push('/campuses')

      })
  }
}

export function postCampus (campus, history) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(addCampus(campus));
        history.push(`/campuses/${campus.id}`)
      });
  }
}

export function reviseCampus (campus) {
  return function thunk (dispatch) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(updateCampus(campus));
      });
  }
}


const reducer = function(state = [], action) {
  switch(action.type) {

    case GET_CAMPUSES:
      return action.campuses

    case DELETE_CAMPUS:
      const newCampusArray = state.filter(campus=>campus.id!==action.campusId);
      return newCampusArray

    case ADD_CAMPUS:
      return [...state,action.campus]

    case UPDATE_CAMPUS:
      const newCampusesArray = state.filter(campus=>action.campus.id!==campus.id);
      return [...newCampusesArray, action.campus]

    default:
      return state
  }
};

export default reducer;
