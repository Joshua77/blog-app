import { useContext } from "react";
import { Context } from "../context/Context";
import "./navbar.css";
import svg from "../../assets/react.svg";
import download from "../../assets/download.jpg";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });};
  return (
    <>
      <div className="navbar">
        <div className="navbar-social">
        <i className="navbar-icon fab fa-facebook-square"></i>
        <i className="navbar-icon fab fa-twitter-square"></i>
        <i className="navbar-icon fab fa-pinterest-square"></i>
        <i className="navbar-icon fab fa-instagram-square"></i>
        </div>
        <div className="navbar-links-group">
          <ul className="navbar-links">
            <li className="topListItem">
              <NavLink className="link" to="/">
                HOME
              </NavLink>
            </li>
            <li className="topListItem">
              <NavLink className="link" to="/">
                ABOUT
              </NavLink>
            </li>
            <li className="topListItem">
              <NavLink className="link" to="/">
                CONTACT
              </NavLink>
            </li>
            <li className="topListItem">
              <NavLink className="link" to="/write">
                WRITE
              </NavLink>
            </li>
            <li className="topListItem">
              {user && (
                <NavLink className="link" onClick={handleLogout} to="/">
                  LOGOUT
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        {user ? (
          <div className="navbar-profile-group">
            <NavLink to="/settings">
              <img className="topImg" src={PF + user.profilePic} alt="" />
            </NavLink>
          </div>
        ) : (
          <div className="navbar-links-groupnon">
            <ul className="navbar-links">
              <li className="topListItem">
                <NavLink className="link" to="/register">
                  REGISTER
                </NavLink>
              </li>
              <li className="topListItem">
                <NavLink className="link" to="/login">
                  LOGIN
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </>
  );
}

export default NavBar;
