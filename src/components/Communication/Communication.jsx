import s from "./Communication.module.scss";
import Message from "../Message/Message";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import {setMessage} from "../../redux/slices/messageSlice";
import _ from "underscore";
import {MyContext} from "../../App";
import {useParams, useSearchParams} from "react-router-dom";
import {useGetMessageQuery, usePaginationMutation} from "../features/messageApiSlice";


const Communication = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.message.message)
    const myId = useSelector(state => state.user.aboutUser.id)
    const people = useSelector(state => state.people.people)

    const {newMessage} = useContext(MyContext);

    const [searchParams, setSearchParams] = useSearchParams()

    const {data, isLoading} = useGetMessageQuery(searchParams.get('dialogs'))
    const [pagination,{isError}] = usePaginationMutation()
    const [currentPage, setCurrentPage] = useState(2)
    const [fetching, setFetching] = useState(false)

    const refCommunication = useRef();

    useEffect(() => {

        const paginationFunc = async () => {
            if (fetching && !isError) {
                await pagination({id: searchParams.get('dialogs'), page: currentPage})
                await setCurrentPage(pre => pre + 1)
                await setFetching(false)
            }
        }


        paginationFunc()



    }, [fetching])

    const scrollHandler = (e) => {
        if (e.target.scrollTop < 200) {
            setFetching(true)
            console.log('scroll')
        }


    }

    useEffect(() => {
        refCommunication?.current?.addEventListener('scroll', scrollHandler)


        return () => {
            refCommunication?.current?.removeEventListener('scroll', scrollHandler)

        }


    }, [])


    useEffect(() => {

        if (newMessage) {
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


    return (
        <>
            <div className={s.block__messages} ref={refCommunication}>
                {
                    isLoading && <div className={s.load}></div>
                }

                {message.map((obj, index) =>
                    (
                        obj?.type === 'Date' ?
                            <Message
                                key={`${index}_time`}
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