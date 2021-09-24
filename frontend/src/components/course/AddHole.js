import React, { useState, useEffect } from "react";

const AddHole = (props) => {

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

  
        if (isFinite(hole.mens_par) && hole.mens_par > 0) { // is number greater than 0 ?

        } else {
            alert("Men's Par must be greater than 0.");
            isValidated = false;
        }

        if (isFinite(hole.womens_par) && hole.womens_par > 0) { // is number greater than 0 ?

        } else {
            alert("Women's Par must be greater than 0.");
            isValidated = false;
        }

        if (isValidated) {
            setHole({
                number: "",
                mens_par: "",
                womens_par: "",
            })

            props.addHoleProps(props.holesAmt + 1, hole.title, hole.mens_par, hole.womens_par);
            //alert("Valid!");
        }

    }


    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Add Hole {props.holesAmt + 1}</h1>

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

export default AddHole;