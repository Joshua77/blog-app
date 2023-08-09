import "./sidebar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get("/category");
      setCats(res.data);
    };
    fetchCats();
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebartopItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <img className="sidebarImg" src="" alt="" />
          <p className="sidebarDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere est
            quis neque labore, totam reiciendis sequi ipsum libero atque natus
            id consectetur maiores cum deleniti dolorem molestiae odit nemo
            doloremque.
          </p>
        </div>
        <div className="sidebartopItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {/* {cats.map((c) => (
              <NavLink to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </NavLink>
            ))} */}
            <li className="sidebarListItem">LIFE</li>
                <li className="sidebarListItem">AIRDROPS</li>
                <li className="sidebarListItem">LIFE</li>
                <li className="sidebarListItem">V CAPITAL</li>
                <li className="sidebarListItem">ELON MUSK</li>
          </ul>
        </div>
        <div className="sidebartopItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <img className="sidebarSocialIcon" src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
