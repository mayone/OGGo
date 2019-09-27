import React from 'react';

import './board.css';

export const SIDE = {
    BLACK: 'black',
    WHITE: 'white',
    EMPTY: 'orange'
}

export class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardSize = props.boardSize
        this.moveNumber = 0
        this.state = {
            showMoveNum: props.showMoveNum,
            intersections: [...Array(this.boardSize * this.boardSize).fill({
                color: SIDE.EMPTY,
                moveNo: null
            })],
            currentColor: props.currentSide
        }
    }

    static toggleShowMoveNum = () => {
        this.setState({
            showMoveNum: this.state.showMoveNum ? false : true
        })
    }

    xCoordinate() {
        const letters = [...Array(this.boardSize)].map((_, i) => String.fromCharCode(i + 65))
        return letters
    }

    playAt = (y, x) => {
        let pos = y * this.boardSize + x
        if (!this.state.intersections[pos].moveNo) {
            this.moveNumber++
            let newIntersections = this.state.intersections.slice()
            let currentColor = this.state.currentColor
            let moveNumber = this.moveNumber
            newIntersections[pos] = {
                color: currentColor,
                moveNo: moveNumber
            }
            this.setState({
                intersections: newIntersections,
                currentColor: this.nextColor(),
            })
        }
    }

    nextColor() {
        if (this.state.currentColor === SIDE.BLACK) {
            return SIDE.WHITE
        } else {
            return SIDE.BLACK
        }
    }

    Intersection = (props) => {
        const { onClick, color, moveNo } = props
        let moveNumber = this.state.showMoveNum ? moveNo : null

        return (
            <button
                className={`chess ${color}`}
                onClick={onClick}
            >
                {moveNumber}
            </button>
        )
    }

    Row = (props) => {
        const { rowId } = props

        let row = [...Array(this.boardSize)].map((_, colId) =>
            <this.Intersection
                key={`${rowId}-${colId}`}
                onClick={() => this.playAt(rowId, colId)}
                color={this.state.intersections[rowId * this.boardSize + colId].color}
                moveNo={this.state.intersections[rowId * this.boardSize + colId].moveNo}
            />)

        return row
    }

    render() {
        let rows = []
        for (let rowId = 0; rowId < this.boardSize; rowId++) {
            rows.push(
                <div className="row" key={rowId}>
                    <this.Row rowId={rowId} />
                </div>
            )
        }

        return rows
    }
}