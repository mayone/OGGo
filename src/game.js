import React from 'react';
import { Board } from './board';
import { GAME_TYPE, SIDE, BOARD_SIZE } from './type';

import './game.scss';

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
            boardSize: BOARD_SIZE.BY15,
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

        let boardSize = BOARD_SIZE.BY9
        if (gameType === GAME_TYPE.GOMOKU) {
            boardSize = BOARD_SIZE.BY15
        }

        this.setState({
            gameType: gameType,
            boardSize: boardSize
        })
    }

    setBoardSize = (boardSize) => {
        this.setState({
            boardSize: boardSize
        })
    }

    toggleMoveNumberDisplay = () => {
        this.setState((prevState) => {
            return {
                moveNumberDisplay: !prevState.moveNumberDisplay
            }
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

    BoardSizeSelect = () => {
        if (this.state.gameType !== GAME_TYPE.GO) {
            return null
        }
        return (
            <div>
                <button
                    className={this.state.boardSize === BOARD_SIZE.BY9 ? "toggle on" : "toggle off"}
                    onClick={() => this.setBoardSize(BOARD_SIZE.BY9)}
                >
                    9x9
                </button>
                <button
                    className={this.state.boardSize === BOARD_SIZE.BY13 ? "toggle on" : "toggle off"}
                    onClick={() => this.setBoardSize(BOARD_SIZE.BY13)}
                >
                    13x13
                </button>
                <button
                    className={this.state.boardSize === BOARD_SIZE.BY19 ? "toggle on" : "toggle off"}
                    onClick={() => this.setBoardSize(BOARD_SIZE.BY19)}
                >
                    19x19
                </button>
            </div>
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
                <this.BoardSizeSelect />
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