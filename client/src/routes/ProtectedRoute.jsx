import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userInfo } = useSelector(state => state.userLogin);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div>
        <h1>Unauthorized :(</h1>
        <span>
          <Link to='/login'>Login</Link> to gain access
        </span>
      </div>
    )
  }
  return <Outlet />
}

export default ProtectedRoute;