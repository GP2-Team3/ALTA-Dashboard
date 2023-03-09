import React, { useEffect, useState } from "react";

export interface FromMenteesValue {
  full_name: string;
  email: string;
  address: string;
  phone: string;
  telegram: string;
  emergency_name: string;
  emergency_phone: string;
  emergency_status: string;
  education_type: string;
  education_major: string;
  education_grad_date: string;
}

interface FormProps {
  onSubmit: (formValues: FromMenteesValue) => void;
  editValues: FromMenteesValue;
  editMode: boolean;
}

const initialFormValues: FromMenteesValue = {
    full_name: '',
    email: '',
    address: '',
    phone: '',
    telegram: '',
    emergency_name: '',
    emergency_phone: '',
    emergency_status: '',
    education_type: '',
    education_major: '',
    education_grad_date: ''
};

const EditMentees: React.FC<FormProps> = ({ onSubmit, editValues, editMode }) => {
  const [formValues, setFormValues] = useState<FromMenteesValue>(editValues);

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
    formValues.full_name != "" &&
    formValues.email != "" &&
    formValues.address != "" &&
    formValues.phone != "" &&
    formValues.telegram != "" &&
    formValues.emergency_name != "" &&
    formValues.emergency_phone != "" &&
    formValues.emergency_status != "" &&
    formValues.education_type != "" &&
    formValues.education_major != "" &&
    formValues.education_grad_date != ""
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
            {editMode ? "Edit Mentees" : "Add new user"}
          </h3>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-primary" htmlFor="name">
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
            <label className="text-primary" htmlFor="address">
            Address
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="phone">
            Phone
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="phone"
              name="end_phonedate"
              value={formValues.phone}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="telegram">
            Telegram
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="telegram"
              name="telegram"
              value={formValues.telegram}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="emergency_name">
            Emergency Name
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="emergency_name"
              name="emergency_name"
              value={formValues.emergency_name}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="emergency_phone">
            Emergency Phone
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="emergency_phone"
              name="emergency_phone"
              value={formValues.emergency_phone}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="emergency_status">
            Emergency Status
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="emergency_status"
              name="emergency_status"
              value={formValues.emergency_status}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="education_type">
            Education Type
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="education_type"
              name="education_type"
              value={formValues.education_type}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="education_major">
            Education Major
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="education_major"
              name="education_major"
              value={formValues.education_major}
              onChange={handleInputChange}
            />
            <label className="text-primary" htmlFor="education_grad_date">
            Education Gradudate
            </label>
            <input
              required
              className="mb-2 input input-bordered"
              type="text"
              id="education_grad_date"
              name="education_grad_date"
              value={formValues.education_grad_date}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center mt-6">
              <h1 className="text-accent visible">Please enter all fields</h1>
              <button type="submit">
                <label htmlFor={submitable} className="btn bg-orange-alta border border-orange-alta text-white  hover:text-orange-alta hover:bg-white hover:border-orange-alta">
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

export default EditMentees;
