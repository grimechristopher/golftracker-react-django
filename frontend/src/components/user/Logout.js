import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom"
import AuthService from '../../services/AuthService';

const Logout = () => {
  const [loading, setLoading] = useState(true);
  
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      history.push('/login');
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = e => {
    e.preventDefault();

    AuthService.logout()
    .then(response => {
        console.log(response.data);
        localStorage.clear();
        history.go("/login");
      });
  };

  return (
    <div>
      {loading === false && (
        <>
          <h1>Are you sure you want to logout?</h1>
          <input type='button' value='Logout' onClick={handleLogout} />
        </>
      )}
    </div>
  );
};

export default Logout;