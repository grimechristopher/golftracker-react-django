import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import CourseService from "../services/CourseService";
import Header from "./Header"
import Navbar from "./Navbar";

import CoursesList from './course/CoursesList';
import Course from './course/Course';


const GolfappContainer = () => {

    return (
        <>
            <Header />
            <Navbar />
            <Switch>
                <Route exact path="/">
                </Route>
                <Route exact path="/courses" >
                    <CoursesList  />
                </Route>
                <Route path="/courses/:id" exact component={Course} >
                </Route>
            </Switch>

        </>
    );
}

export default GolfappContainer;