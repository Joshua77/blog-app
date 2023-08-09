import "./post.css";
import post from "../../assets/download.jpg";
import { NavLink } from "react-router-dom";

export default function Post({post}) {
  const PF = "localhost:8082/api/images/";
  return (
    <>
      <div className="post">
        {/* {post.photo && <img className="postImg" src={PF + post.photo} alt="" />} */}
        <div className="postInfo">
          <div className="postCats">
            <span className="postCat">Music</span>
            <span className="postCat">Life</span>
            {/* {post.categories.map((c)=>{
                <span className="postCat">{c.name}</span>
            })} */}
          </div>
          {/* <NavLink to ={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
          </NavLink> */}
          <hr />
          {/* <span className="postDate">{new Date(post.createdAt).toDateString()} </span> */}
        </div>
        <p className="postDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iste,
          repellat expedita consequatur architecto veniam illum neque magnam
          reiciendis pariatur nesciunt doloribus, deleniti accusamus aspernatur,
          ut in! Ex, eaque nesciunt?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iste,
          repellat expedita consequatur architecto veniam illum neque magnam
          reiciendis pariatur nesciunt doloribus, deleniti accusamus aspernatur,
          ut in! Ex, eaque nesciunt?
          {/* {post.desc} */}
        </p>
      </div>
    </>
  );
}
