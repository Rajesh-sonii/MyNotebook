import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { setAlert } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await res.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setAlert({
        show: true,
        message: "Logged-in Successfully!",
        type: "success",
      });
      navigate("/");
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 1500);
    } else {
      // alert("Wrong credentials")
      setAlert({ show: true, message: "Invalid details", type: "danger" });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 1500);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2>
        <strong>Login to your account</strong>
      </h2>
      <form onSubmit={loginHandler}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button
          type="submit"
          role="submit"
          className="btn btn-primary"
          disabled={
            !(credentials.email.length !== 0 && credentials.password.length > 5)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
