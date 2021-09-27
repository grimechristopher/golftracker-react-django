import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"


import AuthService from '../../services/AuthService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    let history = useHistory();
  
    useEffect(() => {
      if (localStorage.getItem('token') !== null) {
        history.push('/');
      } else {
        setLoading(false);
      }
    }, []);
  
    const onSubmit = e => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        };

        AuthService.login(user)
            .then(response => {
                if (response.data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', response.data.key);
                    history.go('/');
                }
            })
            .catch(e => {
                console.log(e);
                setEmail('');
                setPassword('');
                localStorage.clear();
                setErrors(true);
            });
    };
  
    return (
      <div>
        {loading === false && <h1>Login</h1>}
        {errors === true && <h2>Cannot log in with provided credentials</h2>}
        {loading === false && (
          <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='email'>Email:</label> <br />
                <input
                name='email'
                type='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                />
            </div>
                <label htmlFor='password'>Password:</label> <br />
                <input
                name='password'
                type='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
                />
            <div>
                <input type='submit' value='Login' />
            </div>
          </form>
        )}
      </div>
    );
  };

export default LoginForm;