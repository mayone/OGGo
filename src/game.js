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
            showMoveNum: true
        }
        // this.board = new Board({
        //     boardSize: this.boardSize,
        //     currentSide: this.currentPlayer,
        //     showMoveNum: this.state.showMoveNum
        // })
    }

    pass() {
        //Board.nextColor()
    }

    showMoveNumToggle = () => {
        this.setState({
            showMoveNum: this.state.showMoveNum ? false : true
        })
        console.log(this.state.showMoveNum)
    }

    render() {
        return (
            <div>
                <Board
                    boardSize={this.boardSize}
                    currentSide={this.currentPlayer}
                    showMoveNum={this.state.showMoveNum}
                />
                <button
                // onClick={() => { this.board.toggleShowMoveNum() }}
                >
                    Move Number Toggle
                </button>
            </div>
        )
    }
}