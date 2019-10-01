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
        this.state = {
            boardSize: props.boardSize,
            moveNumberDisplay: props.moveNumberDisplay,
            totalMoves: 0,
            intersections: [...Array(props.boardSize * props.boardSize).fill({
                color: SIDE.EMPTY,
                moveNo: null
            })],
            currentColor: props.currentSide
        }
    }

    clearBoard = (props) => {
        this.setState({
            totalMoves: 0,
            intersections: [...Array(this.state.boardSize * this.state.boardSize).fill({
                color: SIDE.EMPTY,
                moveNo: null
            })],
            currentColor: props.currentSide
        })
    }

    moveNumberDisplayChange = (moveNumberDisplay) => {
        this.setState({
            moveNumberDisplay: moveNumberDisplay
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.moveNumberDisplay !== prevProps.moveNumberDisplay) {
            this.moveNumberDisplayChange(this.props.moveNumberDisplay)
        }
        if (this.props.clearBoard &&
            this.props.clearBoard !== prevProps.clearBoard) {
            this.clearBoard(this.props)
        }
    }

    xCoordinate() {
        const letters = [...Array(this.state.boardSize)].map((_, i) => String.fromCharCode(i + 65))
        return letters
    }

    playAt = (y, x) => {
        let pos = y * this.state.boardSize + x
        if (!this.state.intersections[pos].moveNo) {
            let newIntersections = [...this.state.intersections]
            let currentColor = this.state.currentColor
            let totalMoves = this.state.totalMoves + 1
            newIntersections[pos] = {
                color: currentColor,
                moveNo: totalMoves
            }
            this.setState({
                totalMoves: totalMoves,
                intersections: newIntersections,
                currentColor: this.nextColor(),
            })
            // this.setState((state, prevProps) => {
            //     console.log(state)
            //     console.log(prevProps)
            //     return {
            //         intersections: newIntersections,
            //         currentColor: this.nextColor()
            //     }
            // })
        }
    }

    getNeighbor = (y, x) => {
        let top = y > 0 ? this.intersections[(y - 1) * this.state.boardSize + x] : null
        let bottom = y < this.state.boardSize - 1 ? this.intersections[(y + 1) * this.state.boardSize + x] : null
        let left = x > 0 ? this.intersections[y * this.boardSize + (x - 1)] : null
        let right = x < this.state.boardSize - 1 ? this.intersections[y * this.state.boardSize + (x + 1)] : null
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
        let moveNumber = this.state.moveNumberDisplay ? moveNo : null

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

        let row = [...Array(this.state.boardSize)].map((_, colId) =>
            <this.Intersection
                key={`${rowId}-${colId}`}
                onClick={() => this.playAt(rowId, colId)}
                color={this.state.intersections[rowId * this.state.boardSize + colId].color}
                moveNo={this.state.intersections[rowId * this.state.boardSize + colId].moveNo}
            />)

        return row
    }

    render() {
        let rows = []
        for (let rowId = 0; rowId < this.state.boardSize; rowId++) {
            rows.push(
                <div className="row" key={rowId}>
                    <this.Row rowId={rowId} />
                </div>
            )
        }

        return rows
    }
}