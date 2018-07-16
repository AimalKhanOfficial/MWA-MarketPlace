import { createStore } from 'redux';
import reducer from '../redux-store/reducers/index';

export const store = createStore(reducer);