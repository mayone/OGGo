import React from 'react';
import Board from "./board"

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.boardSize = 3
        this.sides = {
            black: null,
            white: null
        }
        this.currentPlayer = "black"
        this.result = null
    }

    playAt(y, x) {
        // TODO
    }

    pass() {
        //Board.nextColor()
    }

    render() {
        return (
            <Board
                boardSize={this.boardSize}
                currentColor={this.currentPlayer}
            />
        )
    }
}