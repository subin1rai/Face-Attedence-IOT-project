import { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import StudentInfo from "./Components/Student_Card/StudentInfo";
import Register from "./Components/Register_/Register";

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home"); // Default to "home"

  function handleSize() {
    if (window.innerWidth <= 680) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleSize);
    }
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    <>
      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div className="h-screen flex">
        <Sidebar showNav={showNav} setActiveComponent={setActiveComponent} />
        {activeComponent === "home" && <Home showNav={showNav} />}
        {activeComponent === "StudentInfo" && <StudentInfo showNav={showNav} />}
        {activeComponent === "Register" && <Register showNav={showNav} />}
      </div>
    </>
  );
};

export default Layout;
