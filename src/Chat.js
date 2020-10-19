import React, { useState, useEffect} from 'react'
import './Chat.css';
import { Avatar, IconButton,Button } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import { senderMsg, recieverMsg } from './Network';
import {auth} from './firebase';
import {actionTypes} from './Reducer';




const Chat = () => {


    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');

   
    
    // const { roomId } = useParams();
    // const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user },dispatch] = useStateValue();
    const { userId } = useParams();
    const [selectedChatUser, setSelectedChatUser] = useState("");
   
    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000));

    }, [])


   
    // useEffect(() => {
    //     if (roomId) {
    //         db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
    //             setRoomName(snapshot.data()?.name)
    //         ))

    //         db.collection('rooms').doc(roomId).collection('messages')
    //             .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
    //                 setMessages(snapshot.docs.map(doc => doc.data()))
    //             ))
    //     }

    //     console.log(roomName)
    // }, [roomId])

    useEffect(() => {
       
       
        if (userId) {
            db.collection('users').doc(userId).onSnapshot(snapshot => (
                setSelectedChatUser(snapshot.data())
            ))

            db.collection('users').doc(user.uid).collection('subChats').doc(userId)
                .onSnapshot(snapshot => {
                    if (snapshot.exists) {
                        let msgs = [];
                        snapshot.data().messages.map((item) => {
                            msgs.push(item);
                        })
                        setMessages(msgs)
                        console.log(messages)
                    }else{
                        setMessages([])
                    }
                })


        }
    }, [user.uid,userId])



    // db.collection('users').doc(user.uid).collection('subChats')
    //                 .doc(snapshot.data().uid).onSnapshot(snapshot => {
    //                     if (snapshot.exists) {
    //                         let msgs = [];
    //                         snapshot.data().messages.map((item) => {
    //                             msgs.push(item);
    //                         })  
    //                         setMessages(msgs)
    //                         console.log(messages)
    //                     }

    //                 })



    const sendMessage = (e) => {
        e.preventDefault();

        senderMsg(input, user.uid, selectedChatUser.uid, user.displayName)
        recieverMsg(input, user.uid, selectedChatUser.uid, user.displayName)

        setInput('');
    }

    const logOut = ()=>{
        auth.signOut();
        dispatch({
            type:actionTypes.SET_USER,
            user:null,
        }) 
        console.log('logout')
        

    }   


     


    return (
        <div className="chat">

            <div className="chat-header">
                <Avatar src={selectedChatUser.photoURL} />

                <div className="chat-header-info">
                    <h3>{selectedChatUser?.username}</h3>
                    {/* <p>last seen {" "}
                        {new Date(messages[messages.length-1]?.timestamp?.toDate())
                        .toUTCString()}
                        </p> */}
                </div>

                <div className="chat-headerRight">
                    <Button variant="contained" className="logOutButton" onClick={logOut}>Logout</Button>
                    {/* <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton> */}
                </div>

            </div>


            <div className="chat-body">

                { 
                    messages ? (
                        messages.map(message => (
                            <div>
                                <p className={`chat-message ${message.senderName === user.displayName && 'chat-reciever'}`}>
                            <span className="chat-name">{message.senderName}</span>
                            {message.msg}
                            <span className="chat-timestamp">
                                {/* {message.createdAt}
                                {new Date(message.timestamp?.toDate()).toUTCString()} */}
                            </span>
                        </p>
                            </div>

                            
                          
                        
                        ))
                    ):(
                    <p>No any messages</p>
                    )
                    
                }


                {/* {
                    messages.map(message => (
                        <p className={`chat-message ${message.senderName === user.displayName && 'chat-reciever'}`}>
                            <span className="chat-name">{message.senderName}</span>
                {message.msg}
                            <span className="chat-timestamp">
                                {message.createdAt}
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))
                } */}


            </div>

            <div className="chat-footer">
                <InsertEmoticonIcon />
               
                <form>
                    <input onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" value={input} />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
