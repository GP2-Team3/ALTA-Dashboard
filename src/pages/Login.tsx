import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import landingpage from "../assets/landingpage.png";
import axios from "axios";
import { updateUser } from "../store/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cookies, setCookie]: any = useState(["userToken"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const authLogin = async (e : any) => {
  //       e.preventDefault();
  //       await axios
  //           .post(`http://34.136.159.229:8000/auth`, {
  //               email: email,
  //               password: password,
  //           })
  //           .then((response) => {
  //               const { data } = response.data;
  //               if (data) {
  //                   Swal.fire({
  //                       position: "center",
  //                       icon: "success",
  //                       text: "Signed successfully",
  //                       showConfirmButton: false,
  //                       timer: 1500,
  //                   });
  //                   setCookie("userToken", data.token, { path: "/" });
  //                   dispatch(updateUser(data));
  //                   navigate("/dashboard");
  //               }
  //           })
  //           .catch((error) => {
  //               Swal.fire({
  //                   position: "center",
  //                   icon: "error",
  //                   title: "Email or Password incorrect",
  //                   showConfirmButton: true,
  //               });
  //               console.log(error);

  //           });
  //   };

  //   useEffect(() => {
  //     if (cookies.userToken) {
  //       navigate("/dashboard");
  //     }
  //     return () => {};
  //   }, [cookies.userToken]);

  return (
    <Container>
 
      <div className="relative flex flex-col w-full bg-dark-alta">
        <div className="m-5 w-full">
          <img src="" alt="" className="w-32 mx-5" />
        </div>
        <div className="w-ful mx-10 z-10 ">
          <h1 className="mt-5 text-6xl font-bold text-white">Welcome...</h1>
          <p className="my-5 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            consectetur impedit odio architecto, laboriosam nemo quo deleniti
            maxime iste dicta?
          </p>
        </div>
        <div className=" flex items-center justify-center mt-20">
          <img src={landingpage} width={600} alt="" className="" />
        </div>
      </div>

      <div className="flex flex-col justify-center w-full h-screen ">
        <div className="w-full p-6 m-auto bg-zinc-200 rounded-md shadow-xl lg:max-w-xl justify-center ">
          <h1 className="text-3xl font-semibold text-center text-dark-alta uppercase mt-10">
            Sign in
          </h1>
          <form className="mt-6 flex flex-col justify-center align-middle">
            <div className="mb-2  mx-auto">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-dark-alta"
              >
                Email
              </label>
              <input
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input input-md block w-[400px] px-4  py-2 mt-2 text-dark-alta bg-white border rounded-md focus:border-dark-alta focus:ring-dark-alta outline-dark-alta outline outline-1 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2 mx-auto">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-dark-alta"
              >
                Password
              </label>
              <input
                placeholder="Type your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input input-md w-[400px] block mx-auto px-4 py-2 mt-2 text-dark-alta bg-white border rounded-md focus:border-dark-alta focus:ring-dark-alta outline-dark-alta outline outline-1 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="flex flex-row justify-between ">
            <p className="flex items-center text-dark-alta text-xs ml-16">
              <input className="mr-1 text-dark-alta checkbox checkbox-xs  " type="checkbox" />
              Remember Me
            </p>
            <a href="#" className="text-xs text-dark-alta hover:underline mr-16">
              Forget Password?
            </a>
            </div>
            <div className="mt-10 mx-auto ">
              <button
                onClick={() => console.log(email, password)}
                className="btn btn-wide mx-auto px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-alta rounded-md hover:bg-orange-700 focus:outline-none focus:bg-dark-alta"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-dark-alta mb-10">
            {" "}
            Don't have an account?{" "}
            <a href="#" className="font-medium text-dark-alta hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
