import React, {useEffect, useState} from 'react';
import s from "./RegistrationFormStep4.module.scss";
import {useForm} from "react-hook-form";
import camera from '../../assets/camera.svg'
import RegistrationFormStepInfoUser from "../RegistrationFormStepInfoUser/RegistrationFormStepInfoUser";
import check from '../../assets/check_mark.svg'
import {useDispatch, useSelector} from "react-redux";
import {redirect, useNavigate} from "react-router-dom";
import {setRegistrationSteps} from "../../../redux/slices/registrationStepsSlice";
import axios from "axios";
import {HOST} from "../../api/HOST";
import {IoCloseOutline} from "react-icons/io5";

const RegistrationFormStep4 = () => {
    const navigate = useNavigate()
    const stepsInfo = useSelector(state => state.registration.stepsInfo)
    const dispatch = useDispatch()
    const [image, setImage] = useState("");

    useEffect(() => {
        if (stepsInfo.password === "") {
            navigate('/registration')
        }
    }, [])

    const {
        register, handleSubmit, watch, formState: {errors, isValid},
    } = useForm({
        mode: 'onChange',
    })

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                setImage({
                    ...image, imagePreview: reader.result, file: file
                });
            };
            reader.readAsDataURL(file);
        }
    };


    const onSubmit = async data => {
        const newDate = new Date(data.birth_date)
        let generalData = {}

        data.birth_date = newDate.toLocaleDateString('ru')
            .split('.')
            .reverse()
            .join('-')


        if (image.file) {
            generalData = {
                ...data,
                ...stepsInfo,
                img: image.file
            }

        } else {
            generalData = {
                ...data,
                ...stepsInfo
            }
        }


        await axios.post(`${HOST}/api/v1/auth/users/`, generalData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        navigate('/authorization')
    }
    return (<>
        <div className={s.form}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className={s.wrapper__form}>
                    <h3 className={s.description__title}>Информация о вас</h3>
                    <div className={s.wrapper__info}>
                        <label className={s.label__img}>
                            <div
                                className={s.wrapper__uploadImg}
                                style={image ? {borderColor: '#1a73e8'} : {}}>
                                {
                                    image ?
                                        <img className={s.image__upload}
                                             src={image.imagePreview} alt="check"/>

                                        :
                                        <img src={camera} alt="camera"/>

                                }

                            </div>

                            <input
                                type='file'
                                accept='image/*,.png,.jpg,'
                                onChange={onImageChange}
                            />
                        </label>

                        {image ? <span className={s.delete_image}
                                       onClick={()=>setImage('')}
                        ><IoCloseOutline/></span> : ''}

                        <div className={s.field_names}>
                            <label className={s.label__inputs}>
                                {errors?.first_name ? (<div
                                    className={s.error__send}>{errors.first_name.message}</div>) : errors?.last_name ? (
                                    <div className={s.error__send}>{errors.last_name.message}</div>) : ''}
                                <input
                                    className={s.input__first}
                                    type='text'
                                    placeholder='Имя'
                                    style={errors?.first_name && {borderColor: 'red'}}
                                    {...register('first_name', {
                                        required: 'Необходимо заполнить', pattern: {
                                            value: /^([^0-9]*)$/, message: 'Имя содержит цифр'
                                        }

                                    })}
                                />
                            </label>

                            <label className={s.label__inputs}>
                                {/*{errors?.last_name ? (*/}
                                {/*	<div className={s.error__send}>{errors.last_name.message}</div>*/}
                                {/*) : (*/}
                                {/*	''*/}
                                {/*)}*/}
                                <input
                                    className={s.input__last}
                                    type='text'
                                    placeholder='Фамилия'
                                    style={errors?.last_name && {borderColor: 'red'}}
                                    {...register('last_name', {
                                        required: 'Необходимо заполнить', pattern: {
                                            value: /^([^0-9]*)$/, message: 'Фамилия содержит цифр'
                                        }
                                    })}
                                />
                            </label>


                        </div>

                    </div>

                    <RegistrationFormStepInfoUser errors={errors} register={register}/>
                </div>
                <button className={s.btn_submit} disabled={!isValid}>
                    Зарегистрироваться
                </button>

            </form>
        </div>
    </>);
};

export default RegistrationFormStep4;
