import React, {useState} from 'react';
import s from "../Grade.module.scss";
import {ActionButton} from "../../../components/ui/ActionButton/ActionButton";
import axios from "axios";
import SearchBlock from '../../../components/ui/SearchBlock/SearchBlock'

const HeaderGrade = ({setCurrentTeacher}) => {
    const [inputText, setInputText] = useState('');
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    const handlerTeachers = async () => {

        const response = await axios.get(`http://3.67.195.156:8003/api/v1/perTeach/${inputText}/`)
        if (Object.keys(response.data.data).length > 0) {
            setCurrentTeacher(response.data.data[Object.keys(response.data.data)[0]])
            setData(response.data.data)
        } else {
            setError('Такого преподавателя не существует')
            setData({})
            setCurrentTeacher({})
        }
        setInputText('')
    }


    const changeTeacher = (value) => {
        setCurrentTeacher(data[value])
    }

    return (
        <header className={s.header}>
            <div className={s.header__content}>
                <label className={s.label}>
                    <span>
                    Введите имя преподавателя
                        </span>
                    <SearchBlock searchValue={inputText} setSearch={setInputText}/>
                </label>
                <ActionButton
                    style={{marginLeft: 10}}
                    onClick={handlerTeachers}>Отправить</ActionButton>
            </div>
            {Object?.keys(data)?.length < 1 && error}

            {Object?.keys(data)?.length > 1 ?
                <select className={s.select}
                        defaultValue={Object?.keys(data)[0]}
                        onChange={(e) => changeTeacher(e.target.value)}>
                    {Object?.keys(data).map(obj =>

                        <option key={obj}
                                value={data.obj}>{obj}</option>
                    )}
                </select>
                :
                <h3>
                    {Object?.keys(data)[0]}
                </h3>
            }
        </header>
    );
};

export default React.memo(HeaderGrade);
