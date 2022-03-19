import { Server } from "http";
import {Server as IO } from 'socket.io'
const SocketThing = (server:Server) =>{
    const io = new IO(server, {
        cors: {
          origin: '*',
        },
      })
    let connectedUsers = new Map<string, string>()
    let newConnectedUsers = new Map<string,boolean>() // true 
    io.on('connection', socket => { 
        socket.on('connect_bruh',async (userId) => {
          console.log('user id ', userId,' connceted on id :',socket.id);
          socket.handshake.query.userId = userId ;
          //add user to connected list
          connectedUsers.set(userId,socket.id)
          newConnectedUsers.set(userId,true)
          setTimeout(function(){
            if(newConnectedUsers.has(userId) && newConnectedUsers.get(userId)){
              console.log(connectedUsers)
              //let them know
               socket.broadcast.emit('new.online.member',userId)
            }
          }, 4000,userId);


          
          
        })


        socket.on('sending.message',(message,recieverId) => {
          console.log('user sent ',message,' to ',recieverId,'   ',socket.handshake.query.userId);
          
        })

        socket.on('disconnect',async() => {
          
          
          let disconnectedUserId = ''
          for (let [key, value] of connectedUsers) {
            if(value == socket.id){
              connectedUsers.delete(key) 
              disconnectedUserId = key 
            }           
          }
          //wait few seconds then delete it if not there
          setTimeout(function(){
            if(!connectedUsers.has(disconnectedUserId)){
              socket.broadcast.emit('member.disconnected',disconnectedUserId)
              console.log('oops he disconnected ',disconnectedUserId);
            }else{
              newConnectedUsers.delete(disconnectedUserId)  ;
            }
          }, 3000,disconnectedUserId);
         

          console.log('end of fn')
          
        })
    
    })
}

export default SocketThing
