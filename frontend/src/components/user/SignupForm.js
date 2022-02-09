import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"

import AuthService from '../../services/AuthService';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [gender, setGender] = useState('MALE'); // Male is the default selected value
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
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            gender: gender,
        };

        AuthService.register(user)
            .then(response => {
                localStorage.clear();
                localStorage.setItem('token', response.data.key);
                history.go('/');
            })
            .catch(e => {
                console.log(e);
                setUsername("");
                setEmail("");
                setPassword1("");
                setPassword2("");
                localStorage.clear();
                setErrors(true);
            });

    };

    return (
        <div>
            {loading === false && 
            <h1>Signup</h1>
            }
            {errors === true && 
            <h2>Cannot signup with provided credentials</h2>
            }
            <form onSubmit={onSubmit}>
                    <div>
                    <label htmlFor='username'>Username:</label><br />
                    <input
                        name='username'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label><br />
                    <input
                        name='email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password1'>Password:</label> <br />
                    <input
                        name='password1'
                        type='password'
                        value={password1}
                        onChange={e => setPassword1(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password2'>Confirm password:</label> <br />
                    <input
                        name='password2'
                        type='password'
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        required
                    />
                    <div>
                    <label htmlFor='gender'>Gender:</label> <br />
                        <select 
                            name="gender"
                            value={gender}
                            onChange={e => {console.log(e.target.value); setGender(e.target.value) } } 
                        >
                                <option value="MALE" >
                                    Male
                                </option>
                                <option value="FEMALE" >
                                    Female
                                </option>
                        </select>
                    </div>

                </div>
                <div>
                    <input type='submit' value='Signup' />
                </div>
            </form>
        </div>
    );
};


export default SignupForm;