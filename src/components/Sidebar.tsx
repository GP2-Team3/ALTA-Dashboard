import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { MdSpaceDashboard, MdOutlineClass } from 'react-icons/md'
import logo from '../assets/logo.png'
import Untitled from '../assets/Untitled.jpeg'


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-dark-alta h-screen">
     
        {/* ============= */}
        {/* SIDEBAR START */}
        {/* ============= */}
        
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2 " className="drawer-overlay "></label>
          <ul className="flex menu p-4 w-64 text-white  ">
            <div className=" mx-auto mb-5 w-44">
              <img src={logo} alt="logo" />
            </div>
            <hr />
            <Link to={"/dashboard"} className="mt-1">
              <li className="flex justify-start">
                <p className="font-semibold">
                <MdSpaceDashboard className="text-2xl ml-1" />
                
                  
                  Dashboard
                </p>
              </li>
            </Link>
            <Link to={"/menteelist"} className="mb-1">
              <li>
                <p className="font-semibold">
                  <FaUserAlt className="text-xl ml-1" />
                 {" "} Mentee
                </p>
              </li>
            </Link>
            <hr />
            <Link to={"/userlist"} className="mt-2 ml-1">
              <li>
                <p className="font-semibold">
                  <FaUsers className="text-2xl" />
                  Users
                </p>
              </li>
            </Link>
            <Link to={"/classlist"}>
              <li>
                <p className="font-semibold">
                <MdOutlineClass className="text-3xl" />
                  Class
                </p>
              </li>
            </Link>
          </ul>
        </div>
        {/* =========== */}
        {/* SIDEBAR END */}
        {/* =========== */}
     
    </div>
  );
};

export default Sidebar;