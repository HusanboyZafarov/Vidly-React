import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = (props) => {
    const { columns, sortColumn, onSort, data } = props;

    if (!data || data.length === 0) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.path || column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={columns.length}>No data available</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table className="table">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
            <TableBody data={data} columns={columns} />
        </table>
    );
}

export default Table;
