import React from 'react';
import { GAME_TYPE, BOARD_SIZE, MODE, SIDE } from './type';
import { Board } from './board';
import GameAudio from './audio';
import GameResultModal from './modal/gameResultModal'
import { Widget, toggleWidget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import './styles/game.scss';

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.sides = {
            black: null,
            white: null
        }
        this.state = {
            playMusic: false,
            gameType: GAME_TYPE.GOMOKU,
            boardSize: BOARD_SIZE.BY15,
            mode: MODE.PVP,
            currentPlayer: SIDE.BLACK,
            moveNumberDisplay: false,
            clearBoard: false,
            gameResultModelDisplay: false
        }
        this.gameResult = null
    }

    pass() {
        //Board.nextColor()
    }

    togglePlayMusic = () => {
        this.setState(
            (prevState) => {
                return {
                    playMusic: !prevState.playMusic
                }
            }
        )
    }

    switchGameType = (gameType) => {
        if (gameType === this.state.gameType) {
            return
        }

        let boardSize = 0
        if (gameType === GAME_TYPE.GOMOKU) {
            boardSize = BOARD_SIZE.BY15
        } else if (gameType === GAME_TYPE.GO) {
            boardSize = BOARD_SIZE.BY9
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

    toggleGameResultModelDisplay = (gameResult) => {
        this.setState((prevState) => {
            return {
                gameResult: gameResult,
                gameResultModelDisplay: !prevState.gameResultModelDisplay
            }
        })
    }

    closeGameResultModelAndClear = () => {
        this.toggleGameResultModelDisplay()
        this.clearBoard()
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
                <GameAudio play={this.state.playMusic} />
                <div>
                    <button
                        className={this.state.playMusic ? "toggle on" : "toggle off"}
                        onClick={this.togglePlayMusic}
                    >
                        Music
                    </button>
                </div>
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
                    endGameCallback={this.toggleGameResultModelDisplay}
                />
                <GameResultModal
                    open={this.state.gameResultModelDisplay}
                    gameResult={this.state.gameResult}
                    onConfirm={this.toggleGameResultModelDisplay}
                    onClear={this.closeGameResultModelAndClear}
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
                <button onClick={() => toggleWidget()}> Open Chat</button>
                <Widget />
            </div>
        )
    }
}