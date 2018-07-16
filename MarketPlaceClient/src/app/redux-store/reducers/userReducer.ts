import { ON_USER_LOGIN } from '../actions/loginAction';

function onUserLogin(state, action) {
    return action.data;
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case ON_USER_LOGIN:
            return onUserLogin(state, action);
        default:
            return state;
    }
}