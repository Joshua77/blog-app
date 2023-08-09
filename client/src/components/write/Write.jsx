import "./write.css";
import download from "../../assets/download.jpg";
import { Context } from "../../components/context/Context";
import { useContext, useState } from "react";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name();
      data.append("filename", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data_.id);
    } catch (error) {}
  };
  return (
    <>
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" action="">
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="fas fa-plus"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput"
              type="text"
              placeholder="Write Your Story..."
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="writeSubmit" onSubmit={handleSubmit}>
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
