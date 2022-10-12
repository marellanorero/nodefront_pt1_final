import Logo from "../img/logo.png";
import { Socket } from 'socket.io';
import io from 'socket.io-client';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const socket = io('http://localhost:4000');

function Register() {

    /* const [name, setName] = useState(""); */
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function signUp () {
        let item = { userName, email, password}
        console.log(item)

        let result = await fetch('http://localhost:8080/api/user/create', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        })
        const data = await result.json();
        localStorage.setItem("user-info", JSON.stringify(data))
        navigate.push('/login');
    }


    return (
        <>  
            <div className="row w-25 mx-auto">
                <img className="mt-5" src={Logo} />
            </div>
            <form action="/login" method="post" className="w-50 mx-auto mt-5 mb-5 shadow p-3 mb-5 bg-white rounded">
                {/* <div className="mb-3">
                    <label htmlFor="name" className="form-label" value={name} onChange={(e) => setName(e.target.value)}>Name</label>
                    <input type="name" className="form-control" id="name" name="name" placeholder="John Smith"/>
                </div> */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label" value={userName} onChange={(e) => setUserName(e.target.value)}>Username</label>
                    <input type="username" className="form-control" id="username" name="username" placeholder="John123"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" value={email} onChange={(e) => setEmail(e.target.value)}>Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" value={password} onChange={(e) => setPassword(e.target.value)}>Password</label>
                    <input className="form-control" id="password" name="password" placeholder="******" rows="3"></input>
                </div>
                 <div className="d-grid">
                    <button className=" btn btn-primary  btn-sm gap-2" onClick={signUp}>Register</button>
                 </div>
            </form>
        </>
    );
}

export default Register;
