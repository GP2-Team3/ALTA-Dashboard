import React, { useCallback, useEffect, useState } from "react";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { json, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, User, logout } from "../store/features/userSlice";
import axios, { AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import CardNewLog from "../components/CardLog";
import ButtonNewLog from "../components/ButtonNewLog";
import { useParams } from "react-router-dom";

const MenteeLog = () => {
  const [logs, setLogs] = useState([""]);
  const [detail, setDetail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [mentees, setMentees] = useState<number | any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const idState = location?.state?.id;
  const fullname = JSON.parse(localStorage.getItem("user") || "") as User;
  const [onSelect, setOnSelect] = useState("");

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [id, setId] = useState<number>();

  const params = useParams();
  const mentee: any = params.id;

  const addNewLog = async () => {
    const addLogs = {
      title: title,
      status: status,
      feedback: feedback,
      mentee_id: parseInt(mentee),
    };
    await axios
      .post("https://my-extravaganza.site/logs", addLogs, {
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setStatus("");
        setFeedback("");
        getLogs();
      })
      .catch((err) => console.log(err));
  };
  // Add New Log end

  // Fetch data for details
  const getDetails = async () => {
    await axios
      .get(`https://my-extravaganza.site/mentees/${mentee}`, {
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      })
      .then((res) => {
        setMentees(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };


  const API_URL = `https://my-extravaganza.site/mentees/${mentee}/logs?page=1&limit=3`;
  const getLogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setLogs(response.data.data.data);

    } catch (error) {
      console.log(error);
    }
  };
  // End fetch

  useEffect(() => {
    if (!cookies.userToken) {
      dispatch(logout());
    }
    getLogs();
    addNewLog();
    getDetails()
  }, [cookies.userToken, dispatch]);

  // Handle For Logout
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

  const endpointClass = `https://my-extravaganza.site/classes?page=1&limit=100`
  const [classes, setClasses]: any = useState([])
  const fetchClassData = async () => {
    try {
      const response = await axios.get(endpointClass);
      console.log("Classes: ", response.data.data);
      setClasses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchClassData();
  }, [endpointClass])


  return (
    <Container>
      <Sidebar />
      <div className="flex flex-col w-full h-full m-5 ">
        <Navbar
          onLogout={handleLogout}
          namePages={"Mentee Log"}
          userName={fullname.data?.full_name}
        />
        {
          mentees ?
            <div className="flex px-20 justify-between">
              <div className="ml-20">
                <h1 className="text-2xl capitalize">
                  {mentees.full_name}
                </h1>
                <p className="text-lg">{mentees.education_type}</p>
                <p className="text-xl">{mentees.education_major}</p>
                <p className="text-xl capitalize">{mentees.address}</p>
                <p className="text-xl">{classes.find((classy: any) => classy.id === mentees.class_id)?.name || "Unknown Class"}</p>
              </div>
              <div className="p-3 mr-20">
                <p>
                  Phone : <span>{mentees.phone}</span>
                </p>
                <p>
                  Telegram : <span>@{mentees.telegram}</span>
                </p>

                <p>
                  Email : <span>{mentees.email}</span>
                </p>
              </div>
            </div> :
            <></>
        }
        <div className="pt-12 text-right mr-[200px]">
          <div
            className="bg-orange-alta w-30 border-none text-white btn mr-2"
            onClick={() => navigate("/menteelist")}
          >
            Back
          </div>
          <label htmlFor="my-modal-6" className="bg-dark-alta w-30 text-white btn">
            Add New Log
          </label>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="text-lg font-bold text-start">New Log</h3>
              <div className="flex flex-col align-middle mt-5 gap-2">
                <p className="flex flex-start text-dark-alta font-semibold">Title : </p>
                <input type="text" className="input flex flex-start border rounded-md h-12 border-dark-alta"
                  value={title}
                  placeholder="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex  flex-col  text-start mt-5 gap-2">
                <p className="text-dark-alta font-semibold">Status : </p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-40 bg-white border border-dark-alta h-10 text-dark-alta"
                >
                  <option value="Interview">Interview</option>
                  <option value="Join Class">Join Class</option>
                  <option value="Unit 1">Unit 1</option>
                  <option value="Unit 2">Unit 2</option>
                  <option value="Repeat Unit 1">Repeat Unit 1</option>
                  <option value="Repeat Unit 2">Repeat Unit 2</option>
                  <option value="Repeat Unit 2">Repeat Unit 3</option>
                  <option value="Placement">Placement</option>
                  <option value="Eliminated">Eliminated</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>
              <div className="flex flex-col mt-5 mb-5 text-start gap-2">
                <p className="text-dark-alta font-semibold">Feedback : </p>
                <textarea
                  value={feedback}
                  placeholder="Bio"
                  className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-row justify-end align-middle gap-2">
                <label
                  htmlFor="my-modal-6"
                  className="modal-action btn-sm w-20 my-auto btn  bg-white border border-orange-alta hover:bg-orange-alta hover:text-white hover:border-none text-orange-alta "
                >
                  Cancel
                </label>
                <button type="submit" onClick={addNewLog}>
                  <label
                    className="btn btn-sm bg-orange-alta border border-orange-alta text-white w-20 hover:text-orange-alta hover:bg-white hover:border-orange-alta"
                    htmlFor="my-modal-6"
                  >
                    Save
                  </label>
                </button>
              </div>
            </div>
          </div>

        </div>
        <div className="flex flex-col gap-5 pt-5">
          {logs ? (
            logs?.map((item: any, index) => {
              return (
                <CardNewLog
                  key={index}
                  title={item.title}
                  fullName={item.fullname_user}
                  date={item.created_date}
                  feedback={item.feedback}
                  status={item.status}
                />
              );
            })
          ) : (
            <>
              {/* <CardNewLog
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
              /> */}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MenteeLog;
