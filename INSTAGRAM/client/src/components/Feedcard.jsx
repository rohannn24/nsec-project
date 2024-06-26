import React, { useState } from 'react'
import './Feedcard.css'

const Feedcard = () => {
    const [likes, setLikes] = useState(0);
    const [commentCount, setCount] = useState(0);
  return (
    <>
        <div className="full-feed-card">
            <div className="feed-card-header">
                <div className="fc-user-detail">
                    <div className="fc-img-ctrl">
                        <img src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719014400&semt=sph" alt="" />
                    </div>
                    <div className="fc-user-info">
                        <p>codesofrohan</p>
                        <p>Original Audio</p>
                    </div>
                </div>
                <div className="three-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
            <div className="feed-image">
                <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" />
            </div>
            <div className="feed-action">
                <div className="left-three">
                <i className="fa-regular fa-heart"></i>
                <i className="fa-regular fa-comment"></i>
                <i className="fa-solid fa-share"></i>
                </div>
                <div className="right-one"><i className="fa-regular fa-bookmark"></i></div>
            </div>
            <p className="feed-likes">{likes} {likes <= 1? "like": "likes"}</p>
            <p><b>Codesofrohan</b><span className="desc"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed ipsa voluptatum obcaecati beatae saepe deserunt repellat veritatis quas officiis nesciunt reprehenderit ducimus doloribus molestiae, perferendis maxime. Vitae eveniet ad placeat?</span></p>
            <p>{commentCount >=1 ? `View all ${commentCount} comments`:'0 comments'}</p>
            <form>
                <input type="text" placeholder='Add a comment...' required />
            </form>
        </div>
    </>
  )
}

export default Feedcard