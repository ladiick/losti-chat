import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import {setMessage} from "../../redux/slices/messageSlice";
import _ from "underscore";
import {MyContext} from "../../App";
import {useSearchParams} from "react-router-dom";
import {useGetMessageQuery, usePaginationMutation} from "../features/messageApiSlice";
import {addTimeMessage} from "../actions/addTimeMessage";
import Loader from "../ui/LoaderWrapper/LoaderWrapper";
import {Oval} from "react-loader-spinner";
import LoaderWrapper from "../ui/LoaderWrapper/LoaderWrapper";


const Communication = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.message.message)
    const myId = useSelector(state => state.user.aboutUser.id)
    const people = useSelector(state => state.people.people)
    let {newMessage} = useContext(MyContext);
    const [searchParams, setSearchParams] = useSearchParams()

    const {data, isLoading} = useGetMessageQuery(searchParams.get('dialogs'))

    const [pagination, {isLoading: Load}] = usePaginationMutation()
    const [currentPage, setCurrentPage] = useState(2)
    const [fetching, setFetching] = useState(false)
    const refCommunication = useRef();


    useEffect(() => {
        setCurrentPage(2)
        setFetching(false)
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


    function scrollHandler(e) {

        if (e.target.scrollTop < 200 && message?.next) {
            setFetching(true)
            refCommunication?.current?.removeEventListener('scroll', scrollHandler)
        }
    }

    useEffect(() => {
        if (message?.next) {
            refCommunication?.current?.addEventListener('scroll', scrollHandler)
        }
        return () => {
            refCommunication?.current?.removeEventListener('scroll', scrollHandler)
        }

    }, [message])


    useEffect(() => {

        if (newMessage && message[0]?.id !== newMessage.id) {

            const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort()
            const chat = [myId, Number(searchParams.get('dialogs'))].sort()

            let ind = people.findIndex(obj => {
                return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat)
            })

            if (ind !== -1) {
                const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort()
                const isEqual = _.isEqual(arr1, arr2)
                if (isEqual) {
                    console.log(newMessage)
                    dispatch(setMessage(newMessage))

                }
            }

        }


    }, [newMessage]);


    return (
        <>
            <div className={s.block__messages} ref={refCommunication}>
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
                {addTimeMessage(message?.results).map((obj, index) =>
                    (
                        obj?.type === 'Date' ?
                            <Message
                                key={`${obj.time}_time`}
                                message={obj.message}
                                who={'Date'}
                                refCommunication={refCommunication.current}
                            /> :
                            obj?.sender?.pk === myId ?
                                <Message
                                    key={obj.id}
                                    message={obj.message}
                                    time={obj.time}
                                    who={'recipient'}
                                    refCommunication={refCommunication.current}
                                />
                                :
                                obj?.recip?.pk === myId ?
                                    <Message
                                        key={obj.id}
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