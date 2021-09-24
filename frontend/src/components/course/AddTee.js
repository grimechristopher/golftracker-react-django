import React, { useState, useEffect } from "react";
import Select from 'react-select'

import TeeColorService from '../../services/TeeColorService';

const AddTee = () => {

    const options = [];
    
    const retrieveTeeColors = () => {
        TeeColorService.getAllTeeColors()
        .then(response => {
            response.data.forEach(element => {
                let obj = {};
                obj["value"] = element.id;
                obj["label"] = element.name;
                console.log(obj);
                options.push(obj);
                //options.push({value: element.color, label: element.})
            });
            console.log(response.data);
            //setCourse(response.data);
    
            //console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    useEffect(() => {
        retrieveTeeColors()
    }, [])

    return (
        <div>
            <Select options={options} />
        </div>
    );
};

export default AddTee;