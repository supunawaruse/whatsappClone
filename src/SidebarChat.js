import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

const SidebarChat = ({addNewChat,name,id,photoURL}) => {

    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState("");
    const [{ user }] = useStateValue();

    useEffect(()=>{

        setSeed(Math.floor(Math.random() *5000));

        if(id){
           
            db.collection('users').doc(user.uid).collection('subChats').doc(id)
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

    },[id])


    const createChat = () =>{
        const roomName = prompt("PLease enter name for chatroom");

        if(roomName){
            db.collection('rooms').add({
                name:roomName,
            })
        }
    }


    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
             <div className="sidebarChat">
            <Avatar src={photoURL} /> 
            <div className="sidebarChat-info">
            <h2>{name}</h2>
                
                {
                    messages.length > 0 ? (
                        <p>{messages[messages.length-1]?.msg}...</p>
                    ):(
                        null
                    )
                }
                
            </div>
        </div>
        </Link>
    ):(
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;
