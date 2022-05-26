import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { MyGame } from '../Constant/Context';
import { db } from '../firebase';
import { format } from './Timer';
import style from '../Styles/Leaderboard.module.css'

const Leaderboard = () => {
    const { reset } = useContext(MyGame)
    const [board, setBoard] = useState([])

    useEffect(() => {
        reset()
        loadMessages()
    }, [])

    const loadMessages = async () => {
        const recordCall = await getDocs(query(collection(db, 'clear'), orderBy('record', "asc"), limit(15)));
        let stuff = []
        recordCall.forEach(item => {
            stuff.push(item.data())
        })
        setBoard(stuff)
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>Leaderboard</h1>
            <div className={style.header}>
                <p className={style.headerIndex}>Rank</p>
                <p className={style.headerName}>Name</p>
                <p className={style.headerRecord}>Clear Time</p>
            </div>
            {(board.length > 0) ? board.map((item, index) => {
                return (
                    <div key={index} className={style.rank}>
                        <p className={style.index}>{index + 1} </p>
                        <p className={style.name}>{item.name}</p>
                        <p className={style.record}>{format(`${item.record}`)}</p>
                    </div>
                )
            }) : null}
        </div>
    )
}

export default Leaderboard