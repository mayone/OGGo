import React from 'react';
// import logo from './logo.svg';
import Game from './game';

import './App.css';

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
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
