import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import React,{useContext, useEffect, useRef, useState} from "react";
import {changeActiveMessage, clearMessage, currentMessage, setMessage} from "../../redux/slices/messageSlice";
import _ from "underscore";
import {MyContext} from "../../App";
import {useSearchParams} from "react-router-dom";
import {useGetMessageQuery, usePaginationMutation} from "../features/messageApiSlice";
import {addTimeMessage} from "../actions/addTimeMessage";
import {Oval} from "react-loader-spinner";
import LoaderWrapper from "../ui/LoaderWrapper/LoaderWrapper";
import {FiArrowDown} from "react-icons/fi";


const Communication = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.message.message)
    const myId = useSelector(state => state.user.aboutUser.id)
    const currentMessages = useSelector(state => state.message.currentMessage)

    const people = useSelector(state => state.people.people)
    let {newMessage} = useContext(MyContext);
    const [searchParams, setSearchParams] = useSearchParams()
    const [scrollButton, setScrollButton] = useState(false)
    const {data, isLoading} = useGetMessageQuery(searchParams.get('dialogs'), {refetchOnMountOrArgChange: true})

    const [pagination, {isLoading: Load}] = usePaginationMutation()
    const [currentPage, setCurrentPage] = useState(2)
    const [fetching, setFetching] = useState(false)
    const refCommunication = useRef();


    useEffect(() => {
        setCurrentPage(2)
        setFetching(false)
        return ()=>{
            dispatch(clearMessage())
        }
    }, [searchParams.get('dialogs')])


    useEffect(() => {
        const paginationFunc = async () => {
            setFetching(false)
            await pagination({id: searchParams.get('dialogs'), page: currentPage})
            setCurrentPage(pre => pre + 1)
        }
        if (fetching && message?.next) {
            paginationFunc()
        }

    }, [fetching])


    const dialogDown = () => {
        refCommunication.current.scrollTop = refCommunication.current.scrollHeight
    }


    function scrollHandler(e) {
        if (e.target.scrollTop + e.target.clientHeight < e.target.scrollHeight) {
            setScrollButton(true)
        }

        if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 200) {
            setScrollButton(false)
        }

        if (e.target.scrollTop < 200 && message?.next) {
            setFetching(true)
            refCommunication?.current?.removeEventListener('scroll', scrollHandler)
        }
    }

    useEffect(() => {

        refCommunication?.current?.addEventListener('scroll', scrollHandler)

        return () => {
            refCommunication?.current?.removeEventListener('scroll', scrollHandler)
        }

    }, [message])

    useEffect(() => {

        if (newMessage && message?.results?.[0]?.id !== newMessage.id) {

            const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort()
            const chat = [myId, Number(searchParams.get('dialogs'))].sort()

            let ind = people.findIndex(obj => {
                return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat)
            })

            if (ind !== -1) {
                const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort()
                const isEqual = _.isEqual(arr1, arr2)
                if (isEqual) {
                    dispatch(setMessage(newMessage))

                }
            }

        }


    }, [newMessage]);


    const handlerCurrentMessage = (obj) => {
        dispatch(currentMessage(obj))
    }

    if (isLoading) {
        return (

            <div className={s.block__messages}>
                <LoaderWrapper top={Load ? 1 : 0}>
                    <Oval
                        height="32"
                        width="32"
                        color="#1A73E8"
                        secondaryColor="#434343"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                        visible={isLoading || Load}
                    />
                </LoaderWrapper>
            </div>

        )
    }


    return (
        <>
            <div className={s.block__messages} ref={refCommunication}>
                {addTimeMessage(message?.results).map((obj, index) =>
                    (
                        obj?.type === 'Date' ?
                            <Message
                                key={`${obj.time}_time`}
                                message={obj.message}
                                who={'Date'}
                                obj={obj}
                                handlerCurrentMessage={() => handlerCurrentMessage(obj)}
                            /> :
                            obj?.sender?.pk === myId ?
                                <Message
                                    key={obj.id}
                                    message={obj.message}
                                    time={obj.time}
                                    who={'recipient'}
                                    obj={obj}

                                    handlerCurrentMessage={() => handlerCurrentMessage(obj)}

                                />
                                :
                                obj?.recip?.pk === myId ?
                                    <Message
                                        key={obj.id}
                                        message={obj.message}
                                        time={obj.time}
                                        who={'sender'}
                                        obj={obj}
                                        handlerCurrentMessage={() => handlerCurrentMessage(obj)}

                                    />
                                    : ''

                    )
                ).reverse()
                }

                {
                    scrollButton &&
                    <div className={s.button__down}
                         onClick={dialogDown}>
                        <span>
                            <FiArrowDown/>
                            </span>
                    </div>
                }
            </div>

        </>


    )

}

export default Communication