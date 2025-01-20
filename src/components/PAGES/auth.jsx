import { useState } from "react";

const AuthPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);
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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-l from-indigo-200">
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col bg-gradient-to-r from-slate-500/50  shadow-lg shadow-slate-950/50 border-[1px] border-slate-400 px-[8rem] py-[2rem] text-slate-800  font-extrabold rounded-tr-[3rem]">
          <legend className="text-xl text-slate-950">
            {isRegistered ? "Login" : "Register"}
          </legend>
          {!isRegistered && (
            <div className="flex gap-2 ">
              <div className="flex flex-col">
                <label>First name</label>
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
          {!isRegistered && (
            <div className="flex gap-2">
              <div className="flex flex-col">
                <label>Username</label>
                <input
                  className="border-2 border-slate-700 mb-5 pl-1 pr-[2rem] py-1"
                  type="username"
                  placeholder="Username"
                  value={FormData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-[5px]"
                >
                  <option value="" disabled selected>
                    select your gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
          )}

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
          <label>Password</label>
          <input
            className="border-2 border-slate-700 mb-5 pl-1 pr-[5rem] py-1"
            type="password"
            placeholder="password"
            value={FormData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <button className="bg-slate-950 text-white px-5 py-2" type="submit">
            {isRegistered ? "Login" : "Register"}
          </button>
          <button
            className="mt-3 underline text-slate-800 hover:text-indigo-800"
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
