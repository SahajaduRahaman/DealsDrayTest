import React, { useContext, useState } from "react";
import { LogInApi } from "../fetchApi/FetchAPI";
import AuthContext from "../context/ContextApi";

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    LogInApi(loginData).then((data) => {
      if (data.status === 200) {
        localStorage.setItem("authToken", data.data.authToken);
        dispatch({ type: "login" });
      } else {
        alert("Invalid login details.");
      }
    });
  };

  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <img
                className="w-12 h-12 mr-5"
                src="https://i0.wp.com/www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png?w=469&ssl=1"
                alt="logo"
                />
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="" onSubmit={(e) => HandleSubmit(e)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={(e) => HandleChange(e)}
                                    placeholder="Enter your email."
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={loginData.password}
                                    onChange={(e) => HandleChange(e)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <input
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-green-600 hover:bg-blue-600"
                            value="Log In"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default Login;
