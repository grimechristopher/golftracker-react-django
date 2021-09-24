import React, { useState, useEffect } from "react";

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

            if (props.hole) {
                props.addHoleProps( hole.title, hole.mens_par, hole.womens_par);
            }
            else {
                props.addHoleProps(props.holesLength + 1, hole.title, hole.mens_par, hole.womens_par);
            }

            

            //alert("Valid!");
        }

    }

    useEffect(() => {
        //retrieveCourse(props.match.params.id);
    }, [])


    return (
        <form onSubmit={handleSubmit} className="form-container">
            {!props.hole &&
            <h1>Add Hole {props.holesLength + 1}</h1>
            }
            {props.hole &&
            <h1>Update Hole {props.hole.number}</h1>
            }
            <input
                type="text"
                className="input-menspar"
                placeholder="Men's Par"
                value={hole.mens_par}
                name="mens_par"
                onChange={onChange}
            />
            <input
                type="text"
                className="input-womenspar"
                placeholder="Women's Par"
                value={hole.womens_par}
                name="womens_par"
                onChange={onChange}
            />


        <button className="input-submit">
            Submit
        </button>
        </form>
    );
};

export default HoleForm;