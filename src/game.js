import React from 'react';
import { Board } from './board';
import { GAME_TYPE, SIDE } from './type';

import './game.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.sides = {
            black: null,
            white: null
        }
        this.result = null
        this.state = {
            gameType: GAME_TYPE.GOMOKU,
            boardSize: 15,
            currentPlayer: SIDE.BLACK,
            moveNumberDisplay: true,
            clearBoard: false
        }
    }

    pass() {
        //Board.nextColor()
    }

    switchGameType = (gameType) => {
        if (gameType === this.state.gameType) {
            return
        }

        let boardSize = 9
        if (gameType === GAME_TYPE.GOMOKU) {
            boardSize = 15
        }
        this.setState({
            gameType: gameType,
            boardSize: boardSize
        })
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
                <button
                    className={this.state.gameType === GAME_TYPE.GO ? "toggle on" : "toggle off"}
                    onClick={() => this.switchGameType(GAME_TYPE.GO)}
                >
                    Go
                </button>
                <button
                    className={this.state.gameType === GAME_TYPE.GOMOKU ? "toggle on" : "toggle off"}
                    onClick={() => this.switchGameType(GAME_TYPE.GOMOKU)}
                >
                    Gomoku
                </button>
                <Board
                    gameType={this.state.gameType}
                    boardSize={this.state.boardSize}
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