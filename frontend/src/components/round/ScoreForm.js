import React, { useState, useEffect } from "react";

import styles from "../course/Course.module.css";

const ScoreForm = (props) => {

    const [score, setScore] = useState({
        round: "",
        hole: "",
        strokes: ""
    })

    const[isValid, setIsValid] = useState(true);

    const onChange = e => {
        setScore({
          ...score,
          [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isNaN(score.strokes) || score.strokes <= 0 || score.strokes >= 100) {
            alert("Strokes must be greater than 0 and less than 100.");
            setIsValid(false);
        }   

        if (isValid) {
            if (props.score) {
                props.addScoreProps(score.strokes, props.score.id);
            }
            else {
                props.addScoreProps(score.strokes);
            }
            setScore({
                ...score,
                strokes: ""
            })
        }

        props.handleSubmit();
    }

    useEffect(() => {
        if (props.strokes) {
            setScore({
                ...score,
                strokes: props.strokes
            })
        }
    }, [props.strokes])

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                //className="input-number"
                className={styles.holeinput}
                placeholder="strokes"
                value={score.strokes}
                name="strokes"
                onChange={onChange}
            />
            <button type="submit">Submit Score</button>
        </form>
    );
};

export default ScoreForm;