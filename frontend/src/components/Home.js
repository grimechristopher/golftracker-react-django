import React, { useState, useEffect } from 'react';

import AuthService from '../services/AuthService';
import RoundsList from './round/RoundsList';

const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userGender, setUserGender] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
            
            AuthService.user(localStorage.getItem('token'))
            .then(response => {
                console.log(response.data);
                setUsername(response.data.username);
                setUserGender(response.data.gender);
            })

        }
    }, []);

    return (
        <div>
            {loggedIn === true && 
            <>
                <h2>Hello {username}!</h2>
                <RoundsList />
            </>
            }
        </div>
    );
};

export default Home;