import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout";
import {Login} from "./pages/auth/Login";
import {UserProvider} from "./providers/UserProvider";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import {Logout} from "./pages/auth/Logout";
import {ViewImagePage} from "./pages/images/ViewImagePage";
import {AlbumEditPage} from "./pages/images/AlbumEditPage";
import {Home} from "./pages/Home";

const API_URL: string = process.env.REACT_APP_API_URL!;
const CDN_URL: string = process.env.REACT_APP_CDN_URL!;
const CDN_TOKEN: string = process.env.REACT_APP_CDN_BEARER_TOKEN!;

const App = () => (
    <div className="App">
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={""} element={<Home/>}/>
                        <Route path={"login/"} element={<Login/>}/>
                        <Route path={"protected/"} element={<ProtectedRoute><p>Protected route</p></ProtectedRoute>}/>
                    </Route>

                    <Route path={"/logout"} element={<Logout/>}/>

                    <Route path={"/images"} element={<Layout/>}>
                        <Route path={":imageId"} element={<ViewImagePage/>}/>
                    </Route>

                    <Route path={"/albums"} element={<Layout/>}>
                        <Route path={":albumId/edit/"} element={<ProtectedRoute><AlbumEditPage/></ProtectedRoute>}/>
                        <Route path={"upload/"} element={<ProtectedRoute><AlbumEditPage/></ProtectedRoute>}/>
                    </Route>

                    <Route path={"*"} element={<h1>Oups, vous vous êtes perdus !</h1>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    </div>
);

export {
    App,
    API_URL,
    CDN_URL,
    CDN_TOKEN,
};
