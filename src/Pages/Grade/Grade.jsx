import React, {useEffect, useState} from 'react';
import s from './Grade.module.scss'
import HeaderGrade from "./HeaderGrade/HeaderGrade";
import TableTestGrade from "./TableTestGrade";
import TableExamGrade from "./TableExamGrade";
import {AgChartsReact} from 'ag-charts-react';
import useOptions from "./useOptions";
import useOptions2 from "./useOptions2";

const Grade = () => {
    const [currentTeacher, setCurrentTeacher] = useState({});
    const [options] = useOptions(currentTeacher)
    const [options2] = useOptions2(currentTeacher)
    console.log(options2)



    // console.log('histogramData', histogramData)
    console.log(currentTeacher)


    return (
        <div className={s.wrapper__grade}>
            <HeaderGrade setCurrentTeacher={setCurrentTeacher}/>

            <main className={s.main}>
                {
                    Object?.keys(currentTeacher)?.length !== 0 ?
                        <>
                            <div className={s.main__top}>
                                <div className={s.main__top__item}>
                                    <h1>Зачеты</h1>
                                    <TableTestGrade test={currentTeacher}/>
                                </div>
                                <div className={s.main__top__item}>
                                    <h1>Экзамены</h1>
                                    <TableExamGrade test={currentTeacher}/>
                                </div>
                            </div>
                            <div className={s.main__bottom}>
                                <div className={s.main__bottom__item}>
                                    <AgChartsReact options={options2}/>
                                </div>

                                <div className={s.main__bottom__item}>
                                    <AgChartsReact options={options}/>

                                </div>
                            </div>
                        </>
                        :
                        'Выберите преподавателя'
                }
            </main>

        </div>
    );
};

export default Grade;
