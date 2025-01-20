import { useState } from "react";

const AuthPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const toggleLogin = () => {
    setIsRegistered((prev) => !prev);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-l from-indigo-200">
      <fieldset className="flex flex-col bg-gradient-to-r from-slate-500/50  shadow-lg shadow-slate-950/50 border-[1px] border-slate-400 px-[8rem] py-[2rem] text-slate-800  font-extrabold rounded-tr-[3rem]">
        <legend className="text-xl text-slate-950">
          {isRegistered ? "Login" : "Register"}
        </legend>
        {!isRegistered && (
          <div className="flex gap-2 ">
            <div className="flex flex-col">
              <label>First name</label>
              <input
                className="border-2 border-slate-700 mb-5 pl-1 pr-[3rem] py-1"
                type="username"
                placeholder="chulbul"
              />
            </div>
            <div className="flex flex-col">
              <label>Last name</label>
              <input
                className="border-2 border-slate-700 mb-5 pl-1 pr-[2rem] py-1"
                type="username"
                placeholder="pandey"
              />
            </div>
          </div>
        )}
        {!isRegistered && <label>Username</label>}
        {!isRegistered && (
          <input
            className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
            type="username"
            placeholder="Username"
          />
        )}

        <label>Email</label>
        <input
          className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
          type="Email"
          placeholder="example@gmail.com"
        />
        <label>Password</label>
        <input
          className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
          type="password"
          placeholder="password"
        />
        <button className="bg-slate-950 text-white px-5 py-2">
          {isRegistered ? "Login" : "Register"}
        </button>
        <button
          className="mt-3 underline text-slate-800 hover:text-indigo-800"
          onClick={toggleLogin}
        >
          {isRegistered ? "Create Account" : "Login to exisiting"}
        </button>
      </fieldset>
    </div>
  );
};

export default AuthPage;
