import React from 'react'
import { Link } from 'react-router-dom'
const Suggestions = () => {
  return (
    <>
        <div className="profile-wind">
        <Link to = "/"><div className="rfsps-left">
                  <div className="rfsps-left-img-ctrl">
                    <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719014400&semt=sph" alt="" />
                  </div>
                  <div className="rfsps-left-name">
                    <p>codesofrohan</p>
                    <p className='user-name'>Rohan Kumar</p>
                  </div>
                </div></Link>
                <div className="rfsps-right"><Link to='/' className='col-blue'>Switch</Link></div>
              </div>
    </>
  )
}

export default Suggestions