import React, { useEffect, useState } from "react";

export interface FormClassValues {
  name: string;
  short_name: string;
  start_date: string;
  end_date: string;
}

interface FormProps {
  onSubmit: (formValues: FormClassValues) => void;
  editValues: FormClassValues;
  editMode: boolean;
}

const initialFormValues: FormClassValues = {
  name: "",
  short_name: "",
  start_date: "",
  end_date: "",
};

const AddClass: React.FC<FormProps> = ({ onSubmit, editValues, editMode }) => {
  const [formValues, setFormValues] = useState<FormClassValues>(editValues);

  useEffect(() => {
    if (editMode || !editMode) {
      setFormValues(editValues);
    }
  }, [editValues, editMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  const submitable =
    formValues.name != "" &&
    formValues.short_name != "" &&
    formValues.start_date != "" &&
    formValues.end_date != ""
      ? "add-user-modal"
      : "";

  return (
    <>
      <input type="checkbox" id="add-user-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="add-user-modal"
            className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-primary text-xl mb-3">
            {editMode ? "Edit user" : "Add new user"}
          </h3>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-primary" htmlFor="name">
             Name
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="short_name">
              Short name
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="short_name"
              name="short_name"
              value={formValues.short_name}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="start_date">
              Start Date
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="start_date"
              name="start_date"
              value={formValues.start_date}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="end_date">
            End Date
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="end_date"
              name="end_date"
              value={formValues.end_date}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center mt-6">
              <h1 className="text-accent visible">Please enter all fields</h1>
              <button type="submit">
                <label htmlFor={submitable} className="btn btn-accent">
                  Submit
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddClass;
