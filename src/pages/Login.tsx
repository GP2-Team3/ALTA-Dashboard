import React, { useState, useEffect, useCallback } from "react";
import Container from "../components/Container";
import landingpage from "../assets/landingpage.png";
import logo2 from "../assets/logo2.png";
import axios from "axios";
import { login } from "../store/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Login = () => {
  const [password, setPassword] = useState<any>("");
  const [email, setEmail] = useState("");
  const [cookies, setCookie] = useCookies(["userToken"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // "email": "Admin@gmail.com",
  // "password": "qwerty"

  const authLogin = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://104.198.56.90:8081/users/login",
          {
            email: email,
            password: password,
          },
        );
        const { data } = response.data;
        console.log(data);
        if (data) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Signed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setCookie("userToken", data.role, { path: "/" });
          setCookie("userToken", data.token, { path: "/" });
          dispatch(login(data));
          navigate("/dashboard");
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Email or Password incorrect",
          showConfirmButton: true,
        });
        console.log(error);
      }
    },
    [dispatch, email, navigate, password, setCookie],
  );

  useEffect(() => {
    if (cookies.userToken) {
      navigate("/dashboard");
    }
  }, [cookies.userToken, navigate]);

  return (
    <Container>
      <div className="relative flex flex-col w-full bg-dark-alta">
        <div className="flex items-center justify-center  my-auto">
          <img src={landingpage} width={800} alt="" className="" />
        </div>
      </div>

      <div className="flex flex-col justify-center w-full h-screen ">
        <div className="flex  flex-col justify-center mx-auto mt-10">
          <img src={logo2} width={350} className="mx-auto mb-2" />
          <hr />
          <h4 className="text-italic text-dark-alta text-4xl italic font-light mx-auto mt-2">
            Immersive Dashboard
          </h4>
        </div>

        <div className="w-full p-6 m-auto bg-zinc-200 rounded-md shadow-xl lg:max-w-xl justify-center ">
          <h1 className="text-5xl font-bold text-center text-dark-alta uppercase mt-10 mb-10">
            Sign in
          </h1>
          <form
            className="mt-6 flex flex-col justify-center align-middle"
            onSubmit={authLogin}
          >
            <div className="mb-5 mx-auto">
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
                <input
                  className="mr-1 text-dark-alta checkbox checkbox-xs  "
                  type="checkbox"
                />
                Remember Me
              </p>
              <a
                href="#"
                className="text-xs text-dark-alta hover:underline mr-16"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-10 mx-auto ">
              <button
                // onClick={() => handleLogin()}
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
