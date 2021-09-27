import React, { useState, useEffect } from 'react';

import AuthService from '../services/AuthService';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
            
            AuthService.user(localStorage.getItem('token'))
            .then(response => {
                console.log(response.data);
                setUsername(response.data.username);
            })

        }
    }, []);

    return (
        <div>
            {loggedIn === true && 
            <h2>Hello {username}!</h2>
            }
        </div>
    );
};

export default Home;