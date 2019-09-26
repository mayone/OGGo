import React from 'react';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.boardSize = props.boardSize
        this.state = {
            intersections: [...Array(this.boardSize * this.boardSize).fill(null)],
            currentColor: props.currentColor,
            moveNumber: 0
        }
        //this.Row = this.Row.bind(this)
    }

    xCoordinate() {
        const letters = [...Array(this.boardSize)].map((_, i) => String.fromCharCode(i + 65))
        return letters
    }

    playAt = (y, x) => {
        let pos = y * this.boardSize + x
        if (!this.state.intersections[pos]) {
            let newIntersections = this.state.intersections.slice()
            newIntersections[pos] = this.state.currentColor
            this.setState({
                intersections: newIntersections,
                currentColor: this.nextColor(),
                moveNumber: this.state.moveNumber + 1
            })
        }
        console.log(this.state.intersections)
    }

    nextColor() {
        if (this.state.currentColor === "black") {
            return "white";
        } else {
            return "black"
        }
    }

    Intersection(props) {
        const { onClick, color } = props

        let value = null
        if (color === "black") {
            value = "X"
        } else if (color === "white") {
            value = "O"
        } else {
            value = ""
        }

        return (
            <button
                onClick={onClick}
            >
                {value}
            </button>
        )
    }

    Row = (props) => {
        const { rowId } = props

        let row = [...Array(this.boardSize)].map((_, colId) =>
            <this.Intersection
                key={`${rowId}-${colId}`}
                onClick={() => this.playAt(rowId, colId)}
                color={this.state.intersections[rowId * this.boardSize + colId]}
            />)

        return row
    }

    render() {
        let rows = []
        for (let rowId = 0; rowId < this.boardSize; rowId++) {
            rows.push(
                <div key={rowId}>
                    <this.Row rowId={rowId} />
                </div>
            )
        }

        return rows
    }
}