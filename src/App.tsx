import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout";
import {Login} from "./pages/Login";

const API_URL: string = process.env.REACT_APP_API_URL!;
const BEARER_TOKEN: string = process.env.REACT_APP_BEARER_TOKEN!;

const App = () => (
    <div className="App">
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={""} element={<p>Hello world</p>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
);

export {
    App,
    API_URL,
    BEARER_TOKEN,
};
