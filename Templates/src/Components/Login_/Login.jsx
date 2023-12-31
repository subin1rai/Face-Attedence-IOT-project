import React, { useState } from "react";
import face1 from "../Login_/face_reco1.png";
import face2 from "../Login_/face_reco2.png";
import iic from "../Login_/image 1.png";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (username === "ps4" && password === "pssss") {
      onLogin(username, password);
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto h-screen">
      <div className="flex flex-col justify-center  items-center max-w-[900px] mx-auto h-full">
        <img src={iic} alt="/" className="w-[200px]" />

        <form onSubmit={handleLoginClick} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="max-w-[350px] min-w-  py-3 outline-none border-2 border-[#244199] px-4 rounded-full"
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-[300px] py-3 my-8 outline-none border-2 border-[#244199] px-4 rounded-full"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-[250px] bg-[#244199] text-white rounded-full font-extrabold py-3"
          >
            Login
          </button>
        </form>

        <img
          src={face1}
          alt="/"
          className="absolute w-[150px] lg:w-[300px] md:w-[270px] sm:w-[250px]  left-0  md:bottom-2 bottom-20"
        />
        <img
          src={face2}
          alt="/"
          className="absolute w-[140px] lg:w-[350px] md:w-[200px]  sm:w-[260px] right-0 md:bottom-14 bottom-30"
        />
      </div>
    </div>
  );
};

export default Login;
