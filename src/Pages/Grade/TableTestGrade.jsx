import React from 'react';

const TableTestGrade = ({test}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Количество</th>
                <th>Зачтено</th>
                <th>Незачтено</th>
                <th>Сдано</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{test?.avg?.count_1}</td>
                <td>{test?.grade?.good}</td>
                <td>{test?.grade?.bad + test?.grade?.no_show_1}</td>
                <td>{test?.avg?.success}</td>
            </tr>
            </tbody>
        </table>
    );
};

export default TableTestGrade;
