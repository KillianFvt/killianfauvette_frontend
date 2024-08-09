import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout";
import {Login} from "./pages/Login";
import {UserProvider} from "./providers/UserProvider";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import {Logout} from "./pages/Logout";

const API_URL: string = process.env.REACT_APP_API_URL!;
const BEARER_TOKEN: string = process.env.REACT_APP_BEARER_TOKEN!;

const App = () => (
    <div className="App">
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={""} element={<p>Hello world</p>}/>
                        <Route path={"login/"} element={<Login/>}/>
                        <Route path={"protected/"} element={<ProtectedRoute><p>Protected route</p></ProtectedRoute>}/>
                    </Route>
                    <Route path={"/logout"} element={<Logout/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    </div>
);

export {
    App,
    API_URL,
    BEARER_TOKEN,
};
