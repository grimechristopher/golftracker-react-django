
import React, { useState, useEffect, Fragment } from 'react';
import AuthService from '../../services/AuthService';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        } else {

            AuthService.user(localStorage.getItem('token'))
            .then(response => {
                setUserEmail(response.data.email);
                setLoading(false);
            })

/*            fetch('http://127.0.0.1:8000/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUserEmail(data.email);
                    setLoading(false);
                });*/
        }
    }, []);

  return (
    <div>
      {loading === false && (
        <Fragment>
          <h1>Dashboard</h1>
          <h2>Hello {userEmail}!</h2>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;