import Logo from "../img/logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    let item = { email: email, password: password };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    fetch("http://localhost:8080/api/user/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.data)
        // guardar user en session storage
        sessionStorage.setItem("user", JSON.stringify(data.data));
        navigate("/chat");
      });
  }

  return (
    <>
      <div className="row w-25 mx-auto">
        <img className="mt-5" src={Logo} />
      </div>

      <form action="/login" className="w-50 mx-auto mt-5 mb-5 shadow p-3 mb-5 bg-white rounded">
        <div className="mb-3">
          <label htmlFor="email" className="form-label" value={email}>
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label" value={password}>
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="pwd"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="d-grid">
          <button
            className=" btn btn-primary  btn-sm gap-2"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
