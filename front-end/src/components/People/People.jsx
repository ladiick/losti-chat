import s from './People.module.scss'
import PeopleItem from "../PeopleItem/PeopleItem";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPeople,
    setCurrentPeople, setIndex
} from "../../redux/slices/peopleSlice";
import favorite from '../assets/favorite.svg'
import {useSearchParams} from "react-router-dom";


const People = ({searchValue, setSearch}) => {
    const userAccessToken = useSelector((state) => state.user.tokens.access)
    const userRefreshToken = useSelector((state) => state.user.tokens.refresh)

    const isAuth = useSelector(state => state.user.isAuth)
    const people = useSelector(state => state.people.people)
    const myId = useSelector(state => state.user.aboutUser.id)

    const [searchParams, setSearchParams] = useSearchParams()

    const dialogsQuery = searchParams.get('diaglogs') || ''

    const dispatch = useDispatch()
    useEffect(() => {
        if (isAuth && userAccessToken) {
            dispatch(fetchPeople({userAccessToken, userRefreshToken}))
        }
        return () => {
            dispatch(setCurrentPeople({}))
        }
    }, [isAuth, userAccessToken]);




    const handlerPeople = (current__obj, index) => {
        dispatch(setIndex(index))
        // dispatch(setCurrentPeople(current__obj))
        // dispatch(openChatBlock(false))
        setSearchParams({dialogs: current__obj.pk})
        setSearch('')
    }



    return (
        <div className={s.block__people}>
            <div className={s.wrapper__items}>
                {people?.filter((people) => (
                    people.sender.pk === myId && people.recip.pk !== myId ?
                        people?.recip.first_name.toLowerCase().includes(searchValue.toLowerCase())
                        ||
                        people?.recip.last_name.toLowerCase().includes(searchValue.toLowerCase())
                        :
                        people?.sender.first_name.toLowerCase().includes(searchValue.toLowerCase())
                        ||
                        people?.sender.last_name.toLowerCase().includes(searchValue.toLowerCase())

                )).map((obj, index) => obj.sender.pk === myId && obj.recip.pk !== myId ?
                    <PeopleItem
                        key={obj.recip.pk}
                        id={obj.recip.pk}
                        firstName={obj.recip.first_name}
                        lastName={obj.recip.last_name}
                        message={`Вы: ${obj.message}`}
                        time={obj.time}
                        img={obj.recip.image}
                        handlerPeople={() => handlerPeople(obj.recip, index)}
                        obj={obj.recip}
                    />

                    : obj.sender.pk === myId && obj.recip.pk === myId

                        ?
                        <PeopleItem
                            key={0}
                            id={obj.sender.pk}
                            firstName={'Избранное'}
                            lastName={''}
                            message={obj.message}
                            time={obj.time}
                            img={favorite}
                            handlerPeople={() => handlerPeople(obj.sender, index)}
                            obj={obj.sender}
                        />

                        :
                        <PeopleItem
                            key={obj.sender.pk}
                            id={obj.sender.pk}
                            firstName={obj.sender.first_name}
                            lastName={obj.sender.last_name}
                            message={obj.message}
                            time={obj.time}
                            img={obj.sender.image}
                            handlerPeople={() => handlerPeople(obj.sender, index)}
                            obj={obj.sender}
                        />
                )}


            </div>
        </div>
    )

}

export default People