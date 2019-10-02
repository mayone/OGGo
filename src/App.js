import React from 'react';
// import logo from './logo.svg';
import { LINK } from './type';
import Game from './game';

import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src='/Octocat.png' /> */}
                <p>
                    <code>oggo</code>
                </p>
                <div>
                    <Game />
                </div>
                <a
                    className="App-link"
                    href={LINK.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </header>
        </div>
    );
}

export default App;
