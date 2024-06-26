import './Story.css';
import React, { useEffect, useState } from 'react';
import './Addphoto.css';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Storyadd = () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

    const handleClick = () => {
        document.querySelector('.uploading-popup-card2').style.display = 'flex';
    };

    const [fileUrl, setFileUrl] = useState('');
    const [file, setFile] = useState(null);
    const [storySubmitted, setStorySubmitted] = useState(false);

    const handleUpload = () => {
        const inpt = document.querySelector('#image-upload2');
        inpt.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setFileUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleClose = () => {
        const uploadBox = document.querySelector('.uploading-popup-card2');
        uploadBox.style.display = 'none';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            const fileName = `${timestamp}_${file.name}`;
            const storageRef = ref(storage, `stories/${user.username}/${fileName}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            const userId = user._id;

            const response = await fetch('http://localhost:8800/api/story/add-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    storyImg: downloadURL,
                    userId
                })
            });

            const result = await response.json();
            console.log(result.message);
            toast(result.message);

            setStorySubmitted(true); // Set the story submission status to true

            const uploadBox = document.querySelector('.uploading-popup-card2');
            uploadBox.style.display = 'none';
        }
    };

    useEffect(() => {
        if (storySubmitted) {
            const fetchUserData = async () => {
                const res = await fetch(`http://localhost:8800/api/user/get-data/${user._id}`, { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    }
                });
                const data = await res.json();
                localStorage.setItem('user', JSON.stringify(data.updated));
                console.log(data);
                setStorySubmitted(false); 
            };

            fetchUserData();
        }
    }, [storySubmitted]);

    return (
        <>
            <div className="full-story sa-full" onClick={handleClick}>
                <div className="sa-outer">
                    <div className="add-btn"><i className="fa-solid fa-plus"></i></div>
                </div>
                <p>Add Stories</p>
            </div>

            <div className="uploading-popup-card2">
                <div className="card-of-upload">
                    <div className="close" onClick={handleClose}>X</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            name="image"
                            id="image-upload2"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div className="upload-heading">
                            <p><i className="fa-solid fa-image"></i></p>
                            <p>Upload from Device</p>
                        </div>
                        <div className="upload-box" onClick={handleUpload}>
                            Choose From Device
                        </div>
                        {fileUrl && (
                            <div className="image-preview">
                                <img style={{ width: "300px" }} src={fileUrl} alt="Selected" />
                            </div>
                        )}
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="bounce"
            />
        </>
    );
};

export default Storyadd;
