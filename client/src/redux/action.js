import axios from 'axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    FORM_SUBMIT_REQUEST,
    FORM_SUBMIT_SUCCESS,
    FORM_SUBMIT_FAIL
} from './constant';

export const register = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post("http://localhost:8080/api/register",{ email, password }, config);
        if(data.success === false) {
            return dispatch({ type: USER_REGISTER_FAIL, payload: data.message });
        }
        if(data.error === true) {
            return dispatch({ type: USER_REGISTER_FAIL, payload: "Server Error!" });
        }
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post("http://localhost:8080/api/login", { email, password }, config);
        if(data.success === false) {
            return dispatch({ type: USER_LOGIN_FAIL, payload: data.message });
        }
        if(data.error === true) {
            return dispatch({ type: USER_LOGIN_FAIL, payload: "Server Error!" });
        }
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
};

export const multiForm = (firstname, lastname, phone, address1, address2, city, state, country, pin, file, ans1, ans2, ans3) => async (dispatch, getState) => {
    try {
        dispatch({ type: FORM_SUBMIT_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const token = userInfo ? userInfo.token : null;
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        };
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("phone", phone);
        formData.append("address1", address1);
        formData.append("address2", address2);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("country", country);
        formData.append("pin", pin);
        formData.append("ans1", ans1);
        formData.append("ans2", ans2);
        formData.append("ans3", ans3);

        // Append each file to the FormData object
        file.forEach((file, index) => {
            formData.append("file", file);
        });
        const { data } = await axios.post(
            "http://localhost:8080/api/details",
            formData,
            config
        );
        if(data.success === false) {
            return dispatch({ type: FORM_SUBMIT_FAIL, payload: data.message });
        }
        if(data.error === true) {
            return dispatch({ type: FORM_SUBMIT_FAIL, payload: "Server Error!" });
        }
        dispatch({ type: FORM_SUBMIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FORM_SUBMIT_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const profile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const token = userInfo ? userInfo.token : null;
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        };
        const { data } = await axios.get("http://localhost:8080/api/dashboard", config);
        if(data.success === false) {
            return dispatch({ type: USER_PROFILE_FAIL, payload: data.message });
        }
        if(data.error === true) {
            return dispatch({ type: USER_PROFILE_FAIL, payload: "Server Error!" });
        }
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message 
        });
    }
};