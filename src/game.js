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
            moveNumberDisplay: true,
            clearBoard: false
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

    clearBoard = () => {
        this.setState(
            {
                clearBoard: true
            },
            () => {
                this.setState({
                    clearBoard: false
                })
            }
        )
    }

    render() {
        return (
            <div>
                <Board
                    boardSize={this.boardSize}
                    currentSide={this.state.currentPlayer}
                    moveNumberDisplay={this.state.moveNumberDisplay}
                    clearBoard={this.state.clearBoard}
                />
                <button
                    className={this.state.moveNumberDisplay ? "toggle on" : "toggle off"}
                    onClick={this.toggleMoveNumberDisplay}
                >
                    Move #
                </button>
                <button
                    className="clear"
                    onClick={this.clearBoard}
                >
                    Clear
                </button>
            </div>
        )
    }
}