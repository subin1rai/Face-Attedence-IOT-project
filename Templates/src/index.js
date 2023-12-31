// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import Login from "./Components/Login";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <Login />
//   </React.StrictMode>
// );

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "../src/Components/Login_/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "ps4" && password === "pssss") {
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  };

  return (
    <React.StrictMode>
      {loggedIn ? <App /> : <Login onLogin={handleLogin} />}
    </React.StrictMode>
  );
};

root.render(<Index />);
