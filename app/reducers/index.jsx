import { combineReducers } from 'redux';
import axios from 'axios';


// INITIAL STATE
const initialState = {
  students: [],
  campuses: [],
  selectedCampus: {},
  selectedStudent: {}
}

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const WRITE_STUDENT = 'WRITE_STUDENT';
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const ADD_CAMPUS = 'ADD_CAMPUS';
const CHOOSE_CAMPUS = 'CHOOSE_CAMPUS';
const CHOOSE_STUDENT = 'CHOOSE_STUDENT';

// ACTION CREATORS
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function dropStudent (student) {
  const action = { type: DELETE_STUDENT, student };
  return action;
}

export function dropCampus (campus) {
  const action = { type: DELETE_CAMPUS, campus };
  return action;
}

export function addStudent (student) {
  const action = { type: ADD_STUDENT, student };
  return action;
}

export function addCampus (campus) {
  const action = { type: ADD_CAMPUS, campus };
  return action;
}

export function chooseCampus (campus) {
  const action = { type: CHOOSE_CAMPUS, campus };
  return action;
}

export function chooseStudent (student) {
  const action = { type: CHOOSE_STUDENT, student };
  return action;
}

// THUNK CREATORS
export function fetchStudents () {

  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      })
  }
}

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

export function deleteCampus (campus,history) {

  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campus.id}`)
      .then(() => {
        const action = dropCampus(campus);
        dispatch(action);
        history.push('/campuses')

      })
  }
}

export function deleteStudent (student,history) {

  return function thunk (dispatch) {
    return axios.delete(`/api/students/${student.id}`)
      .then(() => {
        const action = dropStudent(student);
        dispatch(action);
        history.push('/students')
      })
  }
}

export function postStudent (student, history) {
  return function thunk (dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => {
        dispatch(addStudent(student));
        dispatch(chooseStudent(student));
        dispatch(chooseCampus(student.campus));
        history.push(`/students/${student.id}`)
      })
  }
}

export function postCampus (campus, history) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(campus => {
        dispatch(addCampus(campus));
        dispatch(chooseCampus(campus));
        history.push(`/campuses/${campus.id}`)
      });
  }
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return Object.assign({},state,{students: action.students})

    case GET_CAMPUSES:
      return Object.assign({},state,{campuses: action.campuses})

    case DELETE_STUDENT:
      const newStudentsArray = state.students.filter(student=>student.id!==action.student.id);
      return Object.assign({},state,{students:newStudentsArray})

    case DELETE_CAMPUS:
      const newCampusesArray = state.campuses.filter(campus=>campus.id!==action.campus.id);
      return Object.assign({},state,{campuses:newCampusesArray})

    case ADD_STUDENT:
      return Object.assign({},state,
        {students: state.students.concat(action.student)})

    case ADD_CAMPUS:
      return Object.assign({},state,
        {campuses: state.campuses.concat(action.campus)})

    case CHOOSE_CAMPUS:
      return Object.assign({},state,
        {selectedCampus: action.campus})

    case CHOOSE_STUDENT:
      return Object.assign({},state,
        {selectedStudent: action.student})

    default:
      return state
  }
};

export default rootReducer;
