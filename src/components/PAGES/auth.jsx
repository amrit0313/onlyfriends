import { useState } from "react";
import { PiEyesBold } from "react-icons/pi";
import { PiEyeSlashDuotone } from "react-icons/pi";

const AuthPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const toggleLogin = () => {
    setIsRegistered((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;
    let payload;
    let headers = { "Content-Type": "application/json" };
    if (isRegistered) {
      url = "http://127.0.0.1:8000/v1/auth/token";
      (payload = new URLSearchParams({
        username: userData.username,
        password: userData.password,
      })),
        (headers = { "Content-Type": "application/x-www-form-urlencoded" });
    } else {
      url = "http://127.0.0.1:8000/v1/auth/signup";
      payload = JSON.stringify({
        email: userData.email,
        password: userData.password,
        firstname: userData.firstName,
        lastname: userData.lastName,
        username: userData.username,
      });
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: payload,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData);
        throw new Error("Error");
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log("error occurred");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-l from-indigo-400/50 to-gray-300/50">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col bg-gradient-to-r from-indigo-200/50 to-slate-500/50  shadow-lg shadow-slate-950/50 border-[1px] border-slate-400 px-[8rem] py-[2rem] text-slate-800  font-extrabold rounded-tr-[3rem]">
          <legend className="text-xl text-gray-800/50">
            {isRegistered ? "Login" : "Register"}
          </legend>
          {!isRegistered && (
            <div className="flex gap-2 ">
              <div className="flex flex-col">
                <label>First Name</label>
                <input
                  className="border-2 border-slate-700 mb-5 pl-1 pr-[2rem] py-1"
                  type="name"
                  placeholder="chulbul"
                  value={FormData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label>Last name</label>
                <input
                  className="border-2 border-slate-700 mb-5 pl-1 pr-[2rem] py-1"
                  type="name"
                  placeholder="pandey"
                  value={FormData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <label>Username</label>
            <input
              className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
              type="username"
              placeholder="Username"
              value={FormData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>

          {!isRegistered && (
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
                type="Email"
                placeholder="example@gmail.com"
                value={FormData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
          )}
          <label>Password</label>
          <div className="flex flex-col relative">
            <input
              className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={FormData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 w-fit cursor-pointer"
            >
              {showPassword && <PiEyesBold />}
              {!showPassword && <PiEyeSlashDuotone />}
            </div>
          </div>
          <button
            className="bg-slate-950 text-white px-5 py-2 hover:bg-gradient-to-l from-slate-800 to-slate-400"
            type="submit"
          >
            {isRegistered ? "Login" : "Register"}
          </button>
          <button
            className="mt-3 underline text-slate-800 hover:text-indigo-800 "
            type="button"
            onClick={toggleLogin}
          >
            {isRegistered ? "Create Account" : "Login to exisiting"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AuthPage;
