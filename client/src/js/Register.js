import Logo from "../img/logo.png";
import { Socket } from 'socket.io';
import io from 'socket.io-client';



const socket = io('http://localhost:4000');

function Register() {

    return (
        <>  
            <div className="row w-25 mx-auto">
                <img className="mt-5" src={Logo} />
            </div>
            <form action="/login" method="post" className="w-50 mx-auto mt-5 mb-5 shadow p-3 mb-5 bg-white rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name="name" placeholder="John Smith"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username" name="username" placeholder="John123"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Example textarea</label>
                    <input className="form-control" id="password" name="password" placeholder="******" rows="3"></input>
                </div>
                 <div className="d-grid">
                    <button className=" btn btn-primary  btn-sm gap-2">Register</button>
                 </div>
            </form>
        </>
    );
}

export default Register;
