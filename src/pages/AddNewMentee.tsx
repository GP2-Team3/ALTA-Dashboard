import React, { useCallback, useEffect, useState } from "react";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, User, logout } from "../store/features/userSlice";
import Swal from "sweetalert2";
import axios from "axios";

const AddMentee = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [telegram, setTelegram] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [major, setMajor] = useState("");
  const [graduate, setGraduate] = useState("");
  const [id, setId] = useState<number>();
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const fullname = JSON.parse(localStorage.getItem("user") || "") as User;

  // console.log(typeof id);
  

  // console.log(name);
  // console.log(address);
  // console.log(email);
  // console.log(telegram);
  // console.log(phone);
  // console.log(emergencyName);
  // console.log(emergencyPhone);
  // console.log(status);
  // console.log(education);
  // console.log(major);
  // console.log(graduate);
  // console.log(id);
  

  

  const menteeAdd = async (e: any) => {
    const addNewMente = {
      full_name: name,
      email: email,
      address: address,
      phone: phone,
      telegram: telegram,
      emergency_name: emergencyName,
      emergency_phone: emergencyPhone,
      emergency_status: status,
      education_type: education,
      education_major: major,
      education_grad_date: graduate,
      class_id: id,
    };
    e.preventDefault();
    await axios
      .post("https://my-extravaganza.site/mentees", addNewMente, {
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Are you sure?",
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

  useEffect(() => {
    if (!cookies.userToken) {
      dispatch(logout());
    }
  }, [cookies.userToken, dispatch]);
  console.log(auth.user?.data?.role);
  return (
    <Container>
      <Sidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <Navbar
          userName={fullname.data?.full_name}
          onLogout={handleLogout}
          namePages={"Add New Mentee"}
        />
        {/* START CONTENT HERE */}
        <div className="flex flex-wrap flex-col px-20  mx-10">
          <form
            className="text-md form-control border-2 gap-2 text-dark-alta border-dark-alta rounded-md px-20 py-5 mt-0  h-full"
            onSubmit={menteeAdd}
          >
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Name : </span>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Address : </span>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Address"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Home Address : </span>
              <input
                type="text"
                placeholder="Home Address"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Email : </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row items-center justify-between">
              <span className="text-2xl font-bold">Gender : </span>
              <div className=" items-center flex gap-3  mr-[500px] ">
                <input
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
              <span className="text-2xl font-bold">Telegram : </span>
              <input
                onChange={(e) => setTelegram(e.target.value)}
                type="text"
                placeholder="Telegram"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Phone : </span>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="081312344321"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <span className="font-semibold text-4xl">Emergency Data</span>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Name : </span>
              <input
                onChange={(e) => setEmergencyName(e.target.value)}
                type="text"
                placeholder="Name"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Phone : </span>
              <input
                onChange={(e) => setEmergencyPhone(e.target.value)}
                type="text"
                placeholder="081312344321"
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Status : </span>
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered w-full max-w-2xl bg-white border border-gray-400 h-10"
              >
                <option>Saudara dari Orang Tua</option>
                <option>Kakek Nenek</option>
                <option>Orang Tua</option>
              </select>
            </label>
            <span className="font-semibold text-4xl">Education Data</span>
            <label className="flex flex-row  items-center  justify-between">
              <span className="text-2xl font-bold">Type : </span>
              <div className="items-center flex gap-3  mr-[340px]">
                <input
                  onChange={(e) => setEducation("IT")}
                  type="radio"
                  name="radio-2"
                  className="radio border border-gray-400"
                />
                <span>IT</span>
                <input
                  onChange={(e) => setEducation("NON-IT")}
                  type="radio"
                  name="radio-2"
                  className=" radio border border-gray-400"
                />
                <span>NON-IT</span>
              </div>
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Major : </span>
              <input
                onChange={(e) => setMajor(e.target.value)}
                type="text"
                placeholder=""
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">Graduate : </span>
              <input
                onChange={(e) => setGraduate(e.target.value)}
                type="text"
                placeholder=""
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <label className="flex flex-row justify-between items-center">
              <span className="text-2xl font-bold">class ID : </span>
              <input
                onChange={(e) => setId(parseInt(e.target.value))}
                type="number"
                placeholder=""
                className="input input-bordered max-w-2xl w-full bg-white border border-gray-400 h-10"
              />
            </label>
            <div className="flex justify-end gap-2 mt-5 mb-0">
              <button
                className="btn btn-sm bg-white border border-orange-alta hover:bg-orange-alta hover:text-white hover:border-none text-orange-alta w-20"
                onClick={() => navigate("/menteelist")}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-orange-alta border border-orange-alta text-white  hover:text-orange-alta hover:bg-white hover:border-orange-alta w-20"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {/* END CONTENT HERE */}
      </div>
    </Container>
  );
};

export default AddMentee;
