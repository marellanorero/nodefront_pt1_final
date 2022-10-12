
import { Socket } from 'socket.io';
import './Chat.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react'
import { BiMailSend } from "react-icons/bi";


const socket = io('http://localhost:4000');

function Chat() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message)
    const newMessage = {
      body: message,
      from: "Me: "
    }
    setMessage('')
    setMessages([...messages, newMessage])
  }

  useEffect(() => {
    const receiveMessage = message => {
      setMessages([...messages, message])
    }
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages])

  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Search..." />
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
                    <div className="col-lg-6">
                      <div className="chat-about">
                        <h6 className="m-b-0 px-5 py-4">Tus Conversaciones</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="chat-message" onSubmit={handleSubmit}>
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

                  </div>
                  <div className="chat-message clearfix">
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
