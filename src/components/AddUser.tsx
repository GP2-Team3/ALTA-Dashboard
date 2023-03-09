import React, { useEffect, useState } from "react";

export interface FormValues {
  full_name: string;
  email: string;
  password: string;
  team: string;
  role: string;
  status: string;
}

interface FormProps {
  onSubmit: (formValues: FormValues) => void;
  editValues: FormValues;
  editMode: boolean;
}

const initialFormValues: FormValues = {
  full_name: "",
  email: "",
  password: "",
  team: "",
  role: "",
  status: "",
};

const AddUser: React.FC<FormProps> = ({ onSubmit, editValues, editMode }) => {
  const [formValues, setFormValues] = useState<FormValues>(editValues);

  useEffect(() => {
    if (editMode || !editMode) {
      setFormValues(editValues);
    }
  }, [editValues, editMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormValues);
  };

  const submitable =
    formValues.full_name != "" &&
    formValues.email != "" &&
    formValues.password != "" &&
    formValues.team != "" &&
    formValues.role != "" &&
    formValues.status != ""
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
            <label className="text-primary" htmlFor="full_name">
              Full Name
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="full_name"
              name="full_name"
              value={formValues.full_name}
              onChange={handleInputChange}
            />

            <label className="text-primary" htmlFor="email">
              Email
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />

            <div className={`${editMode ? "hidden" : ""} flex flex-col`}>
              <label className="text-primary" htmlFor="password">
                Password
              </label>
              <input
                {...(editMode ? {} : { required: true })}
                className="mb-2 input input-bordered"
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <label className="text-primary" htmlFor="team">
                  Team
                </label>
                <select
                  required
                  className="mb-2 select select-bordered"
                  id="team"
                  name="team"
                  value={formValues.team}
                  onChange={handleSelectChange}
                >
                  <option disabled value="">
                    Select a Team
                  </option>
                  <option value="Mentor">Mentor</option>
                  <option value="Placement">Placement</option>
                  <option value="People">People</option>
                  <option value="Admission">Admission</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-primary" htmlFor="role">
                  Role
                </label>
                <select
                  required
                  className="mb-2 select select-bordered"
                  id="role"
                  name="role"
                  value={formValues.role}
                  onChange={handleSelectChange}
                >
                  <option disabled value="">
                    Select a Role
                  </option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-primary" htmlFor="status">
                  Status
                </label>
                <select
                  required
                  className="mb-2 select select-bordered"
                  id="status"
                  name="status"
                  value={formValues.status}
                  onChange={handleSelectChange}
                >
                  <option disabled value="">
                    Select a Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Not-Active">Not-Active</option>
                  <option value="Deleted">Deleted</option>
                </select>
              </div>
            </div>

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

export default AddUser;
