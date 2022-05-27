import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MyGame } from "../Constant/Context";
import style from "../Styles/Home.module.css"

const Home = () => {
    const { imgLink, reset } = useContext(MyGame)

    useEffect(() => {
        reset()
    }, [])

    return (
        <div className={style.container}>
            <h1 className={style.title}>Welcome!</h1>
            <div className={style.box}>
                <Link to="/game" >
                    <img src={`${imgLink}`} alt="" className={style.pic}></img>
                    <p className={style.lvTitle}>Start</p>
                </Link>
            </div>
        </div>
    )
}

export default Home