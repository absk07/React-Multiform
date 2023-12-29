import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, profile } from '../redux/action';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

const Profile = () => {
    const [errMessage, setErrMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profileState = useSelector((state) => state.userProfile);
    const { data, loading, error } = profileState;

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setErrMessage(error);
        }
    }, [error]);

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            {loading && <Loader />}
            <h1>Welcome {data?.userDetails?.firstname} {data?.userDetails?.lastname}</h1>
            <button onClick={logoutHandler}>Logout</button>
            <hr />
            <div>
                {
                    errMessage && <ErrorMessage severity="error" setErrMessage={setErrMessage}>{errMessage}</ErrorMessage>
                }
            </div>
            <div>
                <h5>Firstname - {data?.userDetails?.firstname}</h5>
                <h5>Lastname - {data?.userDetails?.lastname}</h5>
                <h5>Email - {data?.userDetails?.email}</h5>
                <h5>Phone - {data?.userDetails?.phone}</h5>
                <h5>Address 1 - {data?.userDetails?.address1}</h5>
                <h5>Address 2 - {data?.userDetails?.address2}</h5>
                <h5>City - {data?.userDetails?.city}</h5>
                <h5>State - {data?.userDetails?.state}</h5>
                <h5>Country - {data?.userDetails?.country}</h5>
                <h5>PIN - {data?.userDetails?.pin}</h5>
            </div>
        </>
    );
}

export default Profile;