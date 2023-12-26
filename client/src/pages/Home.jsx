import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className='p-8'>
        <div className='text-3xl text-white'>Hello Check</div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Home