import { Socket } from "socket.io";

const onUserConnect = (socket : Socket , connectedUsers: Map<string,string>, newConnectedUsers : Map<string,boolean>) => {
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
}


const onUserDisconnect = (socket : Socket ,connectedUsers: Map<string,string>,newConnectedUsers : Map<string,boolean>) => {
    socket.on('disconnect',() => {
          
          
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
}