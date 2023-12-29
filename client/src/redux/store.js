import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, formDataReducer, userProfileReducer } from './reducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    formData: formDataReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: { userInfo: userInfoFromStorage }
};
// console.log('initialState', initialState)


const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;