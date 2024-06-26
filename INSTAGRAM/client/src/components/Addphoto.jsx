import React, { useEffect, useState } from 'react';
import './Addphoto.css';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addphoto = () => {
    const [fileUrl, setFileUrl] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);
    
    const handleUpload = () => {
        const inpt = document.querySelector('#image-upload');
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
        const uploadBox = document.querySelector('.uploading-popup-card');
        uploadBox.style.display = 'none';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const currentDate = new Date();
            const timestamp = currentDate.getTime();
            const fileName = `${timestamp}_${file.name}`;
            const storageRef = ref(storage, `posts/${fileName}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            const response = await fetch('http://localhost:8800/api/photo/add-photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    id: user._id,
                    imageUrl: downloadURL,
                    tags: tags,
                    description: description
                })
            });
            const result = await response.json();
            console.log(result.message);
            const notify = () => toast(result.message);
            const notify2 = () => toast('Refreshing...');
            setTimeout(() => {
                notify2();
            }, 2000);
            setTimeout(() => {
                const url = window.location.href;
                window.location.href = url
            }, 3000);
            notify();
            const uploadBox = document.querySelector('.uploading-popup-card');
            uploadBox.style.display = 'none';

            // Fetch the updated user data
            const updatedUserResponse = await fetch(`http://localhost:8800/api/user/get-data/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            const updatedUser = await updatedUserResponse.json();
            // Update local storage and state with the new user data
            localStorage.setItem('user', JSON.stringify(updatedUser.updated));
            setUser(updatedUser);
        }
    };

    return (
        <>
        
        <div className="uploading-popup-card">
            <div className="card-of-upload">
                <div className="close" onClick={handleClose}>X</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        name="image"
                        id="image-upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className="upload-heading">
                        <p><i className="fa-solid fa-image"></i></p>
                        <p>Upload an Image</p>
                    </div>
                    <div className="upload-box" onClick={handleUpload}>
                        Choose From Computer
                    </div>
                    {fileUrl && (
                        <div className="image-preview">
                            <img src={fileUrl} style={{width: "300px"}} alt="Selected" />
                        </div>
                    )}
                    <input
                        type="text"
                        name="tags"
                        placeholder="Add some Tags..."
                        required
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <textarea
                        name="desc"
                        placeholder="Add Some description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
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
                transition:Bounce
            />
        </>
    );
};

export default Addphoto;
