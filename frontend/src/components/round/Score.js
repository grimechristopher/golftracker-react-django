import React, { useState, useEffect } from "react";

import styles from "../course/Course.module.css";

import ApiService from "../../services/ApiService";

import ScoreForm from "./ScoreForm";


const Score = (props) => {
    
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);
    const [score, setScore] = useState("");

    const handleAdding = () => {
        if (localStorage.getItem('token') != null) {
            setAdding(!adding)
        }
    }
    const handleEditing = () => {
        if (localStorage.getItem('token') != null) {
            setEditing(!editing)
        }
    }

    const addScore = (strokes) => {
        var data = {
            round: props.round.id,
            hole: props.hole.id,
            strokes: strokes
        };
      
        ApiService.create('scores', data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e.response.data);
        });
    }

    const updateScore = (strokes, scoreId) => {
        var data = {
            round: props.round.id,
            hole: props.hole.id,
            strokes: strokes
        };
      
        ApiService.update('scores', scoreId, data, localStorage.getItem('token'))
            .then(response => {
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e);
        });
    }

    useEffect(() => {
        setScore( props.round.scores.filter(score => score.hole === props.hole.id) );
        console.log(props.round.scores.filter(score => score.hole === props.hole.id));
        console.log("hello");
    }, [props.round])

    return (
        <div className={styles.holecell}>
            {props.round.scores.filter(score => score.hole === props.hole.id).length > 0 ? 
                props.round.scores.filter(score => score.hole === props.hole.id).map(score => (
                    <>
                    {
                        !editing &&
                        <div onClick={handleEditing}>
                            <h3>{score.strokes}</h3>
                        </div>
                    }
                    {
                        editing &&
                        <ScoreForm
                            //hole={props.hole} 
                            //round={props.round}
                            score={score}
                            strokes={score.strokes}
                            addScoreProps={updateScore}
                            handleSubmit={handleEditing}
                        />
                    }
                    </>
                )) 
                :
                <>
                    { !adding &&
                         <div onClick={handleAdding}>
                             <h3>+</h3>
                         </div>
                    }
                    { adding &&
                        <ScoreForm 
                            //tees={props.tees} 
                            //hole={props.hole}
                            //round={props.round}
                            //score={score}
                            addScoreProps={addScore}
                            handleSubmit={handleAdding}
                            //color={tee_color.id}
                        />
                    }
                </>

            }

        </div>
    );
};

export default Score;