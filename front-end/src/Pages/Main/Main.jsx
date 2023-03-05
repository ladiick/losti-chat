import Chat from '../../components/Chat/Chat'
import Home from '../../components/Home/Home'
import Social from '../../components/Social/Social'
import React from "react";
import {useLocation} from "react-router-dom";

const Main = () => {
    const location = useLocation()

    return (
        <>
            <Social/>
            <Chat/>
        </>
    )
}

export default Main
