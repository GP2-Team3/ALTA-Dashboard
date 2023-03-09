import React, { useCallback, useEffect, useState } from "react";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, User, logout } from "../store/features/userSlice";
import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import CardNewLog from "../components/CardLog";
import ButtonNewLog from "../components/ButtonNewLog";

const MenteeLog = () => {
  const [logs, setLogs] = useState([''])
  const [detail, setDetail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location?.state?.id;
  const fullname = JSON.parse(localStorage.getItem('user') || "") as User
  const [onSelect ,setOnSelect] = useState('')

  // const urlDetailLogs = `https://virtserver.swaggerhub.com/ASPEAKER427_1/immersive-dashboard-app_api/2.0.0/mentees/${id}/logs`
  // const urlGetDetail = async() => {
  //   await axios.get(urlDetailLogs, {
  //     headers :{Authorization : `Bearer ${cookies.userToken}`}
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //     setDetail(res.data)
  //   })
  //   .catch((err) => { console.log(err);
  //    })
  // } 



  const API_URL = 'https://my-extravaganza.site/mentees/10/logs?page=1&limit=2';  
  const getDetail = async () => {
    try {
      const response = await axios.get(API_URL);
      setLogs(response.data.data.data);
      console.log(typeof logs)
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Are you sure?",
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

  useEffect(() => {
    if (!cookies.userToken) {
      dispatch(logout());
    }
    getDetail();
    // urlGetDetail()
  }, [cookies.userToken, dispatch]);

  return (
    <Container>
      <Sidebar />
      <div className="flex flex-col w-full h-full m-5 ">
        <Navbar
          onLogout={handleLogout}
          namePages={"Mentee Log"}
          userName={fullname.data?.full_name}
        />
         <div className="flex px-20 justify-between"> 
           <div className="ml-20">
            <h1 className="text-2xl">
              Rachman Kamil
              <span className="text-slate-400 text-lg pl-5">
                (-kamil-)
              </span>
            </h1>
            <p className="text-lg">QE Batch 8</p>
            <p className="text-xl">IPA</p>
            <p className="text-xl">SMA Negeri 4 Surabaya</p>
          </div>
          <div className="p-3 mr-20">
            <p>
              Phone : <span>0812323244</span>
            </p>
            <p>
              Telegram : <span>@adamfadrian</span>
            </p>
            <p>
              Discord : <span>@davekoz</span>
            </p>
            <p>
              Email : <span>babang@gmail.com</span>
            </p>
          </div>
        </div> 
        <div className="pt-12 text-right mr-[200px]">
          <div
            className="bg-orange-alta w-30 border-none text-white btn mr-2"
            onClick={() => navigate("/menteelist")}
          >
            Back
          </div>
          <ButtonNewLog 
          />
        </div>
       <div className="flex flex-col gap-5 pt-5">
          {
            logs ? 
            logs?.map((item: any) => {
            return (
              <CardNewLog
                key={item.id}
                title={item.title}
                fullName={item.fullname_user}
                date={item.created_date}
                feedback={item.feedback}
                status={item.status}
              />
            )
          }) : <>
            <CardNewLog
                title={`Adam`}
                fullName={`Adam fadrian`}
                date={`2016-09-09`}
                feedback={`lorem ipsum sit dolor amat`}
                status={`Active`}
          />
          <CardNewLog
                title={`Adam`}
                fullName={`Adam fadrian`}
                date={`2016-09-09`}
                feedback={`lorem ipsum sit dolor amat`}
                status={`Active`}
          />
          <CardNewLog
                title={`Adam`}
                fullName={`Adam fadrian`}
                date={`2016-09-09`}
                feedback={`lorem ipsum sit dolor amat`}
                status={`Active`}
          />        
            </> }
        </div> 
      </div> 
    </Container>
  );
};

export default MenteeLog;
