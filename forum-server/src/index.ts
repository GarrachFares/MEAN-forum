import express, { type Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import parser from 'body-parser'
import routes from './routes'
import {connect} from './utils/connect'
import { createServer } from 'http'
import SocketThing from './sockets'


const app = express()


app.use(morgan('tiny'))
app.use(cors()) 
app.use(parser.json())

app.use(routes)

//socketio things 
const server = createServer(app)



connect()
  .then( ()=> { 
    

    
    SocketThing(server)

    server.listen(4000, () => {
      console.log('Server is running on port 4000')
      })

  })
  .catch(console.error)
