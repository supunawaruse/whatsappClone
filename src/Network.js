import db from './firebase';
import {auth} from './firebase';
import firebase from 'firebase';

export const AddUser = async (displayName, email, uid, photoURL) => {
    db.collection('users').doc(uid)
    .set({
        username:displayName,
        email:email,
        uid:uid,
        photoURL:photoURL
    })  
}







export const senderMsg = async (msg, currentUserId, guestUserId,senderName ) => {
  
    db
        .collection('users')
        .doc(currentUserId)
        .collection('subChats')
        .doc(guestUserId)
        .get()
        .then(snapshot => {
          if(!snapshot.exists) {
           db
            .collection('users')
            .doc(currentUserId)
            .collection('subChats')
            .doc(guestUserId)
            .set({
                "messages": firebase.firestore.FieldValue.arrayUnion({msg,currentUserId,guestUserId,createdAt: new Date(),senderName})
            });
          } else {
            db
            .collection('users')
            .doc(currentUserId)
            .collection('subChats')
            .doc(guestUserId)
            .update({
                "messages": firebase.firestore.FieldValue.arrayUnion({msg,currentUserId,guestUserId,createdAt: new Date(),senderName})
            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    }




    export const recieverMsg = async (msg, currentUserId, guestUserId,senderName ) => {
        db
            .collection('users')
            .doc(guestUserId)
            .collection('subChats')
            .doc(currentUserId)
            .get()
            .then(snapshot => {
              if(!snapshot.exists) {
               db
                .collection('users')
                .doc(guestUserId)
                .collection('subChats')
                .doc(currentUserId)
                .set({
                  "messages": firebase.firestore.FieldValue.arrayUnion({msg,currentUserId,guestUserId,createdAt: new Date(),senderName})
                })
              
              } else {
                db
                .collection('users')
                .doc(guestUserId)
                .collection('subChats')
                .doc(currentUserId)
                .update({
                  "messages": firebase.firestore.FieldValue.arrayUnion({msg,currentUserId,guestUserId,createdAt: new Date(),senderName})
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
      
      }
