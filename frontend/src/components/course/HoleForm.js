import React, { useState, useEffect } from "react";

import styles from "./Course.module.css"

const HoleForm = (props) => {

    const [hole, setHole] = useState({
        number: "",
        title: "",
        mens_par: "",
        womens_par: "",
    })

    const onChange = e => {
        setHole({
          ...hole,
          [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        let isValidated = true;

        if (isFinite(hole.mens_par) && hole.mens_par > 0 && hole.womens_par < 10) { // is number greater than 0 ?

        } else {
            alert("Men's Par must be greater than 0 and less than 10.");
            isValidated = false;
        }

        if (isFinite(hole.womens_par) && hole.womens_par > 0 && hole.womens_par < 10) { // is number greater than 0 ?

        } else {
            alert("Women's Par must be greater than 0 and less than 10.");
            isValidated = false;
        }

        if (isValidated) {
            setHole({
                number: "",
                mens_par: "",
                womens_par: "",
            })

            if (!props.hole) {
                console.log("Did notFound Props");
                props.addHoleProps(props.course.holes.length + 1, hole.title, hole.mens_par, hole.womens_par);
            }
            else {
                console.log("Found Props");
                props.addHoleProps( hole.title, hole.mens_par, hole.womens_par);
                props.handleSubmit();
            }
        }

        props.handleChangeProps();
        props.handleSubmit();
        
    }

    useEffect(() => {

        if (props.hole) {
          setHole({
            ...hole,
            number: props.hole.number,
            title: props.hole.title,
            mens_par: props.hole.mens_par,
            womens_par: props.hole.womens_par,
          })
        }
      }, [props.hole])


    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className={styles.holecell}>
                <input
                    type="text"
                    className={styles.holeinput}
                    placeholder="Men's Par"
                    value={hole.mens_par}
                    name="mens_par"
                    onChange={onChange}
                />
            </div>
            <div className={styles.holecell}>
                <input
                    type="text"
                    className={styles.holeinput}
                    placeholder="Women's Par"
                    value={hole.womens_par}
                    name="womens_par"
                    onChange={onChange}
                />
            </div>

        <button className="input-submit" className={styles.cellSubmit}>
            Submit
        </button>
        </form>
    );
};

export default HoleForm;