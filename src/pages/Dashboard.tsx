import React, { useEffect, useCallback } from 'react'
import Container from '../components/Container'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { AuthState, User, login, logout } from '../store/features/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardDashboard from '../components/CardDashboard'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import {
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";


const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const auth = useSelector((state: { auth: AuthState }) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const name = JSON.parse(localStorage.getItem('user') || "") as User

  console.log(auth.user);
  console.log(auth.user?.token);


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
  }, [cookies.userToken, dispatch]);

  const data = [
    { name: "April", Register: 1000, Placement: 2000, Graduates: 1000 },
    { name: "May", Register: 2000, Placement: 1500, Graduates: 2000 },
    { name: "June", Register: 3000, Placement: 1000, Graduates: 3000 },
    { name: "July", Register: 1000, Placement: 400, Graduates: 900 },
  ];

  return (

    <Container>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar
          userName={name?.data?.full_name}
          onLogout={handleLogout}
          namePages='Dashboard'
        />
        <CardDashboard />
        <div className="flex justify-center mt-20 ">
          <div className="text-center bg-zinc-200 h-full pt-5 p-5 rounded-xl">
            <LineChart

              width={1400}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 3,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="5 5" />
              <Line
                dataKey="Register"
                fill="#8884d8"

              />
              <Line
                dataKey="Placement"
                fill="#8884d8"

              />
              <Line
                dataKey="Graduates"
                fill="#8884d8"

              />
            </LineChart>
          </div>
        </div>

      </div>

    </Container>
  )
}

export default Dashboard