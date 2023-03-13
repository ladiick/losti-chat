import s from './People.module.scss'
import PeopleItem from "../PeopleItem/PeopleItem";
import {useDispatch, useSelector} from "react-redux";
import {setIndex} from "../../redux/slices/peopleSlice";
import favorite from '../assets/favorite.svg'
import {useSearchParams} from "react-router-dom";
import {useGetPeopleQuery} from "../features/peopleApiSlice";
import {Oval} from "react-loader-spinner";
import LoaderWrapper from "../ui/LoaderWrapper/LoaderWrapper";

const errorStyles = {
    width: '100%',
    fontSize: '12px',
    textAlign: 'center',
    color: 'red',
    position: 'absolute',
    top: '55%', left: '50%',
    transform: 'translate(-50%,-50%)',
}

const People = ({searchValue, setSearch}) => {
    const dispatch = useDispatch()
    const myId = useSelector(state => state.user.aboutUser.id)
    const [searchParams, setSearchParams] = useSearchParams()
    const people = useSelector(state => state.people.people)
    const dialogsQuery = searchParams.get('diaglogs') || ''

    //*request
    const {data, isLoading, isError} = useGetPeopleQuery()
    //*request


    const handlerPeople = (current__obj, index) => {
        dispatch(setIndex(index))
        setSearchParams({dialogs: current__obj.pk})
        setSearch('')
    }


    return (
        <div className={s.block__people}>
            <LoaderWrapper>
                <Oval
                    height="32"
                    width="32"
                    color="#1A73E8"
                    secondaryColor="#434343"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                    visible={isLoading || isError}
                />
            </LoaderWrapper>
            {isError
                && <span style={errorStyles}>Ошибка, не удалось загрузить диалоги</span>
            }
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
                        index={index}
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
                            index={index}
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
                            index={index}
                        />
                )}


            </div>
        </div>
    )

}

export default People