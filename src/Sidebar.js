import React, { useEffect,useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Sidebar.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {

    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    const [guestUsers,setGuestUsers] = useState([]);
     

    useEffect(()=>{
        const unsubscibe = db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            })))
        ))

        return () =>{
            unsubscibe();
        }
    },[])
    

    useEffect(()=>{
        db.collection('users').onSnapshot(snapshot =>{
            let guestUsers = [];
            snapshot.forEach(child =>{
                if(user.uid !== child.data().uid){
                    guestUsers.push({
                        guestUserDocId:child.id,
                        username:child.data().username,
                        email:child.data().email,
                        uid:child.data().uid,
                        photoURL:child.data().photoURL,
                    })
                }
            })
            setGuestUsers(guestUsers);
        })

    },[])
    



    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar-headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>

            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>





            <div className="sidebar-chats">
               {
                   guestUsers.map(guestUser =>(
                       <SidebarChat key={guestUser.uid} name={guestUser.username} id={guestUser.uid} photoURL={guestUser.photoURL}/>
                   ))
               }

            </div>
        </div>
    )
}

export default Sidebar
