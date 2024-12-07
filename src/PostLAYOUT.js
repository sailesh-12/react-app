import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLAYOUT = () => {
  return (
    <div>
        
        <Link to='/postpage/1'><li>Post1</li></Link>
        <Link to="/postpage/2"><li>Post2</li></Link>
        <Link to="/postpage/3"><li>Post3</li></Link>
        <Link to="/postpage/newpost">NewPost</Link>
        <Outlet/>
      
    </div>
  )
}

export default PostLAYOUT
