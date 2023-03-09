import React, { ChangeEventHandler, FC, useState } from "react";

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selected?: string;
  handleChange?: React.ChangeEventHandler;
  handleSave?: React.MouseEventHandler<HTMLButtonElement>;
}
const ButtonNewLog: FC<Props> = ({
  onChange,
  selected,
  handleChange,
  handleSave,
}) => {
  return (
    <>
      <label htmlFor="my-modal-6" className="bg-dark-alta w-30 text-white btn">
        Add New Log
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-start">New Log</h3>
          <div className="flex  flex-col  text-start mt-5 gap-2">
            <p className="text-dark-alta">Status</p>
            <select
              value={selected}
              onChange={onChange}
              className="select select-bordered w-40 bg-white border border-dark-alta h-10 text-dark-alta"
            >
              <option value="active">Active</option>
              <option value="Not-Active">Not-Active</option>
              <option value="Deleted">Deleted</option>
            </select>
          </div>
          <div className="flex flex-col mt-5 mb-5 text-start gap-2">
            <p className="text-dark-alta">Feedback</p>
            <textarea
              placeholder="Bio"
              className="textarea textarea-bordered textarea-xs w-full max-w-xs"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-row justify-end align-middle gap-2">
            <label
              htmlFor="my-modal-6"
              className="modal-action btn-sm w-20 my-auto btn  bg-white border border-orange-alta hover:bg-orange-alta hover:text-white hover:border-none text-orange-alta "
            >
              Cancel
            </label>
            <button
              type="submit"
              className="btn btn-sm bg-orange-alta border border-orange-alta text-white w-20 hover:text-orange-alta hover:bg-white hover:border-orange-alta"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonNewLog;
