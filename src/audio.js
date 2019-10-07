import { useState, useEffect } from 'react';
import { AUDIO } from './type';

export default function GameAudio(props) {
    const { play } = props

    const initAudio = () => {
        let audio = new Audio(AUDIO.AETHERAS)
        audio.loop = true
        // Remove gap between replay
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
        if (play) {
            audio.load()
            audio.play()
        } else {
            audio.pause()
        }
    }, [audio, play])

    return null
}