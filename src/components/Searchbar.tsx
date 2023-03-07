import React from "react";

interface SearchbarProps {
  searchTerm: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Searchbar: React.FC<SearchbarProps> = ({ handleFilterChange, searchTerm }: SearchbarProps) => {
  return (
    <div className='flex gap-2'>
      <div className="form-control text-left">
        <label className="label">
          <span className="label-text">Search</span>
        </label>
        <div>
          <input className='input input-bordered' type="text" placeholder="Search by name" value={searchTerm} onChange={handleFilterChange} />
        </div>
      </div>

    </div>
  );
};

export default Searchbar;
