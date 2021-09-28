import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header"
import Navbar from "./Navbar";
import Home from "./Home";

import CoursesList from './course/CoursesList';
import Course from './course/Course';
import Round from "./round/Round";
import SignupForm from "./user/SignupForm";
import LoginForm from "./user/LoginForm";
import Logout from "./user/Logout";

const GolfappContainer = () => {

    return (
        <>
            <Header />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}>
                </Route>
                <Route exact path="/courses" component={CoursesList}  />
                <Route exact path="/courses/:id" component={Course} />
                <Route exact path="/rounds/:id" component={Round} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/signup' component={SignupForm} />
                <Route exact path='/logout' component={Logout} />
            </Switch>

        </>
    );
}

export default GolfappContainer;