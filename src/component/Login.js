import React, { useState, useContext } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import '../App.css'; // Import the CSS file
import {localStorageKey} from '../constants'
import { LoginContext } from '../contexts/LoginProvider';
import { login as loginApi } from './../API/LoginAPI';

const Login = () => {
    //State for storing username & password
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();
    const { login, setLogin, storage } = useContext(LoginContext);

    // Handle input changes
    const handleChange = (e) => {
        // Update the credentials state with the new input value
        setCredentials({
            ...credentials, // Spread the existing credentials state
            [e.target.name]: e.target.value, // Update the specific field that triggered the event
        });
    };

    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
           try{
            const result= await loginApi(credentials);
            localStorage.setItem(localStorageKey, JSON.stringify(result)); // save token to localStorage
            setLogin(true)
            history.push('/friends') //Redirect users to FriendsList page
           }
        catch (error){
            console.log('login failied', error)
        }
    }

return (
    <>
    {login == false ? 
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
        :
    <Redirect to="/" />
}
    </>
)
};

export default Login; // Export the component
