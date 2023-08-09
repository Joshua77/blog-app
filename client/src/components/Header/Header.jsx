import { useState } from "react";
import "./header.css";
import header from "../../assets/header.png";

function Header() {
  return (
    <>
        <div className="header">
            <div className="header-title">
              <span className="header-titlesmall">Technology & Business</span>
              <span className="header-titlelarge">Blog</span>
            </div>
            <img className="headerImg" src={header} alt="" />
        </div>
      
    </>
  );
}

export default Header;
