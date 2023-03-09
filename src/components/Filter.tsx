import React from 'react'

interface FilterProps {
    labelText: string;
    defaultOption: string;
    options: string[];
    selected: string;
    handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ labelText, defaultOption, options, selected, handleFilterChange }) => {
    return (
        <div className="form-control text-left">
            <label className="label">
                <span className="text-primary label-text">{labelText}</span>
            </label>
            <div>
                <select name={labelText} className='text-primary select select-bordered' value={selected} onChange={handleFilterChange}>
                    <option value="">{defaultOption}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filter