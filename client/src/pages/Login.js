import Logo from "../img/logo.png";
import Chat from '../pages/Chat';
//import { Socket } from 'socket.io';
import io from 'socket.io-client';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";



let socket;
const CONNECTION_PORT = 'localhost:4000/'

function Login() {

    const [loggedIn, setLoggedIn] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate =  useNavigate();

    useEffect(() => {
        socket = io(CONNECTION_PORT)    
    }, [CONNECTION_PORT])

    const connectToChat = async () => {
        setLoggedIn(true);
        socket.emit('join_chat', email)

        let item = { email, password}
        console.log(item)

        let result = await fetch('http://localhost:8080/api/user/login ', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        })
        const data = await result.json();
        localStorage.setItem("user-login", JSON.stringify(data))
        navigate.push('/chat');
    }    

    return (
        <>
            <div className="row w-25 mx-auto">
                <img className="mt-5" src={Logo} />
            </div>
            {!loggedIn ? (
                <form action="/login"  className="w-50 mx-auto mt-5 mb-5 shadow p-3 mb-5 bg-white rounded">
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" id="password" name="password" placeholder="******" rows="3" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="d-grid">
                        <button className=" btn btn-primary  btn-sm gap-2" onClick={connectToChat}>Login</button>
                    </div>
                </form>
            ): <Chat />
            }
        </>
    );
}

export default Login;
