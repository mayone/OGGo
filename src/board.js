import React from 'react';
import { GAME_TYPE, SIDE, DIRECTION } from './type'

import './board.scss';

export class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameType: props.gameType,
            boardSize: props.boardSize,
            moveNumberDisplay: props.moveNumberDisplay,
            totalMoves: 0,
            lastMove: null,
            intersections: [...Array(props.boardSize * props.boardSize).fill({
                color: SIDE.EMPTY,
                moveNo: null
            })],
            currentColor: props.currentSide,
            gameEnded: false
        }
        this.endGameCallback = props.endGameCallback
    }

    clearBoard = (props) => {
        this.setState({
            gameType: props.gameType,
            boardSize: props.boardSize,
            intersections: [...Array(props.boardSize * props.boardSize).fill({
                color: SIDE.EMPTY,
                moveNo: null
            })],
            totalMoves: 0,
            lastMove: null,
            currentColor: props.currentSide,
            gameEnded: false
        })
    }

    moveNumberDisplayChange = (moveNumberDisplay) => {
        this.setState({
            moveNumberDisplay: moveNumberDisplay
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.gameType !== prevProps.gameType ||
            this.props.boardSize !== prevProps.boardSize) {
            this.clearBoard(this.props)
        }
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

    getIndex = (y, x) => {
        return y * this.state.boardSize + x
    }

    playAt = (y, x) => {
        let index = this.getIndex(y, x)
        if (!this.state.gameEnded &&
            !this.state.intersections[index].moveNo) {
            if (this.state.gameType === GAME_TYPE.GOMOKU) {
                let newIntersections = [...this.state.intersections]
                let currentColor = this.state.currentColor
                let totalMoves = this.state.totalMoves + 1
                newIntersections[index] = {
                    color: currentColor,
                    moveNo: totalMoves
                }
                this.setState({
                    totalMoves: totalMoves,
                    lastMove: [y, x],
                    intersections: newIntersections,
                    currentColor: this.nextColor()
                }, () => {
                    let winningColor = this.gomokuCheckWinner(y, x)
                    if (winningColor) {
                        this.setState({
                            gameEnded: true
                        })
                        this.endGameCallback(winningColor)
                    }
                })
            } else if (this.state.gameType === GAME_TYPE.GO) {
                let newIntersections = this.goGetNewBoard(y, x)
                // let currentColor = this.state.currentColor
                let totalMoves = this.state.totalMoves + 1
                if (newIntersections) {
                    this.setState({
                        totalMoves: totalMoves,
                        lastMove: [y, x],
                        intersections: newIntersections,
                        currentColor: this.nextColor()
                    })
                } else {
                    alert("Illegal move")
                }
            }
        }
    }

    getNeighbors = (y, x) => {
        let top = y > 0 ?
            [y - 1, x] : null
        let bottom = y < this.state.boardSize - 1 ?
            [y + 1, x] : null
        let left = x > 0 ?
            [y, x - 1] : null
        let right = x < this.state.boardSize - 1 ?
            [y, x + 1] : null
        let topLeft = top && left ?
            [y - 1, x - 1] : null
        let topRight = top && right ?
            [y - 1, x + 1] : null
        let bottomLeft = bottom && left ?
            [y + 1, x - 1] : null
        let bottomRight = bottom && right ?
            [y + 1, x + 1] : null
        if (this.state.gameType === GAME_TYPE.GOMOKU) {
            return ({
                top: top,
                bottom: bottom,
                left: left,
                right: right,
                topLeft: topLeft,
                topRight: topRight,
                bottomLeft: bottomLeft,
                bottomRight: bottomRight
            })
        } else {
            return ({
                top: top,
                bottom: bottom,
                left: left,
                right: right
            })
        }
    }

    countSameColor = (baseColor, base, direction) => {
        let len = 0
        let current = base
        while (current && (this.state.intersections[this.getIndex(current[0], current[1])].color === baseColor)) {
            current = this.getNeighbors(current[0], current[1])[direction]
            len++
        }

        return len
    }

    gomokuCheckWinner = (y, x) => {
        let self = this.state.intersections[this.getIndex(y, x)]
        let neighbors = this.getNeighbors(y, x)
        let len = 1

        if (this.state.gameType !== GAME_TYPE.GOMOKU) {
            return null
        }

        if (!self.moveNo) {
            return null
        }

        // Check vertical
        len += this.countSameColor(self.color, neighbors[DIRECTION.TOP], DIRECTION.TOP)
        len += this.countSameColor(self.color, neighbors[DIRECTION.BOTTOM], DIRECTION.BOTTOM)
        if (len >= 5) {
            return self.color
        }
        // Check horizontal
        len = 1
        len += this.countSameColor(self.color, neighbors[DIRECTION.LEFT], DIRECTION.LEFT)
        len += this.countSameColor(self.color, neighbors[DIRECTION.RIGHT], DIRECTION.RIGHT)
        if (len >= 5) {
            return self.color
        }
        // Check slash
        len = 1
        len += this.countSameColor(self.color, neighbors[DIRECTION.TOP_RIGHT], DIRECTION.TOP_RIGHT)
        len += this.countSameColor(self.color, neighbors[DIRECTION.BOTTOM_LEFT], DIRECTION.BOTTOM_LEFT)
        if (len >= 5) {
            return self.color
        }
        // Check backslash
        len = 1
        len += this.countSameColor(self.color, neighbors[DIRECTION.TOP_LEFT], DIRECTION.TOP_LEFT)
        len += this.countSameColor(self.color, neighbors[DIRECTION.BOTTOM_RIGHT], DIRECTION.BOTTOM_RIGHT)
        if (len >= 5) {
            return self.color
        }

        return null
    }

    goGetNewBoard = (y, x) => {
        let newIntersections = [...this.state.intersections]
        let checkingList = []
        newIntersections[this.getIndex(y, x)] = {
            color: this.state.currentColor,
            moveNo: this.state.totalMoves + 1
        }
        // Capture
        if (this.capture(newIntersections, y, x)) {

        } else {
            if (this.checkLiberties(newIntersections, y, x, checkingList)) {
                return newIntersections
            } else {
                return null
            }
        }
        // return null
    }

    capture = (intersections, y, x) => {
        // let neighbors = this.getNeighbors(y, x)
        return 0
    }

    checkLiberties = (intersections, y, x, checkingList) => {
        let liberties = 0
        let neighbors = this.getNeighbors(y, x)

        checkingList.push(`${y}-${x}`)

        let neighbor = neighbors[DIRECTION.TOP]
        if (neighbor) {
            if (!checkingList.includes(`${neighbor[0]}-${neighbor[1]}`)) {
                let color = intersections[this.getIndex(neighbor[0], neighbor[1])].color
                if (color === SIDE.EMPTY) {
                    liberties++
                } else if (color === this.state.currentColor) {
                    liberties += this.checkLiberties(intersections, neighbor[0], neighbor[1], checkingList)
                }
            }
        }
        neighbor = neighbors[DIRECTION.BOTTOM]
        if (neighbor) {
            if (!checkingList.includes(`${neighbor[0]}-${neighbor[1]}`)) {
                let color = intersections[this.getIndex(neighbor[0], neighbor[1])].color
                if (color === SIDE.EMPTY) {
                    liberties++
                } else if (color === this.state.currentColor) {
                    liberties += this.checkLiberties(intersections, neighbor[0], neighbor[1], checkingList)
                }
            }
        }
        neighbor = neighbors[DIRECTION.LEFT]
        if (neighbor) {
            if (!checkingList.includes(`${neighbor[0]}-${neighbor[1]}`)) {
                let color = intersections[this.getIndex(neighbor[0], neighbor[1])].color
                if (color === SIDE.EMPTY) {
                    liberties++
                } else if (color === this.state.currentColor) {
                    liberties += this.checkLiberties(intersections, neighbor[0], neighbor[1], checkingList)
                }
            }
        }
        neighbor = neighbors[DIRECTION.RIGHT]
        if (neighbor) {
            if (!checkingList.includes(`${neighbor[0]}-${neighbor[1]}`)) {
                let color = intersections[this.getIndex(neighbor[0], neighbor[1])].color
                if (color === SIDE.EMPTY) {
                    liberties++
                } else if (color === this.state.currentColor) {
                    liberties += this.checkLiberties(intersections, neighbor[0], neighbor[1], checkingList)
                }
            }
        }

        return liberties
    }

    nextColor() {
        if (this.state.currentColor === SIDE.BLACK) {
            return SIDE.WHITE
        } else {
            return SIDE.BLACK
        }
    }

    Intersection = (props) => {
        const { rowId, colId, onClick, color, moveNo } = props
        let chessInfo = this.state.moveNumberDisplay ?
            moveNo :
            (this.state.lastMove &&
                JSON.stringify(this.state.lastMove) === JSON.stringify([rowId, colId])) ?
                <div className="mark"></div> :
                null

        if (this.state.lastMove === [rowId, colId]) {
            console.log(rowId, colId)
        }

        return (
            <button
                className={`chess ${color} ${color === SIDE.EMPTY ? ('light-' + this.state.currentColor) : ""}`}
                onClick={onClick}
            >
                {chessInfo}
            </button>
        )
    }

    Row = (props) => {
        const { rowId } = props

        let row = [...Array(this.state.boardSize)].map((_, colId) =>
            <this.Intersection
                key={`${rowId}-${colId}`}
                rowId={rowId}
                colId={colId}
                onClick={() => this.playAt(rowId, colId)}
                color={this.state.intersections[this.getIndex(rowId, colId)].color}
                moveNo={this.state.intersections[this.getIndex(rowId, colId)].moveNo}
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