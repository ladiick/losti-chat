import React, {useEffect, useState} from 'react';

const useOptions2 = (currentTeacher) => {
        const [data, setData] = useState([]);

        const [options, setOptions] = useState({
            title: {
                text: 'Raiting',
            },
            data: [],
            series: [
                {
                    type: 'column',
                    xKey: 'years',
                    xName: 'Years',
                    yKey: 'avg',
                    yName: 'Average',


                }
            ],
            legend: {
                enabled: false,

            },

            axes: [
                {
                    type: 'category',
                    position: 'bottom',
                    title: {text: 'Age band (years)'},
                    // tick: {interval: },
                },
                {
                    type: 'number',
                    position: 'left',
                    title: {text: 'Total winnings (USD)'},
                },
            ],
        });

        useEffect(() => {
            let obj = []
            for (const date in currentTeacher?.test) {
                if (currentTeacher?.test[date].avg.count > 0) {
                    obj.push(
                        {
                            years: date,
                            avg: Number(currentTeacher?.test[date].avg.success.split("%")[0]),
                            count: currentTeacher?.test[date].avg.count
                        }
                    )
                }
            }
            // setData(obj)
            setOptions({...options, data: obj})

        }, [currentTeacher]);


        return [options]

    }
;

export default useOptions2;