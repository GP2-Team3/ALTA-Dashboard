import React, { useEffect, useState } from 'react';

interface TableProps {
    rows: any[];
    columns: Record<string, string>;
    loading: boolean;
    handleEdit?: React.MouseEventHandler;
    handleDelete?: React.MouseEventHandler;
    handleDetails?: React.MouseEventHandler;
}

const Table: React.FC<TableProps> = ({ rows, columns, loading, handleEdit, handleDelete, handleDetails }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <table className='table w-full drop-shadow'>
                <thead >
                    <tr>
                        {/* Gets headers from column */}
                        {Object.keys(columns).map((key) => {
                            return (
                                <th className='bg-primary border-primary text-white'>{columns[key]}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* Gets body from column and row */}
                    {rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {Object.keys(columns).map((key) => {
                                    if (columns[key] === "Edit") {
                                        return (
                                            <td className='text-accent border-primary/50'>
                                                <button onClick={handleEdit}>Edit</button>
                                            </td>
                                        );
                                    }
                                    if (columns[key] === "Delete") {
                                        return (
                                            <td className='text-accent border-primary/50'>
                                                <button onClick={handleDelete}>Delete</button>
                                            </td>
                                        );
                                    }
                                    if (columns[key] === "Details") {
                                        return (
                                            <td className='text-accent border-primary/50'>
                                                <button onClick={handleDetails}>Details</button>
                                            </td>
                                        );
                                    }
                                    return (
                                        <td className='text-primary border-primary/50' key={key}>{row[key]}</td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Table;
