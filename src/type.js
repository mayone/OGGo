export const LINK = Object.freeze({
    githubURL: 'https://github.com/mayone/oggo'
})

export const IMAGE = Object.freeze({
    GITHUB: '/GitHub-Mark-Light-64px.png'
})

export const AUDIO = Object.freeze({
    AETHERAS: '/aetheras.wav'
})

export const GAME_TYPE = Object.freeze({
    GO: 'go',
    GOMOKU: 'gomoku'
})

export const BOARD_SIZE = Object.freeze({
    BY9: 9,
    BY13: 13,
    BY15: 15,
    BY19: 19
})

export const MODE = Object.freeze({
    PVP: 0,
    VS_AI: 1,
    REPLAY: 2
})

export const SIDE = Object.freeze({
    BLACK: 'black',
    WHITE: 'white',
    EMPTY: 'empty'
})

export const OPPOSITE_SIDE = (side) => {
    if (side === SIDE.BLACK) {
        return SIDE.WHITE
    } else if (side === SIDE.WHITE) {
        return SIDE.BLACK
    } else {
        return null
    }
}

export const DIRECTION = Object.freeze({
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    TOP_LEFT: 'topLeft',
    TOP_RIGHT: 'topRight',
    BOTTOM_LEFT: 'bottomLeft',
    BOTTOM_RIGHT: 'bottomRight'
})

export const FOUR_DIRECTIONS = [
    DIRECTION.TOP,
    DIRECTION.BOTTOM,
    DIRECTION.LEFT,
    DIRECTION.RIGHT
]