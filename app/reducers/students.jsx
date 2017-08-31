import axios from 'axios';

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_STUDENTS_BY_CAMPUSID = 'DELETE_STUDENTS_BY_CAMPUSID';

// ACTION CREATORS
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function dropStudent (studentId) {
  const action = { type: DELETE_STUDENT, studentId };
  return action;
}

export function addStudent (student) {
  const action = { type: ADD_STUDENT, student };
  return action;
}

export function updateStudent (student) {
  const action = { type: UPDATE_STUDENT, student };
  return action;
}

export function dropStudentsByCampus (campusId) {
  const action = {type: DELETE_STUDENTS_BY_CAMPUSID, campusId}
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

export function deleteStudent (studentId,history) {

  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(() => {
        const action = dropStudent(studentId);
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
        history.push(`/students/${student.id}`)
      })
  }
}

export function reviseStudent (student) {
  return function thunk (dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then(student => {
        dispatch(updateStudent(student));
      });
  }
}

const reducer = function(state = [], action) {
  switch(action.type) {
    case GET_STUDENTS:
      return action.students

    case DELETE_STUDENT:
      const newStudentArray = state.filter(student=>student.id!==action.studentId);
      return newStudentArray

    case ADD_STUDENT:
      return [...state, action.student]

    case UPDATE_STUDENT:
      const newStudentsArray = state.filter(student=>action.student.id!==student.id);
      return [...newStudentsArray, action.student]

    case DELETE_STUDENTS_BY_CAMPUSID:
      const studentsInRemCampuses = state.filter(student =>
        action.campusId!==student.campusId);
      return studentsInRemCampuses;

    default:
      return state
  }
};

export default reducer;
