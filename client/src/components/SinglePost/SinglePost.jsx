import "./singlepost.css";
import download from "../../assets/download.jpg";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { Context } from "../context/Context";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:5000/api/images";
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const [desc, setDesc] = useState();
  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        },
        setUpdateMode(false)
      );
    } catch (err) {}
  };
  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img className="singlePostImg" src={download} alt="" />
          <div className="singlePostInfo1">
            {/* We only trigger the text area to edit title and description when we are in UpdateMode */}
            {updateMode ? (
              <input
                value={title}
                type="text"
                className="singlePostTitle"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            ) : (
              <h1 className="singlePostTitle">
                {/* lorem Title */}
                {post.title}
                {post.username === user?.username && (
                  <div className="singlePostEdit">
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setUpdateMode(true)}
                    ></i>
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                    ></i>
                  </div>
                )}
              </h1>
            )}
          </div>
          <div className="singlePostInfo">
            <NavLink to={`/?user=${post.username}`}>
              <span>
                {" "}
                Author: <b> {post.username} </b>
              </span>
            </NavLink>
            <span className="singlePostDate">
              {" "}
              Date posted: <b>{new Date(post.createdAtDate).toDateString()}</b>
            </span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">
              {post.desc}
              {/* it
              amet consectetur adipisicing elit. Deserunt ea repellat iusto
              culpa eligendi optio ipsa autem rem nisi corrupti minima
              asperiores quasi distinctio ducimus qui natus, aspernatur
              necessitatibus dolores. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Deserunt ea repellat iusto culpa eligendi optio
              ipsa autem rem nisi corrupti minima asperiores quasi distinctio
              ducimus qui natus, aspernatur necessitatibus dolores. */}
            </p>
          )}
           {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        </div>
      </div>
    </>
  );
}

export default SinglePost;
