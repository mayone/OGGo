import React from 'react';
import { Board, SIDE } from "./board";

import './game.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.boardSize = 9
        this.sides = {
            black: null,
            white: null
        }
        this.result = null
        this.state = {
            currentPlayer: SIDE.BLACK,
            moveNumberDisplay: false
        }
    }

    pass() {
        //Board.nextColor()
    }

    toggleMoveNumberDisplay = () => {
        this.setState({
            moveNumberDisplay: !this.state.moveNumberDisplay
        })
    }

    ClearBoard = () => {

    }

    render() {
        return (
            <div>
                <Board
                    boardSize={this.boardSize}
                    currentSide={this.state.currentPlayer}
                    moveNumberDisplay={this.state.moveNumberDisplay}
                />
                <button
                    className="button"
                    onClick={this.toggleMoveNumberDisplay}
                >
                    Move #
                </button>
                <button
                    onClick={this.toggleMoveNumberDisplay}
                >
                    Clear Board
                </button>
            </div>
        )
    }
}