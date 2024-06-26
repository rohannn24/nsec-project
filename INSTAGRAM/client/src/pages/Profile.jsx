import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Leftnav from '../components/Leftnav';
import './Profile.css';
import ProfileChanges from '../components/ProfileChanges';
import defaultDp from '../../public/defaultPics/default-dp.jpg';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const getPostData = async () => {
            if (user) { // Ensure user is not null before fetching posts
                try {
                    const res = await fetch(`http://localhost:8800/api/photo/getpost/${user._id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    const postData = await res.json();
                    setPosts(postData);
                    console.log(postData);
                    console.log(user);
                } catch (error) {
                    console.error('Error fetching post data:', error);
                }
            }
        };
        getPostData();
    }, [user]); // Add user as a dependency

    const handleClick = () => {
        document.querySelector('.full-changes-form').style.display = 'flex';
    };

    useEffect(() => {
        if (user) {
            document.title = `${user.name || user.username} | Profile`;
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <>
            <section className="full-profile-page">
                <Leftnav />
                <div className="profile-side">
                    <div className="profile-content-sec">
                        <div className="pcs-first">
                            <div className="pcs-img-ctrl">
                                <img src={user.dpImg || defaultDp} alt="Profile" />
                            </div>
                            <div className="pcs-content-ctrl">
                                <div className="first-line">
                                    <h3>{user.username}</h3>
                                    <div className="edit" onClick={handleClick}>Edit Profile</div>
                                </div>
                                <div className="pcs-follow-details">
                                    <p>{user.posts.length} posts</p>
                                    <p>{user.followers.length} followers</p>
                                    <p>{user.followings.length} followings</p>
                                </div>
                                <div className="pcs-desc">
                                    <p>{user.name}</p>
                                    <p className='pcs-tag'>{user.tag}</p>
                                    <p>{user.desc}</p>
                                </div>
                            </div>
                        </div>
                        <hr className='pcs-hr' />
                        <div className="pcs-second">
                            {posts && posts.slice().reverse().map((post, index) => (
                                <div className="img-box" key={index}> {/* Moved key to the parent div */}
                                    <img src={post.imgUrl} alt={`Post ${index}`} />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
            <ProfileChanges />
        </>
    );
};

export default Profile;
