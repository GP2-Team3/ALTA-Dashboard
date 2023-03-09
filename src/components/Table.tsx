import React, { useEffect, useState } from 'react';

interface TableProps {
    rows: any[];
    columns: Record<string, string>;
    loading: boolean;
    handleEdit?: (id: number) => void;
    handleDelete?: (id: number) => void;
    handleDetails?: (id: number) => void;
    editModal?: string;
}

const Table: React.FC<TableProps> = ({ rows, columns, loading, handleEdit, handleDelete, handleDetails, editModal }) => {
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
                                <th key={key} className='bg-primary border-primary text-white'>{columns[key]}</th>
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
                                            <td key={key} className='text-accent border-primary/50 '>
                                                <button  onClick={() => handleEdit && handleEdit(row.id)}>
                                                    <label className='cursor-pointer' htmlFor={editModal}>Edit</label>
                                                </button>
                                            </td>
                                        );
                                    }
                                    if (columns[key] === "Delete") {
                                        return (
                                            <td key={key} className='text-accent border-primary/50'>
                                                <button onClick={() => handleDelete && handleDelete(row.id)}>Delete</button>
                                            </td>
                                        );
                                    }
                                    if (columns[key] === "Details") {
                                        return (
                                            <td key={key} className='text-accent border-primary/50'>
                                                <button onClick={() => handleDetails && handleDetails(row.id)}>Details</button>
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
