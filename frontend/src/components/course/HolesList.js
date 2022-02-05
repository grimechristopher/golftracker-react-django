import React, { useState, useEffect } from "react";

import styles from "./Course.module.css";

import ApiService from '../../services/ApiService';

import Hole from './Hole';
import HoleForm from './HoleForm';

const HolesList = (props) => {

    const [addingHole, setAddingHole] = useState(false);
    const [stats, setStats] = useState(false);

    const addHole = (number, title, mens_par, womens_par ) => {
        var data = {
            number: number,
            name: title,
            course: props.course.id,
            mens_par: mens_par,
            womens_par: womens_par,
            tees: []
        };
      
        ApiService.create('holes', data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const deleteHole = () => {
        ApiService.remove('holes', props.holes[props.holes.length - 1].id, localStorage.getItem('token'))
        .then(response => {
            props.handleChangeProps();
        })
    }

    const handleAddingHole = () => {
        if (localStorage.getItem('token') != null) {
            setAddingHole(!addingHole)
        }
    }

    useEffect(() => {
        let mPar = 0;
        let wPar = 0;
        let score = 0;
        let yrds = 0;

        if (props.holes) {
            for (let i in props.holes) {
                mPar += props.holes[i].mens_par;
                wPar += props.holes[i].womens_par;
            }
        }
        if (props.round) {
            for (let i in props.round.scores) {
                score += props.round.scores[i].strokes;
            }
        }
        if (props.round) {
            console.log(props.round);
            // Oh the yards are gonna be complicated
            for (let i in props.round.course.holes) {
                for (let j in props.round.course.holes[i].tees) {
                    if (props.round.course.holes[i].tees[j].tee_color.id === props.round.tee_color.id) {
                        yrds += props.round.course.holes[i].tees[j].yards;
                    }
                }
            }
            // That wasnt too bad... Now for the courses 
        }
        let yardsArray = [];
        if (props.course) {
            yardsArray = Array(props.course.tee_colors.length).fill(0); // Fill an array of the correct size with 0 to prevent NaN when incrementing
            console.log(props.course);
            for (let i in props.course.tee_colors) { // for each teeColor i will asign yards to a var in an array
                for (let j in props.course.holes) {
                    for (let k in props.course.holes[j].tees) {
                        if (props.course.holes[j].tees[k].tee_color.id === props.course.tee_colors[i].id) {
                            yardsArray[i] += props.course.holes[j].tees[k].yards;
                            // incrementing to empty array causes NaN
                        }
                    }
                }
            }
            // I almost cant believe this worked... Seems too simple.
        }
        console.log(yardsArray);

        setStats({
            ...stats,
            mensPar: mPar,
            womensPar: wPar,
            totalScore: score,
            totalYards: yrds,
            allYards: yardsArray,
            //totalScore: t
        })
        console.log(mPar);

    }, [props.holes])  

    return (
        <div className={styles.holescontainer} >
            <div className={styles.holecontainer} >
                <div className={styles.holecell} >
                    <h3>Hole</h3>
                </div>

                {!props.round ? 
                props.tee_colors &&
                    props.tee_colors.map((c, i) => (
                        <div className={styles.holecell} >
                            <h4>{c.name}</h4>
                        </div>
                    )) 
                : 
                <div className={styles.holecell} >
                    <h4>{props.round.tee_color.name}</h4>
                </div>             
                }

                {props.round &&
                <div className={styles.holecell}>
                    <h4>Strokes</h4>
                </div>
                }

                <div className={styles.holecell}>
                    <h4>Mens</h4>
                </div>
                <div className={styles.holecell}>
                    <h4>Ladies</h4>
                </div>
            </div>
            {props.holes &&
            props.holes.map((hole, index) => (
            <Hole 
                key={hole.id}
                hole={hole}
                course={props.course}
                round={props.round}
                handleChangeProps={props.handleChangeProps}
                enabledColors={props.enabledColors}
            />
            ))}

                
            <div className={styles.holecontainer} >
                <div className={styles.holecell} >
                    <h3>Total</h3>
                </div>
                {props.course.tee_colors && !props.round &&
                props.course.tee_colors.map((t, index) => (
                    <div className={styles.holecell}>
                        { stats &&
                            <h3>{stats.allYards[index]}</h3>
                        }
                    </div>
                ))}
                { props.round &&
                <>
                    <div className={styles.holecell}>
                        <h3>{stats.totalYards}</h3>
                    </div>
                    <div className={styles.holecell}>
                        <h3>{stats.totalScore}</h3>
                    </div>
                </>
                }

                <div className={styles.holecell}>
                    <h3>{stats.mensPar}</h3>
                </div>
                <div className={styles.holecell}>
                    <h3>{stats.womensPar}</h3>
                </div>
            </div>



            {props.holes &&
            <>
            {props.holes.length > 0 && localStorage.getItem('token') != null &&
                <button onClick={() => deleteHole()}>Delete Last Hole</button>
            }
            { !addingHole && localStorage.getItem('token') != null &&
                <button onClick={handleAddingHole}>+ Hole</button>
            }
            { addingHole && localStorage.getItem('token') != null &&
                <HoleForm addHoleProps={addHole} course={props.course} handleChangeProps={props.handleChangeProps} holesLength={props.holesLength} handleSubmit={handleAddingHole}/>
            }            
            </>
            }
        </div>
    );
};

export default HolesList;