import React from 'react';

const TableExamGrade = ({test}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Количество</th>
                <th>Неудовл</th>
                <th>Удовл</th>
                <th>Хорошо</th>
                <th>Отлично</th>
                <th>Среднее</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{test?.avg?.count_2}</td>
                <td>{test?.grade?.two + test?.grade?.no_show_2}</td>
                <td>{test?.grade?.three}</td>
                <td>{test?.grade?.four}</td>
                <td>{test?.grade?.five}</td>
                <td>{test?.avg?.avg}</td>
            </tr>
            </tbody>
        </table>
    );
};

export default TableExamGrade;
