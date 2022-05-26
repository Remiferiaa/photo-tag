import React, { useEffect, useContext } from 'react'
import { MyGame } from '../Constant/Context'

export const format = (timer) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
}

const Timer = () => {
    const {gameState,start,setTimer, timer} = useContext(MyGame)

    useEffect(() => {
        start.current = setInterval(() => setTimer((el) => el + 1), 1000)
        return () => {
            clearInterval(start.current)
        }
    }, [])

    useEffect(() => {
        if(!gameState) {
            clearInterval(start.current)
        }
    }, [gameState, start.current])


    return (
        <div style={{alignSelf:"center"}}>{format(timer)}</div>
    )
}


export default Timer