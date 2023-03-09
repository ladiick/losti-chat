import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import {fetchMessage, setMessage} from "../../redux/slices/messageSlice";
import _ from "underscore";
import {MyContext} from "../../App";
import {useParams, useSearchParams} from "react-router-dom";



const Communication = () => {
    const dispatch = useDispatch()
    let message = useSelector(state => state.message.message)
    const myId = useSelector(state => state.user.aboutUser.id)
    const people = useSelector(state => state.people.people)
    const peopleCurrentId = useSelector(state => state.people.peopleCurrent.pk)
    const userAccessToken = useSelector((state) => state.user.tokens.access)
    const userRefreshToken = useSelector((state) => state.user.tokens.refresh)
    const isAuth = useSelector(state => state.user.isAuth)
    const {newMessage} = useContext(MyContext);

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (isAuth && userAccessToken) {
            dispatch(fetchMessage(
                {
                    userAccessToken,
                    userRefreshToken,
                    id: searchParams.get('dialogs')
                }))
        }
    }, [searchParams.get('dialogs')])


    useEffect(() => {

        if (newMessage) {
            const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort()
            const chat = [myId, peopleCurrentId].sort()

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


    const refCommunication = useRef();
    if (!message) {
        return (
            <div className={s.load}></div>
        )
    }

    return (
        <>
            <div className={s.block__messages} ref={refCommunication}>
                {message.map((obj, index) =>
                    (
                        obj?.type === 'Date' ?
                            <Message
                                key={index}
                                message={obj.message}
                                who={'Date'}
                                refCommunication={refCommunication.current}
                            /> :
                            obj?.sender.pk === myId ?
                                <Message
                                    key={index}
                                    message={obj.message}
                                    time={obj.time}
                                    who={'recipient'}
                                    refCommunication={refCommunication.current}
                                />
                                :
                                obj?.recip.pk === myId ?
                                    <Message
                                        key={index}
                                        message={obj.message}
                                        time={obj.time}
                                        who={'sender'}
                                        refCommunication={refCommunication.current}
                                    />
                                    : ''

                    )
                ).reverse()
                }

            </div>

        </>


    )

}

export default Communication