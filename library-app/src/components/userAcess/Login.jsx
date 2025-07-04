import Nav from "../nav";
import { useState,useEffect} from "react";
import {motion} from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { logIn } from "../../api/apiFunctions.js";
import '../../Styles/addContent.css';
import '../../Styles/userAccess.css';

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value } = e.target;
        setLoginInfo(prev => ({...prev,
             [name]:value
            }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loginInfo.username.trim() !== '' && loginInfo.password.trim() !== '') {
            const res = await logIn(loginInfo.username, loginInfo.password);
            if (res.ok) {
                setLoggedIn(true);
            }
        } else {
            alert('didnt fill out all data');
        }
        
    };

    useEffect(()=> {
        if (loggedIn) {
            navigate('/Catalog');
        }
    },[loggedIn])

    return (
        <>
            <Nav/>
            <motion.form
             className="add-book-form login-form"
             onSubmit={handleSubmit}      
             initial={{ opacity: 0, y: 0 }}
             animate={{ opacity: 1, y: 30 }}
             transition={{ duration: 0.8, ease: 'easeOut' }}
            >   
                <div className="form-header">
                    <h1>Log in to our library</h1>
                </div>
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    type="text"
                    id="username"
                    name="username"
                    value={loginInfo.username}
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label htmlFor="password">password:</label>
                    <input 
                    type="password"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                     />
                </div>
                <motion.button 
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                >Log in</motion.button>

            </motion.form>
        
        </>
    );
};


export default Login;
