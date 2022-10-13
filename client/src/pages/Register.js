import Logo from "../img/logo.png";
//import { Socket } from 'socket.io';
//import io from 'socket.io-client';
import { useState } from 'react';
//import { useNavigate } from "react-router-dom";




//const socket = io('http://localhost:4000');

function Register() {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const navigate = useNavigate();

    async function signUp() {
         let item = { username: userName, email: email, password: password}
        console.log(item) 

        fetch('http://localhost:8080/api/user/create', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            }
        }).then((response) => {
            response.json(); 
            /* console.log(response) */})
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        //localStorage.setItem("user-info", JSON.stringify(data))
        //navigate.push('/login');
    }


    return (
        <>  
            <div className="row w-25 mx-auto">
                <img className="mt-5" src={Logo} />
            </div>
            <form className="w-50 mx-auto mt-5 mb-5 shadow p-3 mb-5 bg-white rounded"  onSubmit={(e) => {
                        e.preventDefault()
                        signUp();
                    }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label" value={userName} >Username</label>
                    <input type="text" className="form-control" id="username" name="username" placeholder="John123" onChange={(e) =>{setUserName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" value={email} >Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={(e) =>{setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" value={password}>Password</label>
                    <input className="form-control" id="password" name="password" placeholder="******" rows="3" onChange={(e) =>{setPassword(e.target.value)}}></input>
                </div>
                 <div className="d-grid">
                    <button type="submit" className=" btn btn-primary  btn-sm gap-2">Register</button>
                 </div>
            </form>
        </>
    );
}

export default Register;
