import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";

const Sidebar = ({ showNav, setActiveComponent }) => {
  function handleComponentClick(component) {
    setActiveComponent(component);
  }
  return (
    <div
      className={
        showNav
          ? "fixed w-[250px] h-full bg-gradient-to-b from-[#212699] to-[#CB1939] transition-all  duration-300   "
          : "hidden "
      }
    >
      <div className="flex flex-col items-center ">
        <h1 className="text-white text-5xl mt-[90px] mb-[60px] font-bold ml-14 ">
          IIC
        </h1>
        <div
          className="pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center text-white mt-4 hover:bg-[#080808]"
          onClick={() => {
            handleComponentClick("Register");
          }}
        >
          <div className="mr-2">
            <MdAddBox className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl px-4">Register</p>
          </div>
        </div>
        <div
          className="pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center text-white  hover:bg-[#080808]"
          onClick={() => {
            handleComponentClick("home");
          }}
        >
          <div className="mr-2">
            <FaCircleCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl px=2-4">Attendence</p>
          </div>
        </div>
        <div
          className="pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center text-white  hover:bg-[#080808]"
          onClick={() => {
            handleComponentClick("StudentInfo");
          }}
        >
          <div className="mr-2">
            <BsFillPeopleFill className="h-5 w-5 mx-2" />
          </div>
          <div>
            <p className="text-xl px-4">Student</p>
          </div>
        </div>
        <div className="pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center text-white  hover:bg-[#080808]">
          <div className="mr-2">
            <IoSettings className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl mx-2  px-4">Setting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
