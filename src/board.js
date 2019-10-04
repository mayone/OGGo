import React from 'react';
import { GAME_TYPE, SIDE, OPPOSITE_SIDE, DIRECTION, FOUR_DIRECTIONS } from './type'

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
            gameEnded: false,
            goInfo: {
                blackStonesCaptured: 0,
                whiteStonesCapcuted: 0
            }
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
            gameEnded: false,
            goInfo: {
                blackStonesCaptured: 0,
                whiteStonesCapcuted: 0
            }
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

    pass = () => {
        this.setState((prevState) => {
            return {
                totalMoves: prevState.totalMoves + 1,
                currentColor: OPPOSITE_SIDE(this.state.currentColor)
            }
        })
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
                    currentColor: OPPOSITE_SIDE(this.state.currentColor)
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
                        currentColor: OPPOSITE_SIDE(this.state.currentColor)
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
        let stonesCaptured = 0
        newIntersections[this.getIndex(y, x)] = {
            color: this.state.currentColor,
            moveNo: this.state.totalMoves + 1
        }
        // Capture
        stonesCaptured = this.capture(newIntersections, y, x, checkingList)
        if (stonesCaptured) {
            this.recordStonesCaptured(stonesCaptured)
            return newIntersections
        } else {
            //checkingList = []
            if (this.hasLiberty(newIntersections, y, x, checkingList)) {
                return newIntersections
            } else {
                return null
            }
        }
        // return null
    }

    recordStonesCaptured = (stonesCaptured) => {
        this.setState((prevState) => {
            if (this.state.currentColor === SIDE.BLACK) {
                return {
                    goInfo: {
                        whiteStonesCapcuted: prevState.goInfo.whiteStonesCapcuted + stonesCaptured,
                        blackStonesCaptured: prevState.goInfo.blackStonesCaptured
                    }
                }
            } else if (this.state.currentColor === SIDE.WHITE) {
                return {
                    goInfo: {
                        whiteStonesCapcuted: prevState.goInfo.whiteStonesCapcuted,
                        blackStonesCaptured: prevState.goInfo.blackStonesCaptured + stonesCaptured
                    }
                }
            }
        })
    }

    capture = (intersections, y, x, checkingList) => {
        let selfColor = intersections[this.getIndex(y, x)].color
        let neighbors = this.getNeighbors(y, x)
        let captures = 0
        let aliveList = []

        for (const [, direction] of FOUR_DIRECTIONS.entries()) {
            let neighbor = neighbors[direction]
            if (neighbor) {
                let color = intersections[this.getIndex(neighbor[0], neighbor[1])].color
                if (color === OPPOSITE_SIDE(selfColor)) {
                    if (aliveList.includes(`${neighbor[0]}-${neighbor[1]}`)) {
                        continue
                    }
                    if (this.hasLiberty(intersections, neighbor[0], neighbor[1], checkingList)) {
                        aliveList = aliveList.concat(checkingList)
                        checkingList = []
                    } else {
                        captures += checkingList.length
                        for (const [, pos] of checkingList.entries()) {
                            const [y, x] = pos.split('-').map((v, i) => +v)
                            intersections[this.getIndex(y, x)] = {
                                color: SIDE.EMPTY,
                                moveNo: 0
                            }
                        }
                        checkingList = []
                    }
                }
            }
        }

        return captures
    }

    hasLiberty = (intersections, y, x, checkingList) => {
        let selfColor = intersections[this.getIndex(y, x)].color
        let neighbors = this.getNeighbors(y, x)

        checkingList.push(`${y}-${x}`)

        for (const [, direction] of FOUR_DIRECTIONS.entries()) {
            let neighbor = neighbors[direction]
            if (neighbor) {
                let color = intersections[this.getIndex(neighbor[0], neighbor[1])].color
                if (color === SIDE.EMPTY) {
                    return true
                } else if (color === selfColor) {
                    if (!checkingList.includes(`${neighbor[0]}-${neighbor[1]}`) &&
                        this.hasLiberty(intersections, neighbor[0], neighbor[1], checkingList)) {
                        return true
                    }
                }
            }
        }

        return false
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

    BoardDisplay = () => {
        let board = [...Array(this.state.boardSize)].map((_, rowId) =>
            <div className="row" key={rowId}>
                <this.Row rowId={rowId} />
            </div>)

        return board
    }

    GoStonesCapture = () => {
        if (this.state.gameType !== GAME_TYPE.GO) {
            return null
        } else {
            return (
                <div className="statistics">
                    <span className="scoring">
                        <span className="black-text-span">
                            Black
                        </span>
                        <span>
                            {`${this.state.goInfo.whiteStonesCapcuted}`}
                        </span>
                        <button className="chess white icon"></button>
                    </span>
                    <span className="scoring">
                        <span className="white-text-span">
                            White
                        </span>
                        <span>
                            {`${this.state.goInfo.blackStonesCaptured}`}
                        </span>
                        <button className="chess black icon"></button>
                    </span>
                </div>
            )
        }
    }

    render() {
        return (
            <>
                <this.BoardDisplay />
                <this.GoStonesCapture />
            </>
        )
    }
}