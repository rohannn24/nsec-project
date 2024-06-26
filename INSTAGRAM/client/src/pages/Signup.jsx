import React, { useEffect, useState } from 'react';
import './Login.css';
import logo from './img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const Navigate = useNavigate();
    const userData = localStorage.getItem('user');
    const user = userData?JSON.stringify(userData):null;
    useEffect(() => {
        document.title = "Register | Instagram"
        console.log(user);
        if(user) {
            Navigate('/feed');
        }
    })
    const [data, setData] = useState({
        mobile: '',
        email: '',
        username: '',
        password: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8800/api/user/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const resData = await res.json();
            setMessage({ type: 'success', text: resData.message });
            const notify = () => toast(resData.message);
            notify();
            setTimeout(() => {
                Navigate('/')
            }, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    return (
        <section className="full-auth-page">
            <div className="auth-card">
                <div className="img-ctrl">
                    <img src={logo} alt="Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={data.username}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={data.email}
                    />
                    <input
                        name="mobile"
                        placeholder="Mobile"
                        onChange={handleChange}
                        value={data.mobile}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={data.password}
                    />
                    <p>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                    <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                    <input type="submit" value="Sign Up" />
                </form>
                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </div>
            <div className="auth-card2">
                Already have an account? <Link to="/">Login</Link>
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
        </section>
    );
};

export default Signup;
