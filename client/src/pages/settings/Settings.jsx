import "./settings.css";
import download from "../../assets/download.jpg";
import header from "../../assets/header.png";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../components/context/Context"
import { useState, useContext } from "react";
import axios from "axios";

export default function Settings() {
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [file, setFile]= useState();

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  if(file){
    const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        // await axios.post("/upload", data);
        axios.post("/upload", data);
      } catch (err) {}
  }


  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      email,
      password,
      username,
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  }
  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          
          <div className="settingsTitle">
             <span className="settingsUpdateTitle">Update Your Account</span>
             <span className="settingsDeleteTitle">Delete Your Account</span>
          </div>
          {/* <img className="settingsImg" src={header} alt=""  /> */}

          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture </label>
            <div className="settingsPP">
              <img className="settingsImg" src={file ? URL.createObjectURL(file) : PF + user.profilePic} />
              <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
              </label>
            </div>
            <label>Username</label>
            <input type="text" placeholder="Joshua Akinola" onChange={()=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" placeholder="joshua@gmail.com" onChange={()=>setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" onChange={()=>setPassword(e.target.value)}/>
            <button className="settingsUpdate" onSubmit={handleSubmit}>Update</button>
            
          </form>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}
