"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import fotoLogin from "../../../../../public/assets/img/login-office.jpeg";
import Image from "next/image";
import Input from "@/app/adminpanel/ui/dashboard/input/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import * as refreshTokens from "@/app/application/components/refreshToken";
const style = `p-[30px] border-2 border-solid border-[#2e374a] w-[100%]`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/auth/refresh`,
          {}, // empty body if not needed
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // This is crucial
          }
        );
        if (res.status === 201) {
          const userDetails = {
            user: res.data.user,
            role: res.data.role,
            email: res.data.email,
          };

          // Store user details in local storage
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          router.push("/adminpanel/dashboard");
        }

        // Handle response if needed
      } catch (error) {
        console.error("Refresh token error:", error);
        // Handle error if needed
      }
    };

    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user !== null) {
      refreshToken();
    }
    // Since you are using an empty dependency array, this effect will only run once
  });

  // // if (user) {
  // const rf = refreshTokens;
  // if (!user) {
  //   rf;
  // }

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This is crucial
        }
      );

      if (res.status === 200 || res.status === 201) {
        const userDetails = {
          user: res.data.user,
          role: res.data.role,
          email: res.data.email,
        };

        // Store user details in local storage
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        console.log("Before navigating to dashboard");
        router.push("/adminpanel/dashboard");
        console.log("After navigating to dashboard");
      } else {
        setShowAlert(true);
        setMessageAlert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setShowAlert(true);
      setMessageAlert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 ">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full "
              src={fotoLogin}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full relative">
              {showAlert ? (
                <div className="text-white px-4 py-2 text-sm border-0 rounded relative mb-2 bg-red-400">
                  <span className="inline-block align-middle mr-8">
                    {messageAlert}
                  </span>
                  <button
                    className="absolute bg-transparent text-lg font-semibold leading-none right-0 top-0 mt-2 mr-4 outline-none focus:outline-none"
                    onClick={() => setShowAlert(false)}
                  >
                    <span>×</span>
                  </button>
                </div>
              ) : null}
              <h1 className="mb-4 text-xl font-semibold text-gray-700 text-center ">
                SKALADATA <br />
                LOGIN
              </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-sm mx-auto"
              >
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-400 focus:shadow-outline-purple block w-full p-2.5"
                    placeholder="Email"
                    required
                  />
                  {errors.email && (
                    <small className="text-red-500 text-sm ml-1 mt-1">
                      {errors.email.message}
                    </small>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your password
                  </label>
                  <input
                    {...register("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-400 focus:shadow-outline-purple block w-full p-2.5"
                    placeholder="********"
                    required
                  />
                  {errors.password && (
                    <small className="text-red-500 text-sm ml-1 mt-1">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className="flex items-start mb-5">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2 mt-4  font-medium inline-flex items-center justify-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-white animate-spin  fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="ml-3">Loading... </span>
                    </>
                  ) : (
                    `Login`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
