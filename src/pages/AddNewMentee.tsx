import React, { useCallback, useEffect, useState } from "react";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import { AuthState, logout } from '../store/features/userSlice'
import Swal from "sweetalert2";
import axios from "axios";

const AddMentee = () => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [education, setEducation] = useState('')
  const [gender, setGender] = useState('')
  const [id, setId] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state: {auth: AuthState}) => state.auth)

  const dataAdd = {
    name: name,
    status: status,
    gender: gender,
    education_type: education,
    class_id: id
  };

  const addLog = async (e : any) => {
    e.preventDefault();
    await axios
      .post(`http://34.136.159.229:8000/classes`, dataAdd, {
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!cookies.userToken) {
      dispatch(logout())
      navigate("/badpage")
    }
  }, [cookies.userToken])
  const onLogout = useCallback(
    () => {
      Swal.fire({
        title: "Are you sure want to logout?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Logout successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(logout());
          removeCookie("userToken");
          navigate("/");
        }
      });
    }, []);

  return (
    <Container>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar namePages={"Add New Mentee"}
          onLogout={onLogout}
          userName={auth.user?.token}
        />
        {/* START CONTENT HERE */}
        <form className="text-md form-control mx-10 border-2 gap-2 text-dark-alta border-dark-alta rounded-md p-5 mt-0">
          <label className="flex flex-row justify-between items-center">
            <span>Name</span>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Address</span>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Home Address</span>
            <input
              type="text"
              placeholder="Home Address"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Email</span>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row  items-center">
            <span>Gender</span>
            <div className="pl-32 items-center flex gap-3">
              <input
                onChange={(e) => setGender(e.target.value)}
                type="radio"
                name="radio-1"
                className="radio border border-gray-400 checked:bg-dark-alta"
              />
              <span>Male</span>
              <input
                type="radio"
                name="radio-1"
                className="radio border border-gray-400 checked:bg-dark-alta"
              />
              <span>Female</span>
            </div>
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Telegram</span>
            <input
              type="text"
              placeholder="Telegram"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Phone</span>
            <input
              type="text"
              placeholder="081312344321"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <span className="font-bold text-lg">Emergency Data</span>
          <label className="flex flex-row justify-between items-center">
            <span>Name</span>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Phone</span>
            <input
              type="text"
              placeholder="081312344321"
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Status</span>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full max-w-2xl bg-white border border-gray-400 h-10">
              <option >Active</option>
              <option>Interview</option>
              <option>Join Class</option>
            </select>
          </label>
          <span className="font-bold text-lg">Education Data</span>
          <label className="flex flex-row  items-center">
            <span>Type</span>
            <div className="pl-32 items-center flex gap-3 justify-end">
              <input
                onChange={(e) => setEducation(e.target.value)}
                type="radio"
                name="radio-2"
                className="radio border border-gray-400"
              />
              <span>IT</span>
              <input
                type="radio"
                name="radio-2"
                className="radio border border-gray-400"
              />
              <span>NON-IT</span>
            </div>
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Major</span>
            <input
              type="text"
              placeholder=""
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <label className="flex flex-row justify-between items-center">
            <span>Graduate</span>
            <input
              type="text"
              placeholder=""
              className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
            />
          </label>
          <div className="flex justify-end gap-2">
            <button className="btn btn-sm bg-white border border-orange-alta hover:bg-orange-alta hover:text-white hover:border-none text-orange-alta w-20" >Cancel</button>
          <button className="btn btn-sm bg-orange-alta border border-orange-alta text-white w-20" onClick={() => addLog}>Save</button>
       
            
          </div>
        </form>
        {/* END CONTENT HERE */}
      </div>
    </Container>
  );
};

export default AddMentee;
