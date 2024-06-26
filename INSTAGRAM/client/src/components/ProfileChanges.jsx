import React, { useState } from 'react';
import './ProfileChanges.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage, ref, uploadBytes, getDownloadURL, deleteObject } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const ProfileChanges = () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        tag: user.tag,
        desc: user.desc,
        profilePic: user.dpImg || ''
    });
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState('');

    const handleClose = () => {
        document.querySelector('.full-changes-form').style.display = 'none';
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'username' && value !== user.username) {
            try {
                const res = await fetch('http://localhost:8800/api/user/check-username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: value })
                });

                const data = await res.json();
                if (data.exists) {
                    setUsernameError('Username already exists.');
                    setUsernameAvailable('');
                } else {
                    setUsernameError('');
                    setUsernameAvailable('Username is available.');
                }
            } catch (error) {
                console.error('Error checking username:', error);
            }
        } else {
            setUsernameError(''); // Clear the error if the entered username matches the current username
            setUsernameAvailable('');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameError) return; // Prevent form submission if there's a username error

        let profilePicUrl = formData.profilePic;

        if (profilePicFile) {
            // Delete the old profile picture
            if (formData.profilePic) {
                const oldProfilePicRef = ref(storage, formData.profilePic);
                await deleteObject(oldProfilePicRef).catch((error) => {
                    console.error("Error deleting old profile picture:", error);
                });
            }

            // Generate a unique filename
            const uniqueFileName = `${uuidv4()}-${profilePicFile.name}`;
            const storageRef = ref(storage, `profilePics/${user._id}/${uniqueFileName}`);
            await uploadBytes(storageRef, profilePicFile);
            profilePicUrl = await getDownloadURL(storageRef);
        }

        try {
            const res = await fetch(`http://localhost:8800/api/user/update/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ ...formData, dpImg: profilePicUrl })
            });

            if (res.ok) {
                const userData = await res.json();
                localStorage.setItem('user', JSON.stringify(userData.user));
                const notify = () => toast("Profile Updated Successfully...");
                const notify2 = () => toast("Refreshing...");
                notify();
                setTimeout(() => {
                    notify2();
                }, 1000);
                handleClose();
                setTimeout(() => {
                    window.location.href = 'http://localhost:5173/profile';
                }, 2000);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            <div className="full-changes-form">
                <div className="changes-card">
                    <div className="close" onClick={handleClose}>X</div>
                    <h3>Add Your Details</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Add Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <div className="wrap-username">

                            <input
                                type="text"
                                name="username"
                                placeholder="Add Your Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {usernameError && <p className="error-username">{usernameError} <span className='error-cross'><i class="fa-solid fa-circle-xmark"></i></span></p>}
                            {usernameAvailable && <p className="available-username">{usernameAvailable} <span className='available-check'><i class="fa-solid fa-check"></i></span></p>}
                        </div>
                        <input
                            type="text"
                            name="tag"
                            placeholder="Add Your Tag"
                            value={formData.tag}
                            onChange={handleChange}
                        />
                        <textarea
                            name="desc"
                            rows={10}
                            id="desc"
                            placeholder="Add a Description"
                            value={formData.desc}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            name="profilePic"
                            onChange={handleFileChange}
                        />
                        <input type="submit" value="Update Profile" />
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
        </>
    );
};

export default ProfileChanges;
