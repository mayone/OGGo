import React from 'react';
// import logo from './logo.svg';
import { LINK, IMAGE } from './type';
import Game from './game';

import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
                    <img
                        className="img rotate"
                        src={IMAGE.GITHUB}
                        width="32px"
                        height="32px"
                        title="GitHub"
                        alt="GitHub"
                    />
                </a>
            </header>
        </div>
    );
}

export default App;
