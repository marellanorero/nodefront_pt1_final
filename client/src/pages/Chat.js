
//import { Socket } from 'socket.io'; 
import './Chat.css';
//import io from 'socket.io-client'; 
import { useState, useEffect } from 'react'
import { BiMailSend } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FcSms } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


//const socket = io('http://localhost:4000'); 

function Chat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])


  const handleLogout = () => {
    const currentUser = sessionStorage.getItem("user")
    const parsedUser =JSON.parse(currentUser)
    const id = parsedUser._id

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:8080/api/user/logout/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.data)
        navigate("/login");
      });
  }
  

  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app h-100">
              <div id="plist" className="people-list">
              <div className="row align-items-start">
                <div className="col-2 icons"><BsSearch /></div>
                <div className="col-8"> <input type="text" className=" col-8 form-control" placeholder="Search..." /></div>
                <div className="col-2 icons dropdown"><FcSms /></div>
              </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  <li className="clearfix">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />

                    <div className="about">
                      <div className="name">Vincent Porter</div>
                      <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                    </div>

                  </li>
                </ul>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col">
                              <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                              </a>
                              <div className="chat-about">
                                  <h6 className="m-b-0">Aiden Chavez</h6>
                              </div>
                              <div>
                                <button className="logoutBtn" type="button" onClick={handleLogout}>Logout</button>
                              </div>
                          </div>
                    </div>
                </div>
                <form className="chat-message " /* onSubmit={handleSubmit} */>
                  <div className="chat-history">
                    <ul className="m-b-0">
                      {messages.map((message, index) => (
                        <li key={index} className="clearfix">
                          <div className="message-data text-right">
                            <span className="message-data-time">10:10 AM, Today</span>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                          </div>
                          <div className="message other-message float-right"><p>{message.from}: {message.body}</p></div>
                        </li>
                      ))}
                    </ul>
                    <div className="chat-message clearfix fixed-bottom">
                      <div className="input-group mb-0">
                        <input type="text"
                          className="form-control form-control-lg"
                          id="exampleFormControlInput2"
                          placeholder="Type message"
                          onChange={e => setMessage(e.target.value)}
                          value={message}
                        />
                        
                        <button className="input-group-prepend btn btn-primary">
                          <span className="input-group-text bg bg-primary text-light"><BiMailSend /></span>
                        </button>
                      </div>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
