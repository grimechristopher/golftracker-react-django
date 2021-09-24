import React from 'react';
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"

import GolfappContainer from './components/GolfappContainer'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <GolfappContainer />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
