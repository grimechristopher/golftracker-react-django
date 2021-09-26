import React, { useState, useEffect } from "react";

import TeeService from '../../services/TeeService';

import Tee from './Tee';
import TeeForm from './TeeForm';

const TeesList = (props) => {

    const [tees, setTees] = useState([]);

    const addTee = (color, yards) => {
        var data = {
            tee_color: color,
            yards: yards,
            hole: props.holeId
        };
      
        TeeService.createTee(data)
            .then(response => {
                console.log(response.data);
                //retrieveCourse(props.match.params.id);
                props.handleChangeProps();
            })
            .catch(e => {
                console.log(e);
                console.log(e.response.data.non_field_errors[0]);
                alert(e.response.data.non_field_errors[0]);
        });
    }

    const retrieveTees = () => {


            props.teeIds.forEach(element => {
                TeeService.getTeeById(element)
                .then(response => {
                    //setTee(response.data);
                    let arr = [...tees];
                    arr.push(response.data)
                    
                    console.log(response.data);
                    console.log("My Tee Objects!");
                    console.log(arr);    
    
                })
                .catch(e => {
                    console.log(e);
                });       
     
            });

    
            //console.log(course.holes);
    
    }


    useEffect(() => {
        retrieveTees();
    }, [])

    // I only care about displaying Tees that are the same as the enabled colors...
    // if there is a color without a tee then I need to make a blank div 
    // I will go through each color and see if my tee ids match then <Tee>
    // if my color isnt found in the tees then <div>

    // Make an array of ids if color isnt found put a 0 in the array. check ids for 



    return (
        <div>

                {props.teeIds &&
                    props.teeIds.map((id, index) => (
                        <Tee
                            key={id}
                            teeId={id}
                            handleChangeProps={props.handleChangeProps}
                            checkColor={0}
                        />
                    ))}

            



        </div>
    );
};

export default TeesList;