import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import AuthService from '../../services/AuthService';

import HolesList from "../course/HolesList";

/*
A Round has a course attached. 
A Round has one score for each hole on the course. A Round has a selected tee color to play from
In Round, from course get holes and tees relating to the color chosen for this round. 
*/

const Round = (props) => {

    const [round, setRound] = useState([]);
    const [teeColors, setTeeColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(1); 
    const [loading, setLoading] = useState(true);
    const [complete, setComplete] = useState(false);
    const [stats, setStats] = useState({
        par: "",
        totalScore: 0,
    });
    const [createdOnLocal, setCreatedOnLocal] = useState([]);

    const retrieveRound = (id) => {
        setLoading(true);
        ApiService.get('rounds', id, localStorage.getItem('token'))
            .then(response => {
                setRound(response.data);
                //setLoading(false);
                console.log(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e.response.data);
            });
    };

    const onChange = e => {
        console.log(e.target.value);
        setRound({
          ...round,
          [e.target.name]: e.target.value,
        })
        setSelectedColor(e.target.value)
    }

    const selectColor = () => {

    }

    const retrieveTeeColors = () => {
        let container = [];
        ApiService.getAll('teecolors')
        .then(response => {
            response.data.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                container.push(obj);
            });
            setTeeColors(container);
        })
        .catch(e => {
            console.log(e.message);
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        let data = {
            name: round.name,
            course: round.course.id,
            tee_color: selectedColor,
            created_on: round.created_on // Frustrating... this should not be required. Should be handled by backend
        };

        console.log(data);
        ApiService.update('rounds', round.id, data, localStorage.getItem('token'))
        .then(response => {
            retrieveRound(round.id);
        })
        .catch(e => {
            console.log(e.response.data);
        });
    }

    const handleChange = () => {
        retrieveRound(round.id);
    }

    useEffect(() => {
        retrieveRound(props.match.params.id);
        retrieveTeeColors(); // ok for now but needs to be changed to only show colors enabled on the course
    }, [])  

    useEffect(() => {

        let temp = 0;
        let t = 0;

        if (round.scores) {
            if (round.scores.length >= round.course.holes.length) {
                setComplete(true);

                for (let i in round.scores) {
                    t += round.scores[i].strokes;
                }
                console.log(t);
            }   
        }
        if (round.course) {
            for (let i in round.course.holes) {
                if (userGender == "FEMALE") {
                    temp += round.course.holes[i].womens_par;
                }
                else {
                    temp += round.course.holes[i].mens_par;
                }
            } 
            console.log(temp);
        }

        setStats({
            ...stats,
            par: temp,
            totalScore: t
        })

        if (round.created_on) {
            let utcDate = round.created_on;
            let localDate = new Date(utcDate).toString();
    
            console.log(localDate);
            setCreatedOnLocal(localDate);
        }

    }, [round])

    const [userGender, setUserGender] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setLoggedIn(true);
            
            // Easy way to see if user is the uploader. Also is checked on the backend
            AuthService.user(localStorage.getItem('token'))
            .then(response => {
                //console.log(response.data);
                setUserGender(response.data.gender);
                //setUserGender(response.data.gender);
            })

        }
    }, []);


    return (
        <div>
            {loading === false && (
                <>
                    <div>
                        { round.name &&
                            <h2>{round.name}</h2>
                        }
                        { !round.name &&
                            <h2>Round at {round.course.name}</h2>
                        }
                        <h3>{new Date(round.created_on).toLocaleString()}</h3>
                    </div>
                    <div>
                    {round.tee_color &&
                    <h3>Playing from the {round.tee_color.name} tees</h3>
                    }
                </div>

                <form onSubmit={handleSubmit} className="form-container">
                    <select 
                        name="tee_colors"
                        value={selectedColor}
                        onChange={onChange} 
                    >
                    {teeColors &&
                        teeColors.map((option) => (
                            <option value={option.value} >
                                {option.label}
                            </option>
                    ))}
                    </select>
                    <div>
                    <button className="input-submit">
                        Change Color
                    </button>
                    </div>
                </form>

                <div>
                    <HolesList 
                        round={round}
                        course={round.course}
                        holes={round.course.holes} 
                        tee_colors={round.tee_color}
                        handleChangeProps={handleChange} 
                        userGender={userGender}
                    />
                </div>

                {
                    complete && round.scores.length > 0 &&
                    <>
                    <h3>Yeah! You finished a round!</h3>
                    {
                         (stats.totalScore - stats.par) < 0 &&
                        <p>You finished {stats.par - stats.totalScore} under par!</p>
                    }
                    {
                         (stats.totalScore - stats.par) > 0 &&
                        <p>You finished {stats.totalScore - stats.par} over par.</p>
                    }
                    {
                         (stats.totalScore - stats.par) == 0 &&
                        <p>You finished even par!</p>
                    }
                    </>
                }
                {
                    
                }
            </>
            )}


            

        </div>
    );
};

export default Round;