import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from './img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const Navigate = useNavigate();
    const access = localStorage.getItem('token');
    useEffect(() => {
        document.title = "Login | Instagram"
        if (access) {
            Navigate('/feed');
        }
    }, []);
    const [data, setData] = useState({
        id: '',
        password: ''
    })
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }
    
    const [message, setMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8800/api/user/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errorData = await res.json();
                // throw new Error(errorData.message || 'Something went wrong');
                const notifyError = () => toast(errorData.message);
                notifyError();
            }
            const resData = await res.json();
            setMessage({ type: 'success', text: resData.message });
            localStorage.setItem('token', resData.token);
            localStorage.setItem('user', JSON.stringify(resData.others));
            const notify = () => toast(resData.message);
            notify();
            setTimeout(() => {
                const notifyRedireact = () => toast('Redireacting....');
                notifyRedireact();
            }, 500);
            setTimeout(() => {
                Navigate('/feed')
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="full-auth-page">
                <div className="auth-card">
                    <div className="img-ctrl">
                        <img src={logo} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='id' placeholder='Username, Email or Phone Number' onChange={handleChange} value={data.id} />
                        <input type="password" name='password' placeholder='password' onChange={handleChange} value={data.password} />
                        <input type="submit" value="Login" />
                    </form>
                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    <div className="divider">
                        <p>OR</p>
                    </div>
                    <div className="box">SignIn With Google</div>
                </div>
                <div className="auth-card2">
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />
        </>
    )
}

export default Login