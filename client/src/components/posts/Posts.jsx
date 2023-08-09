import Post from '../post/Post'
import './posts.css'

// export default function Posts( { posts }) 
export default function Posts() {
  return (
    <>
     <div className='posts'>
      {/* {posts.map((p)=>(
        <Post post ={p}/>
      ))} */}

      <Post />
     </div>
    </>
  )
}


