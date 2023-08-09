import "./login.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../components/context/Context";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <>
      <div className="login">
        <span className="loginTitle">Log In</span>
        <form className="loginForm" type="submit" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Email Address"
            ref={emailRef}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter Password"
            ref={passwordRef}
          />
          <button className="submitLogin" disabled={isFetching}>
            <NavLink to="/login">Login</NavLink>
          </button>
          <button className="submitLoginRegister">
            <NavLink to="/register">Register</NavLink>
          </button>
        </form>
      </div>
    </>
  );
}
