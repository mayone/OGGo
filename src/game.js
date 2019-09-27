import React from 'react';
import { Board, SIDE } from "./board"

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.boardSize = 9
        this.sides = {
            black: null,
            white: null
        }
        this.currentPlayer = SIDE.BLACK
        this.result = null
        this.state = {
            showMoveNo: true
        }
    }

    pass() {
        //Board.nextColor()
    }

    ToggleShowMoveNo = () => {
        this.setState({
            showMoveNo: this.state.showMoveNo ? false : true
        })
    }

    render() {
        return (
            <div>
                <Board
                    boardSize={this.boardSize}
                    currentSide={this.currentPlayer}
                    showMoveNo={this.state.showMoveNo}
                />
                <button
                    onClick={this.ToggleShowMoveNo}
                >
                    Move Number Toggle
                </button>
            </div>
        )
    }
}