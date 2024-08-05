import React from 'react';
import './App.css';
import {CDNImage} from "./components/image/CDNImage";

const API_URL: string = process.env.REACT_APP_API_URL!;
const BEARER_TOKEN: string = process.env.REACT_APP_BEARER_TOKEN!;

const App = () => (
    <div className="App">
        <header className="App-header">
            <h1>CDN Image</h1>
            <CDNImage
                url={"https://cdn.killianfauvette.fr/paris_flower.jpg"}
                name={"paris_flower"}
            />
        </header>
    </div>
);

export {
    App,
    API_URL,
    BEARER_TOKEN,
};
