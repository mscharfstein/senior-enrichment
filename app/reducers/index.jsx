import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';

const rootReducer = combineReducers({
  students,
  campuses
})

export default rootReducer;

export * from './students';
export * from './campuses';
