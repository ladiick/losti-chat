import React, {useEffect} from 'react';import Social from "../../components/Social/Social";import Chat from "../../components/Chat/Chat";import {useDispatch, useSelector} from "react-redux";import useMatchMedia from "../../components/hooks/useMatchMedia";import {useSearchParams} from "react-router-dom";import {openChatBlock} from "../../redux/slices/navigationSlice";const Dialogs = () => {    const chatActive = useSelector(state => state.navigation.chat)    const dispatch = useDispatch()    const {isMobile} = useMatchMedia()    const [searchParams, setSearchParams] = useSearchParams()    useEffect(()=>{        if(searchParams.get('dialogs')){            dispatch(openChatBlock(true))        }    },[searchParams.get('dialogs')])    if (isMobile) {        return (            <>                {!chatActive && <Social/>}                {chatActive && <Chat/>}            </>        )    }    return (        <>            <Social/>            <Chat/>        </>    );};export default Dialogs;