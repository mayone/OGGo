import React from 'react';

import './board.css';

export const SIDE = Object.freeze({
    BLACK: 'black',
    WHITE: 'white',
    EMPTY: 'orange'
})

export class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardSize = props.boardSize
        this.numMoves = 0
        this.state = {
            showMoveNo: props.showMoveNo,
            intersections: [...Array(this.boardSize * this.boardSize).fill({
                color: SIDE.EMPTY,
                moveNo: null
            })],
            currentColor: props.currentSide
        }
    }

    updateShowMoveNo = () => {
        this.setState({
            showMoveNo: this.props.showMoveNo
        })
    }

    componentDidUpdate(perv) {
        console.log("receive new props")
        if (perv.showMoveNo !== this.props.showMoveNo) {
            this.updateShowMoveNo()
        }
    }

    xCoordinate() {
        const letters = [...Array(this.boardSize)].map((_, i) => String.fromCharCode(i + 65))
        return letters
    }

    playAt = (y, x) => {
        let pos = y * this.boardSize + x
        if (!this.state.intersections[pos].moveNo) {
            this.numMoves++
            let newIntersections = [...this.state.intersections]
            let currentColor = this.state.currentColor
            let numMoves = this.numMoves
            newIntersections[pos] = {
                color: currentColor,
                moveNo: numMoves
            }
            this.setState({
                intersections: newIntersections,
                currentColor: this.nextColor(),
            })
        }
    }

    getNeighbor = (y, x) => {
        let top = y > 0 ? this.intersections[(y - 1) * this.boardSize + x] : null
        let bottom = y < this.boardSize - 1 ? this.intersections[(y + 1) * this.boardSize + x] : null
        let left = x > 0 ? this.intersections[y * this.boardSize + (x - 1)] : null
        let right = x < this.boardSize - 1 ? this.intersections[y * this.boardSize + (x + 1)] : null
        return ({
            top: top,
            bottom: bottom,
            left: left,
            right: right
        })
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
        let moveNumber = this.state.showMoveNo ? moveNo : null

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