import { useState, useEffect } from 'react';

export default function GameAudio(props) {
    const { play } = props

    const initAudio = () => {
        let audio = new Audio("/aetheras.wav")
        audio.loop = true
        audio.addEventListener('timeupdate', function () {
            let buffer = .22
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 0
                this.play()
            }
        }, false)

        return audio
    }

    const [audio] = useState(initAudio())

    useEffect(() => {
        console.log("state change to", play)
        if (play) {
            audio.load()
            audio.play()
        } else {
            audio.pause()
        }
    }, [audio, play])

    return null
}